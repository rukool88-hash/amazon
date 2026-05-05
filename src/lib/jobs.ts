import { CreditTransactionType, JobStatus, Prisma, type JobType } from "@prisma/client";
import { db } from "@/lib/db";
import { generateImageFromPrompt } from "@/lib/image-provider";

type ExecuteParams = {
  accountId: string;
  projectId?: string;
  jobType: JobType;
  cost: number;
  inputPayload: Prisma.InputJsonValue;
};

export async function createAndExecuteJob(params: ExecuteParams) {
  const credits = await db.accountCredit.findUnique({ where: { accountId: params.accountId } });

  if (!credits || credits.availableCredits < params.cost) {
    throw new Error("INSUFFICIENT_CREDITS");
  }

  const job = await db.$transaction(async (tx) => {
    const updatedCredits = await tx.accountCredit.update({
      where: { accountId: params.accountId },
      data: {
        availableCredits: { decrement: params.cost },
        reservedCredits: { increment: params.cost },
      },
    });

    const createdJob = await tx.generationJob.create({
      data: {
        accountId: params.accountId,
        projectId: params.projectId,
        jobType: params.jobType,
        status: JobStatus.QUEUED,
        inputPayload: params.inputPayload,
        billingSnapshot: {
          cost: params.cost,
          currency: "credits",
        } as Prisma.InputJsonValue,
      },
    });

    await tx.creditLedger.create({
      data: {
        accountId: params.accountId,
        generationJobId: createdJob.id,
        type: CreditTransactionType.PRE_DEDUCTION,
        amount: -params.cost,
        balanceAfter: updatedCredits.availableCredits,
        reason: "任务创建预扣积分",
      },
    });

    return createdJob;
  });

  try {
    await db.generationJob.update({
      where: { id: job.id },
      data: { status: JobStatus.PROCESSING },
    });

    const payloadObject =
      typeof params.inputPayload === "object" && params.inputPayload !== null
        ? (params.inputPayload as Record<string, unknown>)
        : {};

    const promptInputs =
      typeof payloadObject.promptInputs === "object" && payloadObject.promptInputs !== null
        ? (payloadObject.promptInputs as Record<string, unknown>)
        : {};

    const prompt = String(promptInputs.title || "商品图生成");
    const generated = await generateImageFromPrompt(prompt);

    const output = await db.jobOutput.create({
      data: {
        generationJobId: job.id,
        kind: "image",
        originUrl: generated.imageUrl,
        previewUrl: generated.previewUrl,
        thumbnailUrl: generated.previewUrl,
        metadata: generated.metadata,
      },
    });

    await db.$transaction(async (tx) => {
      await tx.asset.create({
        data: {
          accountId: params.accountId,
          projectId: params.projectId,
          jobOutputId: output.id,
          name: `${prompt} - ${new Date().toLocaleString("zh-CN")}`,
          kind: "generated-image",
          originUrl: generated.imageUrl,
          previewUrl: generated.previewUrl,
        },
      });

      const updatedCredits = await tx.accountCredit.update({
        where: { accountId: params.accountId },
        data: {
          reservedCredits: { decrement: params.cost },
          usedCredits: { increment: params.cost },
        },
      });

      await tx.creditLedger.create({
        data: {
          accountId: params.accountId,
          generationJobId: job.id,
          type: CreditTransactionType.FORMAL_DEDUCTION,
          amount: -params.cost,
          balanceAfter: updatedCredits.availableCredits,
          reason: "任务完成正式扣减",
        },
      });

      await tx.generationJob.update({
        where: { id: job.id },
        data: {
          status: JobStatus.COMPLETED,
          provider: generated.provider,
          completedAt: new Date(),
        },
      });
    });

    return await db.generationJob.findUniqueOrThrow({ where: { id: job.id } });
  } catch (error) {
    await db.$transaction(async (tx) => {
      const updatedCredits = await tx.accountCredit.update({
        where: { accountId: params.accountId },
        data: {
          reservedCredits: { decrement: params.cost },
          availableCredits: { increment: params.cost },
        },
      });

      await tx.creditLedger.create({
        data: {
          accountId: params.accountId,
          generationJobId: job.id,
          type: CreditTransactionType.FAILURE_REFUND,
          amount: params.cost,
          balanceAfter: updatedCredits.availableCredits,
          reason: "任务失败积分返还",
        },
      });

      await tx.generationJob.update({
        where: { id: job.id },
        data: {
          status: JobStatus.FAILED,
          errorCode: "GENERATION_FAILED",
          errorMessage: error instanceof Error ? error.message : "Unknown generation error",
        },
      });
    });

    throw error;
  }
}
