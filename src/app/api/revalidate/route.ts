import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    const authHeader = req.headers.get("authorization");
    const secretParam = req.nextUrl.searchParams.get("secret");

    // Optional secret token verification
    if (secret) {
      const token = authHeader ? authHeader.replace("Bearer ", "") : secretParam;
      if (token !== secret) {
        return NextResponse.json(
          { success: false, message: "Invalid revalidation secret token" },
          { status: 401 }
        );
      }
    }

    const body = await req.json().catch(() => ({}));
    const { _type, slug } = body;

    // Revalidate the root layout to refresh all pages site-wide
    revalidatePath("/", "layout");

    // Optionally revalidate specific routes based on document type & slug
    if (_type === "teardown") {
      revalidatePath("/teardowns");
      if (slug?.current) {
        revalidatePath(`/teardowns/${slug.current}`);
      }
    } else if (_type === "caseStudy") {
      revalidatePath("/case-studies");
      if (slug?.current) {
        revalidatePath(`/case-studies/${slug.current}`);
      }
    } else if (_type === "product") {
      revalidatePath("/products");
    } else if (_type === "aboutPage") {
      revalidatePath("/about");
    } else if (_type === "contactPage") {
      revalidatePath("/contact");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type || "all",
      message: "On-demand revalidation triggered successfully",
    });
  } catch (err: any) {
    console.error("Error in /api/revalidate route:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Error revalidating path" },
      { status: 500 }
    );
  }
}
