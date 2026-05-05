export const mockJobs = [
  {
    id: "job_demo_1",
    jobType: "product-image",
    title: "香薰礼盒主图生成",
    status: "processing",
    reservedCredits: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: "job_demo_2",
    jobType: "model-swap",
    title: "儿童餐椅换模特",
    status: "completed",
    reservedCredits: 8,
    createdAt: new Date().toISOString(),
  },
];

export const mockAssets = [
  {
    id: "asset_1",
    name: "北欧香薰礼盒场景图",
    thumbUrl: "/",
    originUrl: "/",
    jobType: "product-image",
    favorite: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "asset_2",
    name: "儿童餐椅夏季模特图",
    thumbUrl: "/",
    originUrl: "/",
    jobType: "model-swap",
    favorite: false,
    createdAt: new Date().toISOString(),
  },
];
