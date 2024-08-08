import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { db } from "@/db/db";
import { landingPage } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@/next-auth";
import { useRouter } from "next/navigation";

export async function GET(req: NextRequest, res: any) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const id = res.params.id;
  try {
    const page = await db
      .select()
      .from(landingPage)
      .where(
        and(eq(landingPage.id, id), eq(landingPage.createdBy, session.user.id!))
      );
    if (page.length === 0) {
      return NextResponse.json({ message: "Page not found" }, { status: 404 });
    }
    return NextResponse.json(page[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching page", error },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest, res: any) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = res.params.id;

  if (!id) {
    return NextResponse.json({ message: "Missing page ID" }, { status: 400 });
  }

  const { builderJSON, builderAttributesJSON, title } = await req.json();
  try {
    const existingPage = await db
      .select()
      .from(landingPage)
      .where(
        and(eq(landingPage.id, id), eq(landingPage.createdBy, session.user.id!))
      );

    if (existingPage.length > 0) {
      // Update existing page
      await db
        .update(landingPage)
        .set({
          builderJSON,

          builderAttributesJSON,
          title,
        })
        .where(
          and(
            eq(landingPage.id, id),
            eq(landingPage.createdBy, session.user.id!)
          )
        );

      return NextResponse.json({ page: existingPage[0] }, { status: 200 });
    } else {
      // Create new page

      const newPage = await db
        .insert(landingPage)
        .values({
          createdBy: session.user.id!,
          builderJSON,
          builderAttributesJSON,
          title,
        })
        .returning();

      return NextResponse.json(newPage, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating/updating page", error },
      { status: 500 }
    );
  }
}
