import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { mockJobs } from "@/lib/api-mocks";
import { jobCreateSchema } from "@/lib/job-contracts";

export async function GET() {
  return NextResponse.json({ data: mockJobs, nextCursor: null });
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

  const costMap = {
    "product-image": 10,
    "model-swap": 8,
    "detail-page": 15,
    "scene-replace": 12,
  } as const;

  const jobId = randomUUID();

  return NextResponse.json(
    {
      data: {
        jobId,
        status: "pending",
        reservedCredits: costMap[parsed.data.jobType],
        pollingHint: {
          initialDelayMs: 500,
          maxDelayMs: 5000,
        },
      },
      message: "任务创建骨架已就绪，下一步接入数据库与队列。",
    },
    { status: 201 },
  );
}
