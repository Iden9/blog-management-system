<template>
  <header class="header glass">
    <div class="header-left">
      <a-button
        type="text"
        class="toggle-btn"
        @click="$emit('toggleSidebar')"
      >
        <template #icon><MenuOutlined /></template>
      </a-button>
      <h1 class="page-title">{{ pageTitle }}</h1>
    </div>
    <div class="header-right">
      <a-input
        v-model:value="searchQuery"
        placeholder="搜索文章..."
        class="search-input"
        @input="handleSearch"
      >
        <template #prefix><SearchOutlined /></template>
      </a-input>
      <a-dropdown>
        <a-button type="text" class="user-menu">
          <UserOutlined />
          <span class="username">{{ authStore.user?.username || '用户' }}</span>
          <DownOutlined />
        </a-button>
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="logout">
              <LogoutOutlined />
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuOutlined, SearchOutlined, UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useBlogStore } from '@/stores/blog'
import { useAuthStore } from '@/stores/auth'

defineEmits<{
  toggleSidebar: []
}>()

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const authStore = useAuthStore()

const searchQuery = ref('')

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/': '文章列表',
    '/posts/create': '写文章',
    '/categories': '分类管理',
    '/tags': '标签管理',
    '/search': '搜索'
  }
  return titles[route.path] || '博客管理'
})

function handleSearch() {
  blogStore.searchQuery = searchQuery.value
  if (searchQuery.value && route.path !== '/search') {
    router.push('/search')
  }
}

function handleMenuClick({ key }: { key: string }) {
  if (key === 'logout') {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: var(--spacing-lg) var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--divider);
  background: var(--surface);
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: var(--spacing-sm);
  color: var(--text);
  border-radius: var(--radius-item);
  transition: background 0.2s ease;
}

.toggle-btn:hover {
  background: rgba(239, 246, 255, 0.5);
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.search-input {
  width: 300px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-left: var(--spacing-lg);
}

.username {
  font-size: 14px;
}
</style>

