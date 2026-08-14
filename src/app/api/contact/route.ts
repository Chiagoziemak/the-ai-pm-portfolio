import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings } from "@/sanity/queries";
import { createClient } from "@sanity/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Please enter your message." },
        { status: 400 }
      );
    }

    // Fetch siteSettings to get destination contactEmail (fallback: hello@chiagoziem.ai)
    const siteSettings = await getSiteSettings();
    const destinationEmail = siteSettings.contactEmail || "hello@chiagoziem.ai";

    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;
    let emailErrorMsg = "";

    if (resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact Form <onboarding@resend.dev>",
            to: destinationEmail,
            reply_to: email,
            subject: `[Portfolio Inquiry] New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; rounded: 8px;">
                <h2 style="color: #0d9488; margin-top: 0;">New Contact Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <h3 style="color: #333;">Message:</h3>
                <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 6px; color: #444;">${message}</p>
              </div>
            `,
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
          name: name.trim(),
          email: email.trim(),
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
