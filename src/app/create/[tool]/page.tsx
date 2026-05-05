import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/app-shell";
import { CreateJobForm } from "@/components/create/create-job-form";
import { toolMap, type ToolKey } from "@/lib/tools";

export default async function CreateToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const definition = toolMap[tool as ToolKey];

  if (!definition) {
    notFound();
  }

  return (
    <AppShell title={definition.title}>
      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[32px] p-6">
          <div className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: definition.accent }}>
            首版工具
          </div>
          <h2 className="mt-4 text-3xl font-semibold">{definition.title}</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{definition.description}</p>
          <div className="mt-6 space-y-3">
            {definition.bullets.map((bullet) => (
              <div key={bullet} className="rounded-2xl border border-[var(--line)] bg-white/55 px-4 py-3 text-sm text-[var(--muted)]">
                {bullet}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">统一任务表单</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">当前阶段先搭字段布局，下一步接入真实提交接口。</p>
            </div>
            <div className="rounded-full bg-[rgba(217,95,49,0.12)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">
              预计 {definition.points} 积分
            </div>
          </div>
          <CreateJobForm tool={definition.key} points={definition.points} />
        </div>
      </section>
    </AppShell>
  );
}
