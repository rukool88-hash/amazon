import { NextResponse } from "next/server";
import { z } from "zod";

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

  return NextResponse.json({
    data: {
      user: {
        email: parsed.data.email,
        name: "Demo Operator",
      },
      session: {
        status: "mock-authenticated",
      },
    },
  });
}
