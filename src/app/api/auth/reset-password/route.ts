import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/security";

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = resetPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_RESET_PAYLOAD" }, { status: 400 });
  }

  const resetToken = await db.passwordResetToken.findUnique({
    where: { token: parsed.data.token },
  });

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return NextResponse.json({ error: "INVALID_OR_EXPIRED_TOKEN" }, { status: 400 });
  }

  await db.$transaction([
    db.user.update({
      where: { id: resetToken.userId },
      data: { passwordHash: hashPassword(parsed.data.password) },
    }),
    db.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return NextResponse.json({
    data: {
      status: "password-updated",
    },
  });
}
