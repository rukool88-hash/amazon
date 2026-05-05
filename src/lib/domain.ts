import { JobStatus, JobType } from "@prisma/client";

export const jobTypeMap: Record<string, JobType> = {
  "product-image": JobType.PRODUCT_IMAGE,
  "model-swap": JobType.MODEL_SWAP,
  "detail-page": JobType.DETAIL_PAGE,
  "scene-replace": JobType.SCENE_REPLACE,
};

export const jobTypeLabel: Record<JobType, string> = {
  PRODUCT_IMAGE: "AI 商品图",
  MODEL_SWAP: "AI 模特",
  DETAIL_PAGE: "AI 详情页",
  SCENE_REPLACE: "场景替换",
};

export const jobStatusLabel: Record<JobStatus, string> = {
  PENDING: "待处理",
  QUEUED: "排队中",
  PROCESSING: "处理中",
  COMPLETED: "已完成",
  FAILED: "失败",
  TIMEOUT: "超时",
  ARCHIVED: "已归档",
  ABANDONED: "已放弃",
};

export const creditsByType: Record<string, number> = {
  "product-image": 10,
  "model-swap": 8,
  "detail-page": 15,
  "scene-replace": 12,
};
