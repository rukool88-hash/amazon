import { NextResponse } from "next/server";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.email(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });
  }

  return NextResponse.json({
    data: {
      email: parsed.data.email,
      status: "mock-reset-sent",
    },
  });
}
