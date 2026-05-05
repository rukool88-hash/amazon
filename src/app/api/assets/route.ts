import { NextResponse } from "next/server";
import { mockAssets } from "@/lib/api-mocks";

export async function GET() {
  return NextResponse.json({ data: mockAssets, nextCursor: null });
}
