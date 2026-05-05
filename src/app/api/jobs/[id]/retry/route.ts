import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  return NextResponse.json({
    data: {
      oldJobId: id,
      newJobId: randomUUID(),
      status: "pending",
    },
    message: "重试会新建任务，这里是接口骨架。",
  });
}
