## 核心技术栈

### 前端框架与路由

- React 19.1.0 - 最新版本的 React
- @tanstack/react-router - 类型安全的路由管理
- TypeScript - 静态类型检查

### 状态管理与数据获取

- @tanstack/react-query - 服务端状态管理和数据获取
- Jotai - 原子化状态管理
- Axios - HTTP 客户端

### UI 组件库与样式

- Material-UI (MUI) - React 组件库
- Emotion - CSS-in-JS 样式解决方案
- TailwindCSS 4.x - 原子化 CSS 框架
- Motion - 动画库

### 表单处理

- React Hook Form - 高性能表单库
- Zod - 模式验证库
- @hookform/resolvers - 表单验证集成

### 数据可视化

- ECharts - 图表库

### 构建工具与开发环境

- Vite 6.x - 现代化构建工具
- SWC - 快速的 TypeScript/JavaScript 编译器
- PNPM - 高效的包管理器

## 项目结构特点

### 模块化架构

src/
├── modules/ # 业务模块 (auth, form, pokemon)
├── components/ # 通用组件
├── hooks/ # 自定义 Hooks
├── utils/ # 工具函数
├── routes/ # 路由配置
├── theme/ # 主题配置
└── common/ # 公共配置

### 路由组织

- 使用文件系统路由
- 支持认证路由 (\_authenticated/)
- 支持分组路由 ((auth)/, (error)/)

## 开发工具配置

### 代码质量

- ESLint - 代码检查
- Prettier - 代码格式化
- Husky - Git hooks
- Commitlint - 提交信息规范
- Lint-staged - 暂存文件检查

### 开发体验

- React Query Devtools - 开发调试工具
- SVG 支持 - 通过 vite-plugin-svgr
- 路径别名 - ~ 指向 src 目录
- 热重载 - Vite 开发服务器

## 项目特色功能

1. 类型安全的路由 - 使用 TanStack Router 实现完全类型安全的路由
2. 现代化状态管理 - 结合 React Query 和 Jotai
3. 组件化设计 - 丰富的自定义组件库
4. 工具函数库 - 完整的工具函数集合
5. 主题系统 - 支持深色/浅色模式切换
6. 版本检查 - 自动版本更新检测

## 部署配置

- 配置了 GitHub Pages 部署
- 支持基础路径配置
- 生产环境优化（代码分割、压缩等）

## React 组件精选

- **Form 表单**: [react-hook-form](https://www.npmjs.com/package/react-hook-form)
- **Toast**: [sonner](https://www.npmjs.com/package/sonner) | [react-toastify](https://www.npmjs.com/package/react-toastify)
- **代码编辑器**: [@monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react) | [react-monaco-editor](https://www.npmjs.com/package/react-monaco-editor)
- **PDF**: [react-pdf](https://www.npmjs.com/package/react-pdf)
- **右键菜单**: [react-contexify](https://www.npmjs.com/package/react-contexify)
- **轮播**: [embla-carousel-react](https://www.npmjs.com/package/embla-carousel-react) | [react-slick](https://www.npmjs.com/package/react-slick)
- **页面 meta 属性**: [react-helmet-async](https://www.npmjs.com/package/react-helmet-async)
- **分割面板**: [react-resizable-panels](https://www.npmjs.com/package/react-resizable-panels) | [react-split](https://www.npmjs.com/package/react-split) | [react-split-pane](https://www.npmjs.com/package/react-split-pane)
- **拖拽**: [dnd-kit](https://www.npmjs.com/package/@dnd-kit/core)
- **Json 显示**: [react-json-view](https://www.npmjs.com/package/react-json-view) | [@uiw/react-json-view](https://www.npmjs.com/package/@uiw/react-json-view)
- **Json 编辑**: [vanilla-jsoneditor](https://www.npmjs.com/package/vanilla-jsoneditor) | [react-json-editor-ajrm](https://www.npmjs.com/package/react-json-editor-ajrm)
- **二维码**: [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- **Markdown**: [react-markdown](https://www.npmjs.com/package/react-markdown) | [@uiw/react-markdown-preview](https://www.npmjs.com/package/@uiw/react-markdown-preview) | [markdown-it](https://www.npmjs.com/package/markdown-it)
- **模糊搜索**: [fuse.js](https://www.npmjs.com/package/fuse.js)
- **引导提示**: [react-joyride](https://www.npmjs.com/package/react-joyride)
- **组织结构chart**: [react-organizational-chart](https://www.npmjs.com/package/react-organizational-chart)
- **滚动条**: [SimpleBar](https://www.npmjs.com/package/simplebar) | [perfect-scrollbar](https://www.npmjs.com/package/perfect-scrollbar)
