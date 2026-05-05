import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { creditsByType, jobTypeMap } from "@/lib/domain";
import { createAndExecuteJob } from "@/lib/jobs";
import { db } from "@/lib/db";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const oldJob = await db.generationJob.findUnique({ where: { id } });

  if (!oldJob) {
    return NextResponse.json({ error: "JOB_NOT_FOUND" }, { status: 404 });
  }

  const typeMapReverse: Record<string, string> = {
    PRODUCT_IMAGE: "product-image",
    MODEL_SWAP: "model-swap",
    DETAIL_PAGE: "detail-page",
    SCENE_REPLACE: "scene-replace",
  };

  const toolType = typeMapReverse[oldJob.jobType];
  const mappedType = jobTypeMap[toolType];
  const cost = creditsByType[toolType];

  if (!mappedType || !cost) {
    return NextResponse.json({ error: "UNSUPPORTED_JOB_TYPE" }, { status: 400 });
  }

  const newJob = await createAndExecuteJob({
    accountId: oldJob.accountId,
    projectId: oldJob.projectId || undefined,
    jobType: mappedType,
    cost,
    inputPayload: oldJob.inputPayload as Prisma.InputJsonValue,
  });

  return NextResponse.json({
    data: {
      oldJobId: id,
      newJobId: newJob.id,
      status: newJob.status,
    },
  });
}
