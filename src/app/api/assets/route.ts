import { NextResponse } from "next/server";
import { ensureDefaultWorkspace } from "@/lib/bootstrap";
import { db } from "@/lib/db";

export async function GET() {
  const { account } = await ensureDefaultWorkspace();

  const assets = await db.asset.findMany({
    where: {
      accountId: account.id,
      status: "ACTIVE",
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  return NextResponse.json({ data: assets, nextCursor: null });
}
