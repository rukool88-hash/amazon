import { NextResponse } from "next/server";
import { ensureDefaultWorkspace } from "@/lib/bootstrap";
import { db } from "@/lib/db";

export async function GET() {
  const { account } = await ensureDefaultWorkspace();
  const balance = await db.accountCredit.findUnique({ where: { accountId: account.id } });

  return NextResponse.json({
    data: {
      availableCredits: balance?.availableCredits ?? 0,
      reservedCredits: balance?.reservedCredits ?? 0,
      usedCredits: balance?.usedCredits ?? 0,
      lastUpdatedAt: balance?.updatedAt ?? new Date().toISOString(),
    },
  });
}
