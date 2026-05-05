# HKShot Clone

一个基于 Next.js 16 的 AI 电商素材平台。当前版本已经支持真实任务创建、真实生图 URL 生成、任务状态落库、资产入库、积分扣减与失败回退，以及注册登录和密码重置接口。

## 技术栈

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Prisma + SQLite（本地开箱可运行）
- Better Auth
- Vercel Blob
- Upstash Redis
- Trigger.dev

## 启动

1. 复制 `.env.example` 为 `.env`
2. 安装依赖：`npm install`
3. 生成 Prisma Client：`npm run prisma:generate`
4. 初始化数据库：`npm run db:push`
5. 启动开发环境：`npm run dev`

默认端口为 8010。

## 当前可用能力

- 在 `创作页` 提交任务会真实写入数据库并生成可访问的图片 URL。
- 在 `工作台`、`后台`、`资产中心` 可查看真实任务与资产数据。
- 积分会在创建任务时预扣，任务完成后正式扣减，失败时自动回退。
- 认证接口支持注册、登录、登出、忘记密码、重置密码。

## 注意

- 本地生图能力默认使用公开的 Pollinations 文生图 URL 作为首版可运行提供器。
- 忘记密码接口当前会直接返回重置 token 方便测试；上线时建议接入邮件服务并移除 token 直出。
