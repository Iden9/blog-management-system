# GitHub Pages 部署指南

## 已完成的配置

✅ 创建了 GitHub Actions 工作流文件 (`.github/workflows/deploy.yml`)
✅ 更新了 `vite.config.ts` 配置正确的 base path

## 需要在 GitHub 仓库中完成的设置

### 1. 启用 GitHub Pages

1. 访问你的仓库: https://github.com/Iden9/blog-management-system
2. 点击 **Settings** (设置)
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** (来源) 部分:
   - 选择 **GitHub Actions** 作为部署源

### 2. 触发部署

部署会在以下情况自动触发:
- 推送代码到 `main` 分支
- 手动触发 (在 Actions 标签页中)

### 3. 查看部署状态

1. 访问仓库的 **Actions** 标签页
2. 查看 "Deploy to GitHub Pages" 工作流的运行状态
3. 部署成功后，你的网站将在以下地址可访问:
   - https://iden9.github.io/blog-management-system/

## 工作流说明

工作流包含两个主要任务:

1. **Build** (构建)
   - 检出代码
   - 设置 Node.js 环境
   - 安装依赖
   - 构建项目
   - 上传构建产物

2. **Deploy** (部署)
   - 将构建产物部署到 GitHub Pages

## 本地开发

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 注意事项

- 确保仓库是公开的，或者你有 GitHub Pro/Team/Enterprise 账户（私有仓库需要付费才能使用 GitHub Pages）
- 首次部署可能需要几分钟时间
- 如果遇到 404 错误，请检查 `vite.config.ts` 中的 `base` 路径是否与仓库名称匹配
