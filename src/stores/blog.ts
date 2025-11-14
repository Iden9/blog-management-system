import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Post {
  id: number
  title: string
  content: string
  excerpt: string
  author: string
  createdAt: string
  updatedAt: string
  category: string
  tags: string[]
  views: number
}

export interface Category {
  id: number
  name: string
  slug: string
  count: number
}

export interface Tag {
  id: number
  name: string
  slug: string
  count: number
}

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<Post[]>([
    {
      id: 1,
      title: '欢迎来到我的博客',
      content: `# 欢迎来到我的博客

这是一个使用 Vue 3 和 Glassmorphism 设计风格构建的现代化博客系统。

## 特性

- 美观的玻璃态设计
- 响应式布局
- 流畅的用户体验
- 现代化的技术栈

希望你能喜欢这个博客系统！`,
      excerpt: '这是一个使用 Vue 3 和 Glassmorphism 设计风格构建的现代化博客系统。',
      author: 'Admin',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      category: '技术',
      tags: ['Vue', '设计'],
      views: 120
    },
    {
      id: 2,
      title: 'Vue 3 组合式 API 入门指南',
      content: `# Vue 3 组合式 API 入门指南

Vue 3 引入了组合式 API，为组件逻辑提供了更灵活的组织方式。

## 为什么使用组合式 API？

- 更好的逻辑复用
- 更清晰的代码组织
- 更好的 TypeScript 支持

## 基本用法

\`\`\`javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)
    
    return { count, double }
  }
}
\`\`\``,
      excerpt: 'Vue 3 引入了组合式 API，为组件逻辑提供了更灵活的组织方式。',
      author: 'Admin',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      category: '技术',
      tags: ['Vue', 'JavaScript'],
      views: 89
    },
    {
      id: 3,
      title: 'Glassmorphism 设计趋势',
      content: `# Glassmorphism 设计趋势

Glassmorphism（玻璃态设计）是近年来流行的设计趋势，它通过半透明效果和背景模糊创造出优雅的视觉体验。

## 设计特点

- 半透明背景
- 背景模糊效果
- 柔和的阴影
- 清晰的层次感

这种设计风格在现代 Web 应用中越来越受欢迎。`,
      excerpt: 'Glassmorphism（玻璃态设计）是近年来流行的设计趋势，它通过半透明效果和背景模糊创造出优雅的视觉体验。',
      author: 'Admin',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13',
      category: '设计',
      tags: ['设计', 'UI'],
      views: 156
    }
  ])

  const categories = ref<Category[]>([
    { id: 1, name: '技术', slug: 'tech', count: 2 },
    { id: 2, name: '设计', slug: 'design', count: 1 },
    { id: 3, name: '生活', slug: 'life', count: 0 }
  ])

  const tags = ref<Tag[]>([
    { id: 1, name: 'Vue', slug: 'vue', count: 2 },
    { id: 2, name: 'JavaScript', slug: 'javascript', count: 1 },
    { id: 3, name: '设计', slug: 'design', count: 1 },
    { id: 4, name: 'UI', slug: 'ui', count: 1 }
  ])

  const searchQuery = ref('')

  // Computed
  const filteredPosts = computed(() => {
    if (!searchQuery.value) {
      return posts.value
    }
    const query = searchQuery.value.toLowerCase()
    return posts.value.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  })

  // Actions
  function getPostById(id: number): Post | undefined {
    return posts.value.find(post => post.id === id)
  }

  function getPostsByCategory(category: string): Post[] {
    return posts.value.filter(post => post.category === category)
  }

  function getPostsByTag(tag: string): Post[] {
    return posts.value.filter(post => post.tags.includes(tag))
  }

  function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Post {
    const newPost: Post = {
      ...post,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      views: 0
    }
    posts.value.unshift(newPost)
    return newPost
  }

  function updatePost(id: number, updates: Partial<Post>): Post | undefined {
    const post = posts.value.find(p => p.id === id)
    if (post) {
      Object.assign(post, updates, {
        updatedAt: new Date().toISOString().split('T')[0]
      })
      return post
    }
    return undefined
  }

  function deletePost(id: number): boolean {
    const index = posts.value.findIndex(p => p.id === id)
    if (index > -1) {
      posts.value.splice(index, 1)
      return true
    }
    return false
  }

  function incrementViews(id: number) {
    const post = posts.value.find(p => p.id === id)
    if (post) {
      post.views++
    }
  }

  return {
    posts,
    categories,
    tags,
    searchQuery,
    filteredPosts,
    getPostById,
    getPostsByCategory,
    getPostsByTag,
    createPost,
    updatePost,
    deletePost,
    incrementViews
  }
})

