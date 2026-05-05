import { NextResponse } from "next/server";
import { jobStatusLabel, jobTypeLabel } from "@/lib/domain";
import { db } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const job = await db.generationJob.findUnique({
    where: { id },
    include: {
      outputs: true,
    },
  });

  if (!job) {
    return NextResponse.json({ error: "JOB_NOT_FOUND" }, { status: 404 });
  }

  const timeline = [
    { label: "任务创建", status: "done" },
    { label: "积分预扣", status: "done" },
    {
      label: "排队执行",
      status: ["PENDING", "QUEUED", "PROCESSING"].includes(job.status) ? "active" : "done",
    },
    {
      label: "生成完成",
      status: job.status === "COMPLETED" ? "done" : "pending",
    },
  ];

  return NextResponse.json({
    data: {
      id: job.id,
      title: String((job.inputPayload as { promptInputs?: { title?: string } })?.promptInputs?.title || "未命名任务"),
      status: job.status,
      statusText: jobStatusLabel[job.status],
      tool: jobTypeLabel[job.jobType],
      timeline,
      outputs: job.outputs,
      retryable: !["PROCESSING", "QUEUED"].includes(job.status),
      errorMessage: job.errorMessage,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    },
  });
}
