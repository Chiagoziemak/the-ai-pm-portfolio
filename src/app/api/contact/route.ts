import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings } from "@/sanity/queries";
import { createClient } from "@sanity/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, name, phone, email, message } = body;

    // Derive first and last name (support both split fields and legacy single name)
    const resolvedFirstName = (firstName || "").trim();
    const resolvedLastName = (lastName || "").trim();
    const fallbackFullName = (name || "").trim();

    let combinedName = "";
    if (resolvedFirstName && resolvedLastName) {
      combinedName = `${resolvedFirstName} ${resolvedLastName}`;
    } else if (resolvedFirstName) {
      combinedName = resolvedFirstName;
    } else if (fallbackFullName) {
      combinedName = fallbackFullName;
    }

    // Validation: First name & Last name
    if (!resolvedFirstName && !fallbackFullName) {
      return NextResponse.json(
        { success: false, error: "Please enter your first name." },
        { status: 400 }
      );
    }

    if (!resolvedLastName && !fallbackFullName) {
      return NextResponse.json(
        { success: false, error: "Please enter your last name." },
        { status: 400 }
      );
    }

    // Validation: Email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Validation: Phone (Optional, but if supplied validate reasonable characters)
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    if (trimmedPhone) {
      // Allow international formats: optional leading +, digits, spaces, hyphens, parentheses, 7-25 chars
      const phoneRegex = /^[+]?[\d\s().-]{7,25}$/;
      if (!phoneRegex.test(trimmedPhone)) {
        return NextResponse.json(
          { success: false, error: "Please enter a valid phone number or leave it blank." },
          { status: 400 }
        );
      }
    }

    // Validation: Message
    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Please enter your message." },
        { status: 400 }
      );
    }

    // Fetch siteSettings to get destination contactEmail (fallback: melvynmatthews19@gmail.com)
    const siteSettings = await getSiteSettings();
    const destinationEmail = siteSettings.contactEmail || "melvynmatthews19@gmail.com";

    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;
    let emailErrorMsg = "";

    if (resendApiKey) {
      try {
        const textContent = [
          `First Name: ${resolvedFirstName || combinedName}`,
          `Last Name: ${resolvedLastName || ""}`,
          `Full Name: ${combinedName}`,
          `Email: ${email.trim()}`,
          `Phone: ${trimmedPhone || "Not provided"}`,
          ``,
          `Message:`,
          message.trim(),
        ].join("\n");

        const htmlContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff; color: #1e293b;">
            <div style="border-bottom: 2px solid #0d9488; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #0d9488; margin: 0; font-size: 20px; font-weight: 700;">New Portfolio Contact Inquiry</h2>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-size: 13px; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 6px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${combinedName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-size: 13px;"><strong>Email:</strong></td>
                <td style="padding: 6px 0; font-size: 14px;"><a href="mailto:${email.trim()}" style="color: #0d9488; text-decoration: none;">${email.trim()}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-size: 13px;"><strong>Phone:</strong></td>
                <td style="padding: 6px 0; font-size: 14px;">
                  ${trimmedPhone ? `<a href="tel:${trimmedPhone}" style="color: #0d9488; text-decoration: none;">${trimmedPhone}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
                </td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <h3 style="color: #0f172a; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message</h3>
              <div style="white-space: pre-wrap; background: #f8fafc; padding: 16px; border-radius: 8px; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; font-size: 14px;">${message.trim()}</div>
            </div>

            <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #f1f5f9; text-align: right; color: #94a3b8; font-size: 11px;">
              Transmitted via Chiagoziem PM Portfolio
            </div>
          </div>
        `;

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact Form <onboarding@resend.dev>",
            to: destinationEmail,
            reply_to: email.trim(),
            subject: `[Portfolio Inquiry] New message from ${combinedName}`,
            text: textContent,
            html: htmlContent,
          }),
        });

        const resendData = await resendRes.json();
        if (resendRes.ok) {
          emailSent = true;
        } else {
          console.error("Resend API returned error:", resendData);
          emailErrorMsg = resendData?.message || "Failed to send email notification.";
        }
      } catch (err: any) {
        console.error("Error communicating with Resend API:", err);
        emailErrorMsg = err?.message || "Error communicating with Resend API.";
      }
    } else {
      console.warn("[Contact API] RESEND_API_KEY is not configured in environment variables. Email notification skipped.");
    }

    // Write backup contactSubmission record into Sanity if SANITY_WRITE_TOKEN is available
    const writeToken = process.env.SANITY_WRITE_TOKEN;
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r03r0hgb";
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

    if (writeToken) {
      try {
        const writeClient = createClient({
          projectId,
          dataset,
          apiVersion: "2026-06-03",
          token: writeToken,
          useCdn: false,
        });

        await writeClient.create({
          _type: "contactSubmission",
          firstName: resolvedFirstName || (fallbackFullName.split(" ")[0] || ""),
          lastName: resolvedLastName || (fallbackFullName.split(" ").slice(1).join(" ") || ""),
          name: combinedName,
          email: email.trim(),
          phone: trimmedPhone || undefined,
          message: message.trim(),
          submittedAt: new Date().toISOString(),
        });
      } catch (sanityErr) {
        console.error("Failed to write contactSubmission document into Sanity:", sanityErr);
      }
    }

    if (emailSent || writeToken) {
      return NextResponse.json({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      });
    }

    // Fallback if neither RESEND_API_KEY nor SANITY_WRITE_TOKEN are present in development
    if (!resendApiKey && !writeToken) {
      return NextResponse.json({
        success: true,
        message: "Submission received (Development mode). Please configure RESEND_API_KEY in production to send live emails.",
      });
    }

    return NextResponse.json(
      { success: false, error: emailErrorMsg || "Failed to deliver message." },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Unexpected error in /api/contact handler:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
