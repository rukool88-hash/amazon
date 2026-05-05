import { AppShell } from "@/components/shell/app-shell";
import { assetHighlights } from "@/lib/dashboard-data";

export default function AssetsPage() {
  return (
    <AppShell title="资产中心">
      <section className="glass-panel rounded-[32px] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">资产中心</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">首版会在这里挂接真实资产表、收藏、删除和批量导出。</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold">筛选</button>
            <button className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">批量导出</button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {assetHighlights.map((asset) => (
            <article key={asset.id} className="rounded-[26px] border border-[var(--line)] bg-white/60 p-5">
              <div className="h-48 rounded-[20px] bg-[linear-gradient(135deg,#fae3d4,#fffaf2)]" />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted)]">{asset.tag}</p>
                  <h3 className="mt-1 text-lg font-semibold">{asset.name}</h3>
                </div>
                <button className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold">收藏</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
