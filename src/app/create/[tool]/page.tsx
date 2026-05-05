import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/app-shell";
import { toolMap, type ToolKey } from "@/lib/tools";

const commonFields = [
  "商品标题 / 项目名称",
  "目标平台",
  "卖点或创意说明",
  "输出尺寸与比例",
  "负面约束词",
];

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
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {commonFields.map((field) => (
              <label key={field} className="text-sm font-medium text-[var(--foreground)]">
                <span className="mb-2 block">{field}</span>
                <input
                  className="w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3 outline-none"
                  placeholder={`请输入${field}`}
                />
              </label>
            ))}
            <label className="md:col-span-2 text-sm font-medium text-[var(--foreground)]">
              <span className="mb-2 block">上传素材</span>
              <div className="rounded-[26px] border border-dashed border-[var(--line)] bg-white/55 p-8 text-center text-sm text-[var(--muted)]">
                这里将接入 Blob 上传和素材归属校验
              </div>
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white">
              创建任务
            </button>
            <button className="rounded-full border border-[var(--line)] bg-white/70 px-5 py-3 text-sm font-semibold">
              保存模板草稿
            </button>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
