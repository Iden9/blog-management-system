import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref<{
    username: string
    email?: string
  } | null>(null)
  const token = ref<string | null>(null)

  function login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // 模拟登录请求
      setTimeout(() => {
        // 简单的验证逻辑（实际项目中应该调用后端 API）
        if (username && password) {
          isAuthenticated.value = true
          user.value = { username }
          token.value = 'mock-token-' + Date.now()
          // 保存到 localStorage
          localStorage.setItem('token', token.value)
          localStorage.setItem('user', JSON.stringify(user.value))
          resolve(true)
        } else {
          resolve(false)
        }
      }, 500)
    })
  }

  function register(username: string, email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // 模拟注册请求
      setTimeout(() => {
        // 检查是否已存在（从 localStorage 读取已注册用户）
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        const userExists = registeredUsers.some((u: any) => u.username === username || u.email === email)
        
        if (userExists) {
          resolve(false)
          return
        }

        // 注册成功，保存用户信息
        const newUser = { username, email, password: '***' } // 实际项目中不应该保存明文密码
        registeredUsers.push(newUser)
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
        
        resolve(true)
      }, 800)
    })
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function checkAuth() {
    // 从 localStorage 恢复登录状态
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      isAuthenticated.value = true
      token.value = savedToken
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        user.value = null
      }
    }
  }

  // 初始化时检查认证状态
  checkAuth()

  return {
    isAuthenticated,
    user,
    token,
    login,
    register,
    logout,
    checkAuth
  }
})

