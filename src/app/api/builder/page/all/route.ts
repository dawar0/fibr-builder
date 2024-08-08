import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { db } from "@/db/db";
import { landingPage } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/next-auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const pages = await db
      .select()
      .from(landingPage)
      .where(eq(landingPage.createdBy, session.user.id!));

    return NextResponse.json(
      {
        pages,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching pages", error },
      { status: 500 }
    );
  }
}
