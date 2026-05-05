import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "hkshot-clone",
    timestamp: new Date().toISOString(),
  });
}
