"use client";

import { useMemo, useState } from "react";
import type { ToolKey } from "@/lib/tools";

type Props = {
  tool: ToolKey;
  points: number;
};

type ResultState = {
  jobId: string;
  status: string;
  reservedCredits: number;
} | null;

export function CreateJobForm({ tool, points }: Props) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("淘宝");
  const [sellingPoints, setSellingPoints] = useState("高清,干净背景,品牌质感");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState>(null);

  const sellingPointList = useMemo(
    () =>
      sellingPoints
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    [sellingPoints],
  );

  async function submit() {
    if (!title.trim()) {
      setError("请先填写商品标题");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobType: tool,
          sourceAssetIds: [],
          promptInputs: {
            title,
            platform,
            sellingPoints: sellingPointList,
            negativePrompt,
          },
          toolConfig: {
            outputCount: 1,
            aspectRatio,
            quality: "standard",
            language: "zh-CN",
          },
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "创建任务失败");
      }

      setResult(payload.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "创建任务失败");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-[var(--foreground)]">
          <span className="mb-2 block">商品标题 / 项目名称</span>
          <input
            className="w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3 outline-none"
            placeholder="请输入商品标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-[var(--foreground)]">
          <span className="mb-2 block">目标平台</span>
          <input
            className="w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3 outline-none"
            placeholder="请输入平台"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-[var(--foreground)] md:col-span-2">
          <span className="mb-2 block">卖点或创意说明（逗号分隔）</span>
          <input
            className="w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3 outline-none"
            placeholder="如：通透质感,高级氛围,电商风"
            value={sellingPoints}
            onChange={(e) => setSellingPoints(e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-[var(--foreground)]">
          <span className="mb-2 block">输出尺寸与比例</span>
          <input
            className="w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3 outline-none"
            placeholder="如 1:1"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-[var(--foreground)]">
          <span className="mb-2 block">负面约束词</span>
          <input
            className="w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3 outline-none"
            placeholder="可选"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={submit}
          disabled={submitting}
          className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "生成中..." : `创建任务（${points} 积分）`}
        </button>
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      {result ? (
        <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white/70 p-4 text-sm">
          <p>任务已创建：{result.jobId}</p>
          <p>状态：{result.status}</p>
          <p>预扣积分：{result.reservedCredits}</p>
          <p className="mt-2 text-[var(--muted)]">请前往工作台或资产中心查看实际生成结果。</p>
        </div>
      ) : null}
    </div>
  );
}
