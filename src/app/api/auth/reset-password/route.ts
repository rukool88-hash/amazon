import { NextResponse } from "next/server";
import { z } from "zod";

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

  return NextResponse.json({
    data: {
      token: parsed.data.token,
      status: "mock-password-updated",
    },
  });
}
