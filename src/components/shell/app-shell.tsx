import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "工作台" },
  { href: "/assets", label: "资产中心" },
  { href: "/billing", label: "积分" },
  { href: "/admin", label: "后台" },
];

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-6 md:px-8">
      <div className="container-shell grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="glass-panel rounded-[28px] p-5">
          <div className="rounded-[22px] bg-[rgba(217,95,49,0.12)] p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Hook Studio</p>
            <h1 className="mt-2 text-2xl font-semibold">{title}</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">AI 电商素材平台第一阶段骨架</p>
          </div>
          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[rgba(255,255,255,0.55)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 rounded-[22px] border border-[var(--line)] p-4 text-sm text-[var(--muted)]">
            当前部署假设：Vercel + Trigger.dev + Blob + Postgres
          </div>
        </aside>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
