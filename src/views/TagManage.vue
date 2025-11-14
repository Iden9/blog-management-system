<template>
  <AdminLayout>
    <div class="tag-manage">
      <div class="page-header">
        <h2>标签管理</h2>
        <a-button type="primary" @click="showAddModal = true">
          + 新建标签
        </a-button>
      </div>

      <div class="tags-grid card">
        <div
          v-for="tag in tags"
          :key="tag.id"
          class="tag-card"
        >
          <div class="tag-info">
            <h3 class="tag-name">{{ tag.name }}</h3>
            <p class="tag-slug">{{ tag.slug }}</p>
            <span class="tag-count">{{ tag.count }} 篇文章</span>
          </div>
          <a-space>
            <a-button @click="editTag(tag)">编辑</a-button>
            <a-button danger @click="deleteTag(tag.id)">删除</a-button>
          </a-space>
        </div>
      </div>

      <a-modal
        v-model:open="modalVisible"
        :title="editingTag ? '编辑标签' : '新建标签'"
        @ok="handleSubmit"
        @cancel="closeModal"
      >
        <a-form :model="formData" layout="vertical">
          <a-form-item label="标签名称" required>
            <a-input
              v-model:value="formData.name"
              placeholder="请输入标签名称"
            />
          </a-form-item>
          <a-form-item label="URL 别名" required>
            <a-input
              v-model:value="formData.slug"
              placeholder="例如: vue, javascript"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBlogStore, type Tag } from '@/stores/blog'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

const blogStore = useBlogStore()

const tags = computed(() => blogStore.tags)
const showAddModal = ref(false)
const editingTag = ref<Tag | null>(null)

const modalVisible = computed({
  get: () => showAddModal.value || !!editingTag.value,
  set: (val) => {
    if (!val) {
      closeModal()
    }
  }
})

const formData = ref({
  name: '',
  slug: ''
})

function editTag(tag: Tag) {
  editingTag.value = tag
  formData.value = {
    name: tag.name,
    slug: tag.slug
  }
}

function deleteTag(id: number) {
  if (confirm('确定要删除这个标签吗？')) {
    // 这里应该实现删除标签的逻辑
    alert('删除功能需要实现')
  }
}

function handleSubmit() {
  // 这里应该实现创建/更新标签的逻辑
  alert(editingTag.value ? '更新功能需要实现' : '创建功能需要实现')
  closeModal()
}

function closeModal() {
  showAddModal.value = false
  editingTag.value = null
  formData.value = { name: '', slug: '' }
}
</script>

<style scoped>
.tag-manage {
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

.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.tag-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border: 1px solid var(--divider);
  border-radius: var(--radius-card);
  transition: all 0.2s ease;
}

.tag-card:hover {
  box-shadow: var(--shadow-1);
}

.tag-info {
  flex: 1;
}

.tag-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 var(--spacing-xs) 0;
}

.tag-slug {
  font-size: 14px;
  color: var(--muted);
  margin: 0 0 var(--spacing-sm) 0;
}

.tag-count {
  font-size: 12px;
  color: var(--muted);
}

</style>

