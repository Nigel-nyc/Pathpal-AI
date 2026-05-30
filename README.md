# Pathpal AI

Pathpal AI 的官网与产品落地页 —— 一个面向年轻人的 AI 路径陪伴 / 成长伙伴产品的展示站点。

线上预览(Vercel):https://pathpal-ai.vercel.app
仓库地址:https://github.com/Nigel-nyc/Pathpal-AI

---

## 项目简介

本仓库是 Pathpal AI 的前端官网,基于 **React 18 + Vite + TypeScript + Tailwind CSS** 构建,包含:

- **Landing Page**:首屏视频背景 Hero + 产品功能展示 + Footer 三屏结构
- **三个功能子页面**
  - `/features/overview` —— 产品总览
  - `/features/pathpal-agent` —— Pathpal Agent 智能体介绍
  - `/features/community` —— 社区功能介绍
- **中英双语切换**:基于 React Context 的 i18n 方案,支持 EN / 中文
- **动态背景与微交互**:Framer Motion 驱动的动效,首屏循环视频背景

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | React 18 |
| 构建 | Vite 5 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 3 |
| 路由 | React Router v7 |
| 动效 | Framer Motion 11 |
| 图标 | lucide-react |
| 部署 | Vercel |

## 目录结构

```
web/
├── public/                  # 静态资源(Logo、视频背景、产品图)
├── src/
│   ├── components/          # 通用组件
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── VideoBackground.tsx
│   │   ├── DataWaveBackground.tsx
│   │   └── Logo.tsx
│   ├── pages/               # 子页面
│   │   ├── OverviewPage.tsx
│   │   ├── PathpalAgentPage.tsx
│   │   └── CommunityPage.tsx
│   ├── i18n/                # 中英文文案
│   │   ├── LanguageContext.tsx
│   │   └── translations.ts
│   ├── App.tsx              # 路由入口
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 本地开发

要求 Node.js ≥ 18。

```bash
# 进入项目目录
cd web

# 安装依赖
npm install

# 启动开发服务器(默认 http://localhost:5173)
npm run dev

# 类型检查 + 构建生产包
npm run build

# 本地预览构建产物
npm run preview
```

## 部署

主分支(`main`)推送后由 Vercel 自动部署。仓库根目录已配置 `vercel.json` 与 `.vercel/`。

## 路由总览

| Path | 页面 |
| --- | --- |
| `/` | 落地页(Hero + Features + Footer) |
| `/?screen=2` | 落地页并自动滚动到 "How it works" 区块 |
| `/features/overview` | 产品总览 |
| `/features/pathpal-agent` | Pathpal Agent 详情 |
| `/features/community` | 社区详情 |

## 开发记录

- **v0.1.0** — 初版上线:落地页 + 3 个功能子页 + 中英双语
