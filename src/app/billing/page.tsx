import { AppShell } from "@/components/shell/app-shell";
import { ensureDefaultWorkspace } from "@/lib/bootstrap";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const { account } = await ensureDefaultWorkspace();

  const [credits, plans] = await Promise.all([
    db.accountCredit.findUnique({ where: { accountId: account.id } }),
    db.creditPlan.findMany({ where: { active: true }, orderBy: { credits: "asc" } }),
  ]);

  return (
    <AppShell title="积分与套餐">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Balance</p>
          <h2 className="mt-4 text-4xl font-semibold">{credits?.availableCredits ?? 0}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            其中 {credits?.reservedCredits ?? 0} 积分预留中，{credits?.usedCredits ?? 0} 积分已消耗。
          </p>
          <div className="mt-6 grid gap-3">
            <div className="rounded-[24px] border border-[var(--line)] bg-white/55 p-4">
              <p className="text-sm text-[var(--muted)]">预扣策略</p>
              <p className="mt-2 font-medium">创建任务时先预扣，任务完成后再正式扣减。</p>
            </div>
            <div className="rounded-[24px] border border-[var(--line)] bg-white/55 p-4">
              <p className="text-sm text-[var(--muted)]">首版支付方案</p>
              <p className="mt-2 font-medium">管理员加减积分 + 手工订单记录，不接真实支付。</p>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-[32px] p-6">
          <h2 className="text-2xl font-semibold">套餐定义</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className="rounded-[26px] border border-[var(--line)] bg-white/60 p-5">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{plan.description || "积分套餐"}</p>
                <p className="mt-6 text-3xl font-semibold">{plan.credits}</p>
                <p className="text-sm text-[var(--muted)]">积分</p>
                <button className="mt-6 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">
                  手工录入
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
