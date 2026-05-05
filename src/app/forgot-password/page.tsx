export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="glass-panel w-full max-w-md rounded-[32px] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Password Reset</p>
        <h1 className="mt-4 text-3xl font-semibold">重置密码</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">这里会接入 Better Auth 的重置密码流程，当前先保留 UI 和接口占位。</p>
        <label className="mt-6 block text-sm font-medium">
          <span className="mb-2 block">邮箱</span>
          <input className="w-full rounded-2xl border border-[var(--line)] bg-white/85 px-4 py-3" placeholder="name@company.com" />
        </label>
        <button className="mt-6 w-full rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white">
          发送重置链接
        </button>
      </div>
    </main>
  );
}
