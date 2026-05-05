export type ToolKey =
  | "product-image"
  | "model-swap"
  | "detail-page"
  | "scene-replace";

export type ToolDefinition = {
  key: ToolKey;
  title: string;
  subtitle: string;
  accent: string;
  output: string;
  points: number;
  description: string;
  bullets: string[];
};

export const toolDefinitions: ToolDefinition[] = [
  {
    key: "product-image",
    title: "AI 商品图",
    subtitle: "白底图、卖点图、平台主图统一走一条任务链路",
    accent: "#d95f31",
    output: "3-6 张",
    points: 10,
    description: "上传商品图和卖点文案，自动生成适配平台的商品视觉。",
    bullets: ["支持平台模板", "支持统一计费", "支持资产回流二次编辑"],
  },
  {
    key: "model-swap",
    title: "AI 模特",
    subtitle: "商品上身、换模特、姿态裂变统一配置",
    accent: "#2f7f6f",
    output: "1-4 张",
    points: 8,
    description: "复用商品素材和模特参考图，快速生成不同人群和姿态。",
    bullets: ["模特特征可配置", "支持参考图", "支持失败重试"],
  },
  {
    key: "detail-page",
    title: "AI 详情页",
    subtitle: "模块化长图与卖点切片输出",
    accent: "#6c4db5",
    output: "长图或切片",
    points: 15,
    description: "将商品卖点、规格和利益点组合成详情页模块。",
    bullets: ["模板数据化", "多模块拼接", "适合后续运营管理"],
  },
  {
    key: "scene-replace",
    title: "场景替换",
    subtitle: "统一做抠图、换背景、场景参考融合",
    accent: "#a35c1b",
    output: "1-3 张",
    points: 12,
    description: "在保留主体的前提下生成新场景，适合电商场景图。",
    bullets: ["支持场景参考", "支持自然语言描述", "适合走异步任务"],
  },
];

export const toolMap = Object.fromEntries(
  toolDefinitions.map((tool) => [tool.key, tool]),
) as Record<ToolKey, ToolDefinition>;
