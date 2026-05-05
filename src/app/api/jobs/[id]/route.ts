import { NextResponse } from "next/server";
import { mockJobs } from "@/lib/api-mocks";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const job = mockJobs.find((item) => item.id === id);

  if (!job) {
    return NextResponse.json({ error: "JOB_NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json({
    data: {
      ...job,
      timeline: [
        { label: "任务创建", status: "done" },
        { label: "积分预扣", status: "done" },
        { label: "排队执行", status: job.status === "processing" ? "active" : "done" },
      ],
      outputs: [],
      retryable: job.status !== "processing",
    },
  });
}
