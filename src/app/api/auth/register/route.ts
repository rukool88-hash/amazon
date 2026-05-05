import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_REGISTER_PAYLOAD" }, { status: 400 });
  }

  return NextResponse.json({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      status: "mock-registered",
    },
    message: "注册接口骨架已就绪，下一步接入 Better Auth 和数据库。",
  });
}
