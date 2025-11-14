<template>
  <div class="admin-layout">
    <Sidebar :collapsed="sidebarCollapsed" />
    <div class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <Header @toggleSidebar="toggleSidebar" />
      <div class="content-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const sidebarCollapsed = ref(false)

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 200px;
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 64px;
}

.content-wrapper {
  padding: var(--spacing-xl);
  max-width: 1400px;
  margin: 0 auto;
}
</style>

