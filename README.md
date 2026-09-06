# 奥德赛故事图谱 · The Odyssey Story Graph

> 一张可拖拽、可缩放的羊皮古地图图谱，把荷马史诗《奥德赛》整部作品的情节主线与人物、地点、主题关联在同一张画布上呈现。

在线预览：<https://3000-iu586ophyq9ifl11cwwoj.e2b.app>
（E2B 沙盒预览地址，闲置约一小时后自动暂停，重新访问即会唤醒。）

---

## ✨ 功能介绍

- **可交互故事图谱**：奥德修斯归乡十年的五大情节节点沿一条手绘虚线航路铺开，可自由拖拽平移、滚轮 / 双指缩放。
- **逐层展开**：点击任一情节节点，即可展开挂载在其上的相关**人物 / 地点 / 主题**子节点，连线随之延展。
- **三类节点分色**：人物（红棕印章）、地点（岛屿图标）、主题（符文标签）以颜色与图标区分，一目了然。
- **节点详情抽屉**：点击任意节点，从底部滑出典藏式详情——一句话简介、背景介绍、关系列表、原文看点；人物之间还可互相跳转。
- **类型筛选**：顶部可按人物 / 地点 / 主题过滤，聚焦某一维度；支持一键「全部展开 / 全部收起」。
- **丰富内容**：内置奥德修斯、佩涅洛佩、忒勒马科斯、雅典娜、波塞冬、瑟茜、卡吕普索、瑙西卡、欧律克勒亚、安提诺俄斯等主要人物，以及特洛伊、独眼巨人岛、冥府、奥吉吉亚、斯刻里亚、伊萨卡等地点，与归乡、傲慢与神罚、智谋、款待之礼、忠诚、身份等核心主题。
- **中英双语**：内置简体中文 / English 语言切换，支持跟随系统偏好。
- **社区分享**：一键将这张故事图谱分享到 Eazo 社区。

所有图谱内容为内置静态数据，无需登录、无需数据库。

---

## 🧱 技术栈

| 领域 | 使用 |
|---|---|
| 框架 | [Next.js 16](https://nextjs.org/)（App Router）、React 19、TypeScript |
| 运行时 / 包管理 | [Bun](https://bun.sh/) |
| 样式 | Tailwind CSS v4、shadcn/ui、设计 Token 驱动的 CSS 变量 |
| 动画 | framer-motion |
| 图标 | lucide-react |
| 图谱渲染 | 原生 SVG 连线 + CSS transform 平移缩放，无第三方图谱库 |
| 国际化 | i18next + react-i18next（`en-US` / `zh-CN`） |
| 平台能力 | [@eazo/sdk](https://eazo.ai)（社区分享等） |

### 主要目录结构

```
src/
├─ app/
│  ├─ page.tsx                      # 图谱主页（画布 + 筛选 + 详情抽屉 + 关于）
│  └─ eazo-cover-preview/           # 应用封面动画预览
├─ components/graph/
│  ├─ graph-canvas.tsx              # 可拖拽缩放画布 + 连线层
│  ├─ node-chip.tsx                 # 情节 / 子节点印章
│  ├─ detail-drawer.tsx             # 底部详情抽屉
│  ├─ filter-strip.tsx             # 类型筛选条
│  ├─ kind-glyph.tsx                # 人物 / 地点 / 主题手绘图标
│  ├─ lang-toggle.tsx               # 中 / 英 / 系统 语言切换
│  └─ share-graph-button.tsx        # 社区分享
├─ lib/graph/
│  ├─ data.ts                       # 情节骨架 + 人物 / 地点 / 主题数据
│  ├─ layout.ts                     # 节点定位与连线布局计算
│  └─ kind.ts                       # 节点类型配色
└─ i18n/locales/                    # zh-CN / en-US 文案
```

---

## 🚀 本地运行

需要安装 [Bun](https://bun.sh/)。

```bash
# 1. 安装依赖
bun install

# 2. 启动开发服务器
bun dev
```

打开 <http://localhost:3000> 即可查看。

常用命令：

```bash
bun run lint     # 代码检查
bun run build    # 生产构建
```

> 说明：本应用无需数据库与登录即可运行；`.env` 中的 Eazo 平台变量仅用于社区分享等平台能力，缺省时核心图谱功能仍可正常使用。

---

## 🔗 链接汇总

- 在线预览（E2B 沙盒）：<https://3000-iu586ophyq9ifl11cwwoj.e2b.app>
- 代码仓库：<https://github.com/LotusLiuXY/odyssey-story-graph>
- Eazo 平台：<https://eazo.ai>
- Next.js 文档：<https://nextjs.org/docs>

---

## 📖 关于《奥德赛》

荷马史诗《奥德赛》讲述奥德修斯在特洛伊陷落后，历经十年艰险归返故乡伊萨卡的故事。本图谱把归乡之旅拆解为五个主要情节，并将牵涉其中的人物、地点与主题绑定其上，帮助读者既能俯瞰全局，又能逐层深入。

---

## 📄 许可证

本项目基于 [MIT License](./LICENSE) 开源。
