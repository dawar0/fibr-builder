import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { db } from "@/db/db";
import { landingPage } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/next-auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const title = "Untitled Page";
  try {
    const newPage = await db
      .insert(landingPage)
      .values({
        title,
        createdBy: session.user.id!,
      })
      .returning();

    return NextResponse.json(
      {
        page: newPage[0],
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating/updating page", error },
      { status: 500 }
    );
  }
}
