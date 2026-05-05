import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureDefaultWorkspace } from "@/lib/bootstrap";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/security";

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

export async function POST(request: Request) {
  await ensureDefaultWorkspace();

  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_REGISTER_PAYLOAD" }, { status: 400 });
  }

  const exists = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) {
    return NextResponse.json({ error: "EMAIL_EXISTS" }, { status: 409 });
  }

  const user = await db.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      passwordHash: hashPassword(parsed.data.password),
    },
  });

  const account = await db.account.create({
    data: {
      userId: user.id,
      name: `${parsed.data.name} 的空间`,
      slug: `ws-${user.id.slice(0, 10)}`,
    },
  });

  await db.project.create({
    data: {
      accountId: account.id,
      name: "默认项目",
      description: "自动创建",
    },
  });

  await db.accountCredit.create({
    data: {
      accountId: account.id,
      availableCredits: 1000,
      reservedCredits: 0,
      usedCredits: 0,
    },
  });

  return NextResponse.json({
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      status: "registered",
    },
  });
}
