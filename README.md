# 博客管理系统

一个基于 Vue 3 + TypeScript + Ant Design Vue 构建的现代化博客管理系统，采用 Glassmorphism（玻璃态）设计风格。

## ✨ 特性

- 🎨 **现代化设计** - Glassmorphism 玻璃态设计风格，柔和的渐变背景和半透明效果
- 📝 **完整的博客功能** - 文章创建、编辑、删除、查看等核心功能
- 🏷️ **分类和标签管理** - 支持文章分类和标签的完整管理
- 🔍 **强大的搜索** - 支持关键词搜索，高亮显示匹配内容
- 👤 **用户认证** - 登录、注册功能，路由守卫保护
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎯 **TypeScript** - 完整的类型支持，更好的开发体验
- ⚡ **Vite** - 快速的开发构建工具

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **UI 组件库**: Ant Design Vue 4.x
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **构建工具**: Vite
- **图标**: @ant-design/icons-vue

## 📦 安装

```bash
# 克隆项目
git clone <repository-url>

# 进入项目目录
cd blog

# 安装依赖
npm install
```

## 🚀 开发

```bash
# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
blog/
├── src/
│   ├── assets/          # 静态资源
│   │   ├── styles/      # 全局样式
│   │   └── logo.svg
│   ├── components/      # 组件
│   │   └── layouts/     # 布局组件
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 状态管理
│   │   ├── auth.ts      # 认证状态
│   │   └── blog.ts      # 博客数据
│   ├── views/           # 页面组件
│   │   ├── Login.vue    # 登录页
│   │   ├── Register.vue # 注册页
│   │   ├── PostList.vue # 文章列表
│   │   ├── PostDetail.vue # 文章详情
│   │   ├── PostEdit.vue # 文章编辑
│   │   ├── CategoryManage.vue # 分类管理
│   │   ├── TagManage.vue # 标签管理
│   │   └── Search.vue  # 搜索页
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── public/              # 公共资源
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 设计规范

### 设计 Tokens

- **主色调**: `#2563eb` (蓝色 600)
- **渐变**: `linear-gradient(135deg, #60a5fa, #2563eb)`
- **圆角**: 卡片 16px, 输入框 10px, 菜单项 8px
- **间距**: 4px, 8px, 12px, 16px, 24px

### 设计特点

- 半透明玻璃态卡片效果
- 柔和的渐变背景
- 流畅的动画过渡
- 统一的圆角设计
- 清晰的视觉层次

## 🔐 功能说明

### 用户认证

- **登录**: 支持用户名和密码登录
- **注册**: 完整的用户注册流程，包含表单验证
- **路由守卫**: 自动保护需要认证的页面
- **状态持久化**: 登录状态保存在 localStorage

### 文章管理

- **文章列表**: 卡片式展示，支持分类和标签筛选
- **文章详情**: 完整的文章内容展示，支持 Markdown
- **创建/编辑**: 富文本编辑器，支持分类、标签设置
- **删除功能**: 安全的删除确认机制

### 分类和标签

- **分类管理**: 创建、编辑、删除分类
- **标签管理**: 创建、编辑、删除标签
- **统计信息**: 显示每个分类/标签下的文章数量

### 搜索功能

- **关键词搜索**: 支持标题、内容、摘要、标签搜索
- **高亮显示**: 搜索结果中关键词高亮
- **实时搜索**: 顶部搜索框实时搜索

## 🎯 使用说明

### 登录

1. 访问 `/login` 页面
2. 输入用户名和密码（任意用户名和密码，至少3个字符）
3. 点击登录按钮

### 注册

1. 访问 `/register` 页面
2. 填写用户名、邮箱、密码等信息
3. 同意用户协议和隐私政策
4. 点击注册按钮
5. 注册成功后自动跳转到登录页

### 创建文章

1. 登录后点击"写文章"或导航栏中的"✏️ 写文章"
2. 填写文章标题、分类、作者、摘要、标签、内容
3. 点击"发布"按钮

### 管理分类和标签

1. 在侧边栏点击"分类管理"或"标签管理"
2. 点击"新建"按钮创建新的分类/标签
3. 点击"编辑"或"删除"进行管理操作

## 🔧 配置

### 环境变量

项目使用 Vite，可以在 `.env` 文件中配置环境变量：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 路由配置

路由配置在 `src/router/index.ts` 中，可以修改路由和路由守卫逻辑。

### 状态管理

- `src/stores/auth.ts` - 用户认证状态
- `src/stores/blog.ts` - 博客数据状态

## 📝 开发规范

- 使用 Composition API
- TypeScript 严格模式
- 组件命名使用 PascalCase
- 文件命名使用 PascalCase (组件) 或 kebab-case (工具函数)
- 遵循 ESLint 规则

## 🚧 待实现功能

- [ ] Markdown 编辑器增强
- [ ] 图片上传功能
- [ ] 文章草稿保存
- [ ] 文章评论功能
- [ ] 用户权限管理
- [ ] 数据导出功能
- [ ] 暗色主题支持

## 📄 许可证

MIT License

## 👨‍💻 作者

Created with ❤️ using Vue 3 and Ant Design Vue

## 🙏 致谢

- [Vue.js](https://vuejs.org/)
- [Ant Design Vue](https://antdv.com/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
