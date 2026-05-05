import { toolDefinitions } from "@/lib/tools";

export const recentJobs = [
  {
    id: "job_demo_1",
    title: "香薰礼盒主图生成",
    status: "处理中",
    tool: "AI 商品图",
    updatedAt: "2 分钟前",
  },
  {
    id: "job_demo_2",
    title: "儿童餐椅换模特",
    status: "已完成",
    tool: "AI 模特",
    updatedAt: "14 分钟前",
  },
  {
    id: "job_demo_3",
    title: "空气炸锅详情页",
    status: "排队中",
    tool: "AI 详情页",
    updatedAt: "刚刚",
  },
];

export const assetHighlights = [
  {
    id: "asset_1",
    name: "北欧香薰礼盒场景图",
    tag: "商品图",
  },
  {
    id: "asset_2",
    name: "儿童餐椅夏季模特图",
    tag: "模特图",
  },
  {
    id: "asset_3",
    name: "空气炸锅详情页切片",
    tag: "详情页",
  },
];

export const workbenchMetrics = [
  {
    label: "可用积分",
    value: "1,280",
    helper: "含 160 积分预留中",
  },
  {
    label: "今日任务",
    value: "24",
    helper: "成功率 91.7%",
  },
  {
    label: "资产总数",
    value: "312",
    helper: "本周新增 46 个",
  },
  {
    label: "启用模板",
    value: String(toolDefinitions.length),
    helper: "首版四类核心工具",
  },
];
