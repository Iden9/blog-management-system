<template>
  <AdminLayout>
    <div class="post-list">
      <div class="page-header">
        <h2>文章列表</h2>
        <a-button type="primary" @click="$router.push('/posts/create')">
          + 新建文章
        </a-button>
      </div>

      <div class="filters">
        <a-select
          v-model:value="selectedCategory"
          placeholder="所有分类"
          class="filter-select"
          @change="filterPosts"
          style="width: 200px"
        >
          <a-select-option value="">所有分类</a-select-option>
          <a-select-option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.name"
          >
            {{ cat.name }} ({{ cat.count }})
          </a-select-option>
        </a-select>
        <a-select
          v-model:value="selectedTag"
          placeholder="所有标签"
          class="filter-select"
          @change="filterPosts"
          style="width: 200px"
        >
          <a-select-option value="">所有标签</a-select-option>
          <a-select-option
            v-for="tag in tags"
            :key="tag.id"
            :value="tag.name"
          >
            {{ tag.name }} ({{ tag.count }})
          </a-select-option>
        </a-select>
      </div>

      <div class="posts-grid">
        <div
          v-for="post in displayedPosts"
          :key="post.id"
          class="post-card card"
          @click="$router.push(`/posts/${post.id}`)"
        >
          <div class="post-header">
            <h3 class="post-title">{{ post.title }}</h3>
            <div class="post-meta">
              <span class="post-category">{{ post.category }}</span>
            </div>
          </div>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <div class="post-footer">
            <div class="post-tags">
              <a-tag
                v-for="tag in post.tags"
                :key="tag"
              >
                {{ tag }}
              </a-tag>
            </div>
            <div class="post-info">
              <span class="post-author">{{ post.author }}</span>
              <span class="post-date">{{ post.createdAt }}</span>
              <span class="post-views">
                <EyeOutlined /> {{ post.views }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="displayedPosts.length === 0" class="empty-state">
        <p>暂无文章</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { EyeOutlined } from '@ant-design/icons-vue'
import { useBlogStore } from '@/stores/blog'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

const router = useRouter()
const blogStore = useBlogStore()

const selectedCategory = ref('')
const selectedTag = ref('')

const categories = computed(() => blogStore.categories)
const tags = computed(() => blogStore.tags)

const displayedPosts = computed(() => {
  let posts = blogStore.filteredPosts

  if (selectedCategory.value) {
    posts = posts.filter(p => p.category === selectedCategory.value)
  }

  if (selectedTag.value) {
    posts = posts.filter(p => p.tags.includes(selectedTag.value))
  }

  return posts
})

function filterPosts() {
  // 过滤逻辑已在 computed 中处理
}

onMounted(() => {
  blogStore.searchQuery = ''
})
</script>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.filters {
  display: flex;
  gap: var(--spacing-lg);
}


.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-xl);
}

.post-card {
  cursor: pointer;
  transition: all 0.2s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-accent);
}

.post-header {
  margin-bottom: var(--spacing-md);
}

.post-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 var(--spacing-sm) 0;
}

.post-meta {
  display: flex;
  gap: var(--spacing-sm);
}

.post-category {
  display: inline-block;
  padding: 4px var(--spacing-sm);
  background: #eff6ff;
  color: var(--primary);
  border-radius: var(--radius-item);
  font-size: 12px;
  font-weight: 500;
}

.post-excerpt {
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--divider);
}

.post-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.post-info {
  display: flex;
  gap: var(--spacing-md);
  font-size: 12px;
  color: var(--muted);
  align-items: center;
}

.post-views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl) * 2;
  color: var(--muted);
}
</style>

