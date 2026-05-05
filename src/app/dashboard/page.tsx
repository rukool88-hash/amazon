import Link from "next/link";
import { AppShell } from "@/components/shell/app-shell";
import { assetHighlights, recentJobs, workbenchMetrics } from "@/lib/dashboard-data";
import { toolDefinitions } from "@/lib/tools";

export default function DashboardPage() {
  return (
    <AppShell title="工作台">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {workbenchMetrics.map((metric) => (
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
            {recentJobs.map((job) => (
              <div key={job.id} className="rounded-[24px] border border-[var(--line)] bg-white/60 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{job.tool}</p>
                  </div>
                  <span className="rounded-full bg-[rgba(217,95,49,0.12)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">
                    {job.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">更新时间：{job.updatedAt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">资产预览</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">后续会接入真实资产表和筛选条件。</p>
          </div>
          <Link href="/assets" className="text-sm font-semibold text-[var(--accent-strong)]">
            查看全部
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {assetHighlights.map((asset) => (
            <div key={asset.id} className="rounded-[26px] border border-[var(--line)] bg-white/60 p-5">
              <div className="h-36 rounded-[18px] bg-[linear-gradient(135deg,#f4c7b5,#fff8ee)]" />
              <p className="mt-4 text-sm text-[var(--muted)]">{asset.tag}</p>
              <h3 className="mt-1 text-lg font-semibold">{asset.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
