import Link from "next/link";
import { toolDefinitions } from "@/lib/tools";

const pillars = [
  {
    title: "统一任务链路",
    description: "所有工具都围绕同一套上传、计费、排队、回写资产的工作流。",
  },
  {
    title: "平台化能力",
    description: "不是单页 Demo，而是带积分、资产、后台和模板体系的全栈骨架。",
  },
  {
    title: "异步 AI 架构",
    description: "前台只提交短请求，长任务交给 Trigger.dev 一类的外部执行器。",
  },
];

export default function HomePage() {
  return (
    <main className="px-4 py-8 md:px-8 md:py-10">
      <div className="container-shell space-y-6">
        <section className="glass-panel overflow-hidden rounded-[36px] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--muted)]">Phase 1 Implementation</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                先把 AI 电商素材平台的骨架搭稳，再扩展成接近原站的完整产品。
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
                当前项目已经按统一任务中心、资产中心、积分账本、管理后台和四类核心工具的结构开工。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
                >
                  进入工作台
                </Link>
                <Link
                  href="/create/product-image"
                  className="rounded-full border border-[var(--line)] bg-white/70 px-6 py-3 text-sm font-semibold"
                >
                  查看创作入口
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-[28px] border border-[var(--line)] bg-white/60 p-5">
                  <h2 className="text-lg font-semibold">{pillar.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {toolDefinitions.map((tool) => (
            <Link
              key={tool.key}
              href={`/create/${tool.key}`}
              className="glass-panel rounded-[28px] p-5 transition hover:-translate-y-1"
            >
              <div className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: tool.accent }}>
                {tool.output}
              </div>
              <h2 className="mt-4 text-2xl font-semibold">{tool.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{tool.subtitle}</p>
              <p className="mt-4 text-sm text-[var(--muted)]">预计消耗 {tool.points} 积分</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
