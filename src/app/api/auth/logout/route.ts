import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (token) {
    await db.session.deleteMany({ where: { token } });
    cookieStore.delete("session_token");
  }

  return NextResponse.json({ data: { status: "logged-out" } });
}
