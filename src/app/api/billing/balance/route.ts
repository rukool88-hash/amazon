import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: {
      availableCredits: 1280,
      reservedCredits: 160,
      usedCredits: 460,
      lastUpdatedAt: new Date().toISOString(),
    },
  });
}
