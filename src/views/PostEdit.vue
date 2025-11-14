<template>
  <AdminLayout>
    <div class="post-edit">
      <div class="page-header">
        <h2>{{ isEdit ? '编辑文章' : '新建文章' }}</h2>
        <a-button @click="$router.push('/')">← 返回列表</a-button>
      </div>

      <a-form class="post-form card" @submit.prevent="handleSubmit">
        <a-form-item label="标题" required>
          <a-input
            v-model:value="formData.title"
            placeholder="请输入文章标题"
            size="large"
          />
        </a-form-item>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="分类" required>
              <a-select
                v-model:value="formData.category"
                placeholder="请选择分类"
                size="large"
              >
                <a-select-option value="">请选择分类</a-select-option>
                <a-select-option
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.name"
                >
                  {{ cat.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="作者" required>
              <a-input
                v-model:value="formData.author"
                placeholder="请输入作者名称"
                size="large"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item label="摘要">
          <a-textarea
            v-model:value="formData.excerpt"
            :rows="3"
            placeholder="请输入文章摘要"
          />
        </a-form-item>

        <a-form-item label="标签（用逗号分隔）">
          <a-input
            v-model:value="tagInput"
            placeholder="例如: Vue, JavaScript, 设计"
            @blur="updateTags"
            @pressEnter="updateTags"
          />
          <div class="tags-preview">
            <a-tag
              v-for="tag in formData.tags"
              :key="tag"
              closable
              @close="removeTag(tag)"
            >
              {{ tag }}
            </a-tag>
          </div>
        </a-form-item>

        <a-form-item label="内容" required>
          <a-textarea
            v-model:value="formData.content"
            :rows="20"
            placeholder="请输入文章内容（支持 Markdown）"
            class="content-textarea"
          />
        </a-form-item>

        <a-form-item>
          <a-space>
            <a-button @click="$router.push('/')">取消</a-button>
            <a-button type="primary" html-type="submit">
              {{ isEdit ? '更新' : '发布' }}
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useBlogStore, type Post } from '@/stores/blog'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const isEdit = computed(() => route.path.includes('/edit'))
const postId = computed(() => {
  if (isEdit.value) {
    return parseInt(route.params.id as string)
  }
  return null
})

const categories = computed(() => blogStore.categories)

const formData = ref<Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views'>>({
  title: '',
  content: '',
  excerpt: '',
  author: 'Admin',
  category: '',
  tags: []
})

const tagInput = ref('')

function updateTags() {
  if (tagInput.value.trim()) {
    const tags = tagInput.value
      .split(',')
      .map(t => t.trim())
      .filter(t => t && !formData.value.tags.includes(t))
    formData.value.tags.push(...tags)
    tagInput.value = ''
  }
}

function removeTag(tag: string) {
  const index = formData.value.tags.indexOf(tag)
  if (index > -1) {
    formData.value.tags.splice(index, 1)
  }
}

function handleSubmit() {
  if (isEdit.value && postId.value) {
    blogStore.updatePost(postId.value, formData.value)
  } else {
    blogStore.createPost(formData.value)
  }
  router.push('/')
}

onMounted(() => {
  if (isEdit.value && postId.value) {
    const post = blogStore.getPostById(postId.value)
    if (post) {
      formData.value = {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        author: post.author,
        category: post.category,
        tags: [...post.tags]
      }
    }
  }
})
</script>

<style scoped>
.post-edit {
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

.post-form {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.form-group {
  margin-bottom: var(--spacing-xl);
}


.content-textarea {
  font-family: 'Courier New', monospace;
  line-height: 1.6;
}

.tags-preview {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-top: var(--spacing-sm);
}
</style>

