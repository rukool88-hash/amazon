import { AppShell } from "@/components/shell/app-shell";
import { ensureDefaultWorkspace } from "@/lib/bootstrap";
import { jobStatusLabel, jobTypeLabel } from "@/lib/domain";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { account } = await ensureDefaultWorkspace();
  const jobs = await db.generationJob.findMany({
    where: { accountId: account.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const failedCount = jobs.filter((job) => job.status === "FAILED").length;
  const processingCount = jobs.filter((job) => ["QUEUED", "PROCESSING"].includes(job.status)).length;

  const operators = [
    { label: "失败任务", value: String(failedCount) },
    { label: "处理中任务", value: String(processingCount) },
    { label: "总任务数", value: String(jobs.length) },
    { label: "今日完成", value: String(jobs.filter((job) => job.status === "COMPLETED").length) },
  ];

  return (
    <AppShell title="管理后台">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {operators.map((item) => (
          <div key={item.label} className="glass-panel rounded-[28px] p-5">
            <p className="text-sm text-[var(--muted)]">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold">{item.value}</p>
          </div>
        ))}
      </section>
      <section className="glass-panel rounded-[32px] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">任务监控</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">当前表格已映射真实数据库任务状态，可用于运营监控。</p>
          </div>
          <button className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">重试失败任务</button>
        </div>
        <div className="mt-6 overflow-hidden rounded-[28px] border border-[var(--line)]">
          <table className="min-w-full bg-white/55 text-left text-sm">
            <thead className="bg-[rgba(217,95,49,0.12)] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">任务</th>
                <th className="px-4 py-3">工具</th>
                <th className="px-4 py-3">状态</th>
                <th className="px-4 py-3">更新时间</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3">{String((job.inputPayload as { promptInputs?: { title?: string } })?.promptInputs?.title || "未命名任务")}</td>
                  <td className="px-4 py-3">{jobTypeLabel[job.jobType]}</td>
                  <td className="px-4 py-3">{jobStatusLabel[job.status]}</td>
                  <td className="px-4 py-3">{job.updatedAt.toLocaleString("zh-CN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
