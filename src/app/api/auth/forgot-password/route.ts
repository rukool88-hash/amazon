import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { createToken } from "@/lib/security";

const forgotPasswordSchema = z.object({
  email: z.email(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });

  if (!user) {
    return NextResponse.json({ data: { status: "reset-sent" } });
  }

  const token = createToken(20);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  // 首版未接邮件服务，先直接回传 token 方便测试。
  return NextResponse.json({
    data: {
      email: parsed.data.email,
      token,
      expiresAt,
      status: "reset-sent",
    },
  });
}
