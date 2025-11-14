<template>
  <AdminLayout>
    <div class="search-page">
      <div class="search-header">
        <h2>搜索结果</h2>
        <p v-if="searchQuery" class="search-info">
          搜索 "<strong>{{ searchQuery }}</strong>" 找到 {{ filteredPosts.length }} 篇文章
        </p>
        <p v-else class="search-info">请输入搜索关键词</p>
      </div>

      <div v-if="filteredPosts.length > 0" class="search-results">
        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="result-card card"
          @click="$router.push(`/posts/${post.id}`)"
        >
          <h3 class="result-title">{{ highlightText(post.title, searchQuery) }}</h3>
          <p class="result-excerpt">{{ highlightText(post.excerpt, searchQuery) }}</p>
          <div class="result-meta">
            <span class="result-category">{{ post.category }}</span>
            <span class="result-date">{{ post.createdAt }}</span>
            <span class="result-views">
              <EyeOutlined /> {{ post.views }}
            </span>
          </div>
          <div class="result-tags">
            <a-tag
              v-for="tag in post.tags"
              :key="tag"
            >
              {{ tag }}
            </a-tag>
          </div>
        </div>
      </div>

      <div v-else-if="searchQuery" class="empty-state">
        <p>没有找到相关文章</p>
        <a-button type="primary" @click="$router.push('/')">返回列表</a-button>
      </div>

      <div v-else class="empty-state">
        <p>请在顶部搜索框输入关键词进行搜索</p>
        <a-button type="primary" @click="$router.push('/')">返回列表</a-button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { EyeOutlined } from '@ant-design/icons-vue'
import { useBlogStore } from '@/stores/blog'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

const router = useRouter()
const blogStore = useBlogStore()

const searchQuery = computed(() => blogStore.searchQuery)
const filteredPosts = computed(() => blogStore.filteredPosts)

function highlightText(text: string, query: string): string {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}
</script>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.search-header {
  margin-bottom: var(--spacing-lg);
}

.search-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 var(--spacing-md) 0;
}

.search-info {
  color: var(--muted);
  font-size: 14px;
}

.search-info strong {
  color: var(--primary);
  font-weight: 600;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.result-card {
  cursor: pointer;
  transition: all 0.2s ease;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-accent);
}

.result-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 var(--spacing-md) 0;
  line-height: 1.4;
}

.result-title :deep(mark) {
  background: #fef3c7;
  color: var(--text);
  padding: 2px 4px;
  border-radius: 4px;
}

.result-excerpt {
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.result-excerpt :deep(mark) {
  background: #fef3c7;
  color: var(--text);
  padding: 2px 4px;
  border-radius: 4px;
}

.result-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: 12px;
  color: var(--muted);
  margin-bottom: var(--spacing-sm);
  align-items: center;
}

.result-views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.result-category {
  padding: 2px var(--spacing-sm);
  background: #eff6ff;
  color: var(--primary);
  border-radius: var(--radius-item);
  font-weight: 500;
}

.result-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--divider);
}


.empty-state {
  text-align: center;
  padding: var(--spacing-xl) * 3;
}

.empty-state p {
  font-size: 18px;
  color: var(--muted);
  margin-bottom: var(--spacing-xl);
}
</style>

