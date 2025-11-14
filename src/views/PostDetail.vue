<template>
  <AdminLayout>
    <div v-if="post" class="post-detail">
      <div class="post-actions">
        <a-button @click="$router.push('/')">← 返回列表</a-button>
        <a-space>
          <a-button @click="$router.push(`/posts/${post.id}/edit`)">编辑</a-button>
          <a-button danger @click="handleDelete">删除</a-button>
        </a-space>
      </div>

      <article class="post-content card">
        <div class="post-header">
          <h1 class="post-title">{{ post.title }}</h1>
          <div class="post-meta-info">
            <span class="meta-item">
              <strong>作者:</strong> {{ post.author }}
            </span>
            <span class="meta-item">
              <strong>分类:</strong> 
              <span class="post-category">{{ post.category }}</span>
            </span>
            <span class="meta-item">
              <strong>发布时间:</strong> {{ post.createdAt }}
            </span>
            <span class="meta-item">
              <strong>更新时间:</strong> {{ post.updatedAt }}
            </span>
            <span class="meta-item">
              <strong>阅读量:</strong> {{ post.views }}
            </span>
          </div>
          <div class="post-tags">
            <a-tag
              v-for="tag in post.tags"
              :key="tag"
            >
              {{ tag }}
            </a-tag>
          </div>
        </div>

        <div class="divider"></div>

        <div class="post-body" v-html="formatContent(post.content)"></div>
      </article>
    </div>
    <div v-else class="not-found">
      <p>文章不存在</p>
      <a-button type="primary" @click="$router.push('/')">返回列表</a-button>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const postId = computed(() => parseInt(route.params.id as string))
const post = computed(() => blogStore.getPostById(postId.value))

function formatContent(content: string): string {
  // 简单的 Markdown 转 HTML（实际项目中应使用专业的 Markdown 解析器）
  return content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/`(.*?)`/gim, '<code>$1</code>')
    .replace(/\n/gim, '<br>')
}

function handleDelete() {
  if (confirm('确定要删除这篇文章吗？')) {
    blogStore.deletePost(postId.value)
    router.push('/')
  }
}

onMounted(() => {
  if (post.value) {
    blogStore.incrementViews(postId.value)
  }
})
</script>

<style scoped>
.post-detail {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: var(--spacing-md);
}

.post-content {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.post-header {
  margin-bottom: var(--spacing-lg);
}

.post-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 var(--spacing-lg) 0;
  line-height: 1.3;
}

.post-meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  font-size: 14px;
  color: var(--muted);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.meta-item strong {
  color: var(--text);
}

.post-tags {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.tag {
  padding: 4px var(--spacing-md);
  background: #eff6ff;
  color: var(--primary);
  border-radius: var(--radius-item);
  font-size: 13px;
  font-weight: 500;
}

.post-body {
  line-height: 1.8;
  color: var(--text);
  font-size: 16px;
}

.post-body :deep(h1) {
  font-size: 28px;
  margin: var(--spacing-xl) 0 var(--spacing-lg) 0;
  color: var(--text);
}

.post-body :deep(h2) {
  font-size: 24px;
  margin: var(--spacing-lg) 0 var(--spacing-md) 0;
  color: var(--text);
}

.post-body :deep(h3) {
  font-size: 20px;
  margin: var(--spacing-md) 0 var(--spacing-sm) 0;
  color: var(--text);
}

.post-body :deep(code) {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.post-body :deep(strong) {
  font-weight: 600;
  color: var(--text);
}

.post-body :deep(em) {
  font-style: italic;
}

.not-found {
  text-align: center;
  padding: var(--spacing-xl) * 3;
}

.not-found p {
  font-size: 18px;
  color: var(--muted);
  margin-bottom: var(--spacing-xl);
}
</style>

