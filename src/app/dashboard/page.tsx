import Link from "next/link";
import { AppShell } from "@/components/shell/app-shell";
import { ensureDefaultWorkspace } from "@/lib/bootstrap";
import { jobStatusLabel, jobTypeLabel } from "@/lib/domain";
import { db } from "@/lib/db";
import { toolDefinitions } from "@/lib/tools";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { account } = await ensureDefaultWorkspace();

  const [credits, jobs, assets] = await Promise.all([
    db.accountCredit.findUnique({ where: { accountId: account.id } }),
    db.generationJob.findMany({ where: { accountId: account.id }, orderBy: { createdAt: "desc" }, take: 6 }),
    db.asset.findMany({ where: { accountId: account.id, status: "ACTIVE", deletedAt: null }, orderBy: { createdAt: "desc" }, take: 6 }),
  ]);

  const metrics = [
    {
      label: "可用积分",
      value: String(credits?.availableCredits ?? 0),
      helper: `预留 ${credits?.reservedCredits ?? 0} / 已消耗 ${credits?.usedCredits ?? 0}`,
    },
    {
      label: "总任务数",
      value: String(jobs.length),
      helper: "最近 6 条任务",
    },
    {
      label: "资产总数",
      value: String(assets.length),
      helper: "最近 6 条资产",
    },
    {
      label: "启用模板",
      value: String(toolDefinitions.length),
      helper: "首版四类核心工具",
    },
  ];
  return (
    <AppShell title="工作台">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="glass-panel rounded-[28px] p-5">
            <p className="text-sm text-[var(--muted)]">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold">{metric.value}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{metric.helper}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[32px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">继续创作</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">四个首版工具已全部预留统一任务接口位置。</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {toolDefinitions.map((tool) => (
              <Link
                key={tool.key}
                href={`/create/${tool.key}`}
                className="rounded-[26px] border border-[var(--line)] bg-white/55 p-5"
              >
                <p className="text-sm text-[var(--muted)]">{tool.subtitle}</p>
                <h3 className="mt-3 text-xl font-semibold">{tool.title}</h3>
                <p className="mt-4 text-sm text-[var(--muted)]">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6">
          <h2 className="text-2xl font-semibold">最近任务</h2>
          <div className="mt-5 space-y-4">
            {jobs.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">暂无任务，去创作页创建第一条任务。</p>
            ) : null}
            {jobs.map((job) => (
              <div key={job.id} className="rounded-[24px] border border-[var(--line)] bg-white/60 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{String((job.inputPayload as { promptInputs?: { title?: string } })?.promptInputs?.title || "未命名任务")}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{jobTypeLabel[job.jobType]}</p>
                  </div>
                  <span className="rounded-full bg-[rgba(217,95,49,0.12)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">
                    {jobStatusLabel[job.status]}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">更新时间：{job.updatedAt.toLocaleString("zh-CN")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">资产预览</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">这里展示真实生成资产，点击可去资产中心查看更多。</p>
          </div>
          <Link href="/assets" className="text-sm font-semibold text-[var(--accent-strong)]">
            查看全部
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {assets.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">暂无资产，完成一次生成后会自动出现。</p>
          ) : null}
          {assets.map((asset) => (
            <div key={asset.id} className="rounded-[26px] border border-[var(--line)] bg-white/60 p-5">
              {asset.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset.previewUrl} alt={asset.name} className="h-36 w-full rounded-[18px] object-cover" />
              ) : (
                <div className="h-36 rounded-[18px] bg-[linear-gradient(135deg,#f4c7b5,#fff8ee)]" />
              )}
              <p className="mt-4 text-sm text-[var(--muted)]">{asset.kind}</p>
              <h3 className="mt-1 text-lg font-semibold">{asset.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
