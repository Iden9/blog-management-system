<template>
  <AdminLayout>
    <div class="category-manage">
      <div class="page-header">
        <h2>分类管理</h2>
        <a-button type="primary" @click="showAddModal = true">
          + 新建分类
        </a-button>
      </div>

      <div class="categories-grid card">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-card"
        >
          <div class="category-info">
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-slug">{{ category.slug }}</p>
            <span class="category-count">{{ category.count }} 篇文章</span>
          </div>
          <a-space>
            <a-button @click="editCategory(category)">编辑</a-button>
            <a-button danger @click="deleteCategory(category.id)">删除</a-button>
          </a-space>
        </div>
      </div>

      <a-modal
        v-model:open="modalVisible"
        :title="editingCategory ? '编辑分类' : '新建分类'"
        @ok="handleSubmit"
        @cancel="closeModal"
      >
        <a-form :model="formData" layout="vertical">
          <a-form-item label="分类名称" required>
            <a-input
              v-model:value="formData.name"
              placeholder="请输入分类名称"
            />
          </a-form-item>
          <a-form-item label="URL 别名" required>
            <a-input
              v-model:value="formData.slug"
              placeholder="例如: tech, design"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBlogStore, type Category } from '@/stores/blog'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

const blogStore = useBlogStore()

const categories = computed(() => blogStore.categories)
const showAddModal = ref(false)
const editingCategory = ref<Category | null>(null)

const modalVisible = computed({
  get: () => showAddModal.value || !!editingCategory.value,
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

function editCategory(category: Category) {
  editingCategory.value = category
  formData.value = {
    name: category.name,
    slug: category.slug
  }
}

function deleteCategory(id: number) {
  if (confirm('确定要删除这个分类吗？')) {
    // 这里应该实现删除分类的逻辑
    // 由于是示例，暂时只显示提示
    alert('删除功能需要实现')
  }
}

function handleSubmit() {
  // 这里应该实现创建/更新分类的逻辑
  alert(editingCategory.value ? '更新功能需要实现' : '创建功能需要实现')
  closeModal()
}

function closeModal() {
  showAddModal.value = false
  editingCategory.value = null
  formData.value = { name: '', slug: '' }
}
</script>


<style scoped>
.category-manage {
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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.category-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border: 1px solid var(--divider);
  border-radius: var(--radius-card);
  transition: all 0.2s ease;
}

.category-card:hover {
  box-shadow: var(--shadow-1);
}

.category-info {
  flex: 1;
}

.category-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 var(--spacing-xs) 0;
}

.category-slug {
  font-size: 14px;
  color: var(--muted);
  margin: 0 0 var(--spacing-sm) 0;
}

.category-count {
  font-size: 12px;
  color: var(--muted);
}

</style>

