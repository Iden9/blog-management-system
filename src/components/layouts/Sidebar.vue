<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-header">
      <h2 v-if="!collapsed" class="logo">博客管理</h2>
      <div v-else class="logo-icon">B</div>
    </div>
    <nav class="sidebar-nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: $route.path === item.path }"
      >
        <component :is="item.icon" class="nav-icon" />
        <span v-if="!collapsed" class="nav-text">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  FileTextOutlined,
  EditOutlined,
  FolderOutlined,
  TagsOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'

defineProps<{
  collapsed: boolean
}>()

const navItems = [
  { path: '/', label: '文章列表', icon: FileTextOutlined },
  { path: '/posts/create', label: '写文章', icon: EditOutlined },
  { path: '/categories', label: '分类管理', icon: FolderOutlined },
  { path: '/tags', label: '标签管理', icon: TagsOutlined },
  { path: '/search', label: '搜索', icon: SearchOutlined }
]
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  background: var(--surface);
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  box-shadow: var(--shadow-accent);
  transition: width 0.3s ease;
  z-index: 100;
  overflow-y: auto;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--divider);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary);
  margin: 0;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: var(--gradient-primary);
  border-radius: var(--radius-item);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
}

.sidebar-nav {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-item);
  text-decoration: none;
  color: var(--text);
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(239, 246, 255, 0.5);
}

.nav-item.active {
  background: #eff6ff;
  color: var(--primary);
  font-weight: 600;
}

.nav-icon {
  font-size: 16px;
  flex-shrink: 0;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  white-space: nowrap;
}

.sidebar.collapsed .nav-text {
  display: none;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: var(--spacing-md);
}
</style>

