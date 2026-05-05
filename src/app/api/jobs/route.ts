import { NextResponse } from "next/server";
import { creditsByType, jobTypeLabel, jobTypeMap } from "@/lib/domain";
import { ensureDefaultWorkspace } from "@/lib/bootstrap";
import { createAndExecuteJob } from "@/lib/jobs";
import { db } from "@/lib/db";
import { jobCreateSchema } from "@/lib/job-contracts";

export async function GET() {
  const { account } = await ensureDefaultWorkspace();

  const jobs = await db.generationJob.findMany({
    where: { accountId: account.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    data: jobs.map((job) => ({
      id: job.id,
      title: String((job.inputPayload as { promptInputs?: { title?: string } })?.promptInputs?.title || "未命名任务"),
      status: job.status,
      tool: jobTypeLabel[job.jobType],
      jobType: job.jobType,
      reservedCredits: Number((job.billingSnapshot as { cost?: number })?.cost || 0),
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    })),
    nextCursor: null,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = jobCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "INVALID_JOB_PAYLOAD",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const { account, project } = await ensureDefaultWorkspace();
  const cost = creditsByType[parsed.data.jobType];
  const mappedType = jobTypeMap[parsed.data.jobType];

  if (!cost || !mappedType) {
    return NextResponse.json({ error: "UNSUPPORTED_JOB_TYPE" }, { status: 400 });
  }

  try {
    const job = await createAndExecuteJob({
      accountId: account.id,
      projectId: parsed.data.projectId || project.id,
      jobType: mappedType,
      cost,
      inputPayload: {
        toolConfig: parsed.data.toolConfig,
        sourceAssets: parsed.data.sourceAssetIds,
        promptInputs: parsed.data.promptInputs,
        outputOptions: {
          autoSaveAsset: true,
        },
      },
    });

    return NextResponse.json(
      {
        data: {
          jobId: job.id,
          status: job.status,
          reservedCredits: cost,
          pollingHint: {
            initialDelayMs: 500,
            maxDelayMs: 5000,
          },
        },
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "创建任务失败";

    if (message === "INSUFFICIENT_CREDITS") {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
