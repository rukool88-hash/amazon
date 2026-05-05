import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="glass-panel w-full max-w-md rounded-[32px] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Account Access</p>
        <h1 className="mt-4 text-3xl font-semibold">账号登录</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">首版按账号密码登录实现，后续再补短信或扫码能力。</p>
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            <span className="mb-2 block">邮箱</span>
            <input className="w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3" placeholder="name@company.com" />
          </label>
          <label className="block text-sm font-medium">
            <span className="mb-2 block">密码</span>
            <input type="password" className="w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3" placeholder="请输入密码" />
          </label>
        </div>
        <button className="mt-6 w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white">
          登录
        </button>
        <div className="mt-4 flex items-center justify-between text-sm text-[var(--muted)]">
          <Link href="/">返回首页</Link>
          <Link href="/forgot-password">忘记密码</Link>
        </div>
      </div>
    </main>
  );
}
