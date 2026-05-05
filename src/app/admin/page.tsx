import { AppShell } from "@/components/shell/app-shell";
import { recentJobs } from "@/lib/dashboard-data";

const operators = [
  { label: "失败任务", value: "12" },
  { label: "待审核模板", value: "4" },
  { label: "手工积分调整", value: "9" },
  { label: "今日回调异常", value: "1" },
];

export default function AdminPage() {
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
            <p className="mt-2 text-sm text-[var(--muted)]">下一步会把数据库任务和 Trigger.dev 状态映射到这里。</p>
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
              {recentJobs.map((job) => (
                <tr key={job.id} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3">{job.title}</td>
                  <td className="px-4 py-3">{job.tool}</td>
                  <td className="px-4 py-3">{job.status}</td>
                  <td className="px-4 py-3">{job.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
