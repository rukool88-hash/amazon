import { z } from "zod";

export const toolTypeSchema = z.enum([
  "product-image",
  "model-swap",
  "detail-page",
  "scene-replace",
]);

export const jobCreateSchema = z.object({
  jobType: toolTypeSchema,
  projectId: z.string().min(1).optional(),
  templateId: z.string().min(1).optional(),
  sourceAssetIds: z.array(z.string().min(1)).default([]),
  promptInputs: z.object({
    title: z.string().min(1),
    platform: z.string().min(1),
    sellingPoints: z.array(z.string().min(1)).default([]),
    negativePrompt: z.string().optional(),
    scenePrompt: z.string().optional(),
  }),
  toolConfig: z.object({
    outputCount: z.number().int().min(1).max(8),
    aspectRatio: z.string().min(1),
    quality: z.enum(["draft", "standard", "hd"]).default("standard"),
    language: z.enum(["zh-CN", "en-US"]).default("zh-CN"),
  }),
});

export type JobCreateInput = z.infer<typeof jobCreateSchema>;
