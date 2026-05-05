import { CreditTransactionType, JobType, UserStatus } from "@prisma/client";
import { db } from "@/lib/db";

const DEFAULT_USER = {
  email: "demo@hkshot.local",
  name: "Demo Operator",
  passwordHash: "demo-password-placeholder",
};

export async function ensureDefaultWorkspace() {
  const user =
    (await db.user.findUnique({ where: { email: DEFAULT_USER.email } })) ??
    (await db.user.create({
      data: {
        email: DEFAULT_USER.email,
        name: DEFAULT_USER.name,
        passwordHash: DEFAULT_USER.passwordHash,
        status: UserStatus.ACTIVE,
      },
    }));

  const account =
    (await db.account.findFirst({ where: { userId: user.id } })) ??
    (await db.account.create({
      data: {
        userId: user.id,
        name: "默认工作空间",
        slug: "default-workspace",
      },
    }));

  const project =
    (await db.project.findFirst({ where: { accountId: account.id } })) ??
    (await db.project.create({
      data: {
        accountId: account.id,
        name: "默认项目",
        description: "系统自动创建",
      },
    }));

  const accountCredits =
    (await db.accountCredit.findUnique({ where: { accountId: account.id } })) ??
    (await db.accountCredit.create({
      data: {
        accountId: account.id,
        availableCredits: 3000,
        reservedCredits: 0,
        usedCredits: 0,
      },
    }));

  const plans = [
    { name: "试运行包", credits: 500, priceCents: 0, description: "适合内部试运行" },
    { name: "运营包", credits: 2000, priceCents: 0, description: "适合小规模业务" },
    { name: "团队包", credits: 5000, priceCents: 0, description: "适合持续压测" },
  ];

  for (const plan of plans) {
    await db.creditPlan.upsert({
      where: { name: plan.name },
      update: {
        credits: plan.credits,
        priceCents: plan.priceCents,
        description: plan.description,
        active: true,
      },
      create: {
        name: plan.name,
        credits: plan.credits,
        priceCents: plan.priceCents,
        description: plan.description,
        active: true,
      },
    });
  }

  await ensureTemplates();

  return { user, account, project, accountCredits };
}

async function ensureTemplates() {
  const templates = [
    {
      name: "商品图标准模板",
      jobType: JobType.PRODUCT_IMAGE,
      provider: "pollinations",
      prompt: "E-commerce product photo, white background, high quality",
    },
    {
      name: "模特替换模板",
      jobType: JobType.MODEL_SWAP,
      provider: "pollinations",
      prompt: "Lifestyle model shot with product focus",
    },
    {
      name: "详情页模板",
      jobType: JobType.DETAIL_PAGE,
      provider: "pollinations",
      prompt: "E-commerce detail page design style",
    },
    {
      name: "场景替换模板",
      jobType: JobType.SCENE_REPLACE,
      provider: "pollinations",
      prompt: "Photorealistic product in a rich lifestyle scene",
    },
  ];

  for (const template of templates) {
    const exists = await db.promptTemplate.findFirst({ where: { name: template.name } });
    if (!exists) {
      await db.promptTemplate.create({ data: template });
    }
  }
}

export async function ensureLedger(
  accountId: string,
  amount: number,
  balanceAfter: number,
  reason: string,
  generationJobId?: string,
) {
  await db.creditLedger.create({
    data: {
      accountId,
      amount,
      balanceAfter,
      reason,
      generationJobId,
      type:
        amount > 0
          ? CreditTransactionType.FAILURE_REFUND
          : CreditTransactionType.FORMAL_DEDUCTION,
    },
  });
}
