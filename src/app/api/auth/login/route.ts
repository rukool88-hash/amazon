import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import { createToken, verifyPassword } from "@/lib/security";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_LOGIN_PAYLOAD" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return NextResponse.json({ error: "INVALID_CREDENTIALS" }, { status: 401 });
  }

  const token = createToken(24);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await db.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("session_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    expires: expiresAt,
  });

  return NextResponse.json({
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      session: {
        status: "authenticated",
        expiresAt,
      },
    },
  });
}
