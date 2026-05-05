# HKShot Clone

一个基于 Next.js 16 的 AI 电商素材平台骨架项目，首阶段目标包含：登录、工作台、统一任务中心、资产中心、积分体系、后台入口，以及商品图/模特/详情页/场景替换四类能力的路由与数据结构基础。

## 技术栈

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Prisma + PostgreSQL
- Better Auth
- Vercel Blob
- Upstash Redis
- Trigger.dev

## 启动

1. 复制 `.env.example` 为 `.env`
2. 安装依赖：`npm install`
3. 生成 Prisma Client：`npm run prisma:generate`
4. 启动开发环境：`npm run dev`

默认端口为 8010。
