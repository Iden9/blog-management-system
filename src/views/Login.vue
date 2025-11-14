<template>
  <div class="login-container">
    <!-- 背景装饰元素 -->
    <div class="bg-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>

    <!-- 登录卡片 -->
    <div class="login-wrapper">
      <div class="login-card">
        <!-- Logo 区域 -->
        <div class="login-logo">
          <div class="logo-icon">
            <FileTextOutlined />
          </div>
        </div>

        <!-- 标题区域 -->
        <div class="login-header">
          <h1 class="login-title">博客管理系统</h1>
          <p class="login-subtitle">欢迎回来，请登录您的账户</p>
        </div>

        <!-- 表单区域 -->
        <a-form
          :model="loginForm"
          :rules="rules"
          @finish="handleLogin"
          @finishFailed="handleLoginFailed"
          layout="vertical"
          class="login-form"
        >
          <a-form-item name="username" class="form-item-custom">
            <a-input
              v-model:value="loginForm.username"
              size="large"
              placeholder="请输入用户名"
              class="custom-input"
            >
              <template #prefix>
                <UserOutlined class="input-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" class="form-item-custom">
            <a-input-password
              v-model:value="loginForm.password"
              size="large"
              placeholder="请输入密码"
              class="custom-input"
            >
              <template #prefix>
                <LockOutlined class="input-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="form-options">
            <a-checkbox v-model:checked="rememberMe" class="remember-checkbox">
              记住我
            </a-checkbox>
            <a class="forgot-link">忘记密码？</a>
          </div>

          <a-form-item class="submit-item">
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              :loading="loading"
              block
              class="login-button"
            >
              <span v-if="!loading">登录</span>
              <span v-else>登录中...</span>
            </a-button>
          </a-form-item>
        </a-form>

        <!-- 错误提示 -->
        <transition name="fade">
          <div v-if="errorMessage" class="error-message">
            <a-alert :message="errorMessage" type="error" show-icon :closable="true" @close="errorMessage = ''" />
          </div>
        </transition>

        <!-- 底部提示 -->
        <div class="login-footer">
          <p class="footer-text">
            还没有账户？
            <RouterLink to="/register" class="register-link">立即注册</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { UserOutlined, LockOutlined, FileTextOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '@/stores/auth'
import type { Rule } from 'ant-design-vue/es/form'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loading = ref(false)
const errorMessage = ref('')
const rememberMe = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const rules: Record<string, Rule[]> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名至少3个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6个字符', trigger: 'blur' }
  ]
}

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''

  try {
    const success = await authStore.login(loginForm.username, loginForm.password)
    
    if (success) {
      // 登录成功，跳转到首页或之前访问的页面
      const redirect = (route.query.redirect as string) || '/'
      router.push(redirect)
    } else {
      errorMessage.value = '用户名或密码错误'
    }
  } catch (error) {
    errorMessage.value = '登录失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

function handleLoginFailed() {
  errorMessage.value = '请检查输入信息'
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(37, 99, 235, 0.1));
  backdrop-filter: blur(20px);
  animation: float 20s infinite ease-in-out;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  right: -50px;
  background: linear-gradient(135deg, rgba(167, 243, 208, 0.15), rgba(224, 242, 254, 0.1));
  animation-delay: 5s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 10%;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(167, 243, 208, 0.1));
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

/* 登录卡片容器 */
.login-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-card {
  background: var(--surface);
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  border-radius: var(--radius-card);
  padding: 48px 40px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset,
    var(--shadow-accent);
  position: relative;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  border-radius: var(--radius-card) var(--radius-card) 0 0;
}

/* Logo 区域 */
.login-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.logo-icon {
  width: 72px;
  height: 72px;
  background: var(--gradient-primary);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: white;
  box-shadow: 
    0 8px 24px rgba(37, 99, 235, 0.25),
    0 0 0 4px rgba(255, 255, 255, 0.1) inset;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 
      0 8px 24px rgba(37, 99, 235, 0.25),
      0 0 0 4px rgba(255, 255, 255, 0.1) inset;
  }
  50% {
    transform: scale(1.05);
    box-shadow: 
      0 12px 32px rgba(37, 99, 235, 0.35),
      0 0 0 4px rgba(255, 255, 255, 0.15) inset;
  }
}

/* 标题区域 */
.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.login-subtitle {
  color: var(--muted);
  font-size: 15px;
  margin: 0;
  font-weight: 400;
}

/* 表单区域 */
.login-form {
  margin-top: 0;
}

.form-item-custom {
  margin-bottom: 24px;
}

.form-item-custom :deep(.ant-form-item-label) {
  padding-bottom: 8px;
}

.form-item-custom :deep(.ant-form-item-label > label) {
  font-weight: 500;
  color: var(--text);
  font-size: 14px;
}

.custom-input {
  height: 48px;
  border-radius: var(--radius-input);
  border: 1.5px solid var(--divider);
  transition: all 0.3s ease;
  font-size: 15px;
}

.custom-input:hover {
  border-color: var(--primary-300);
}

.custom-input:focus,
.custom-input-focused {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
}

.input-icon {
  color: var(--muted);
  font-size: 16px;
}

.custom-input:focus .input-icon,
.custom-input-focused .input-icon {
  color: var(--primary);
}

/* 表单选项 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  margin-top: -8px;
}

.remember-checkbox {
  font-size: 14px;
  color: var(--text);
}

.forgot-link {
  color: var(--primary);
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 500;
}

.forgot-link:hover {
  color: var(--primary-300);
  text-decoration: underline;
}

/* 提交按钮 */
.submit-item {
  margin-bottom: 0;
}

.login-button {
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: var(--radius-input);
  background: var(--gradient-primary);
  border: none;
  box-shadow: 
    0 4px 12px rgba(37, 99, 235, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 20px rgba(37, 99, 235, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.15) inset;
  filter: brightness(1.05);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

/* 错误提示 */
.error-message {
  margin-top: 24px;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 底部区域 */
.login-footer {
  margin-top: 32px;
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid var(--divider);
}

.footer-text {
  color: var(--muted);
  font-size: 14px;
  margin: 0;
}

.register-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
  transition: all 0.2s ease;
}

.register-link:hover {
  color: var(--primary-300);
  text-decoration: underline;
}

/* Ant Design 组件样式覆盖 */
:deep(.ant-input-affix-wrapper) {
  border-radius: var(--radius-input);
  transition: all 0.3s ease;
}

:deep(.ant-input-affix-wrapper:hover) {
  border-color: var(--primary-300);
}

:deep(.ant-checkbox-wrapper) {
  font-size: 14px;
}

:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: var(--primary);
  border-color: var(--primary);
}

:deep(.ant-alert) {
  border-radius: var(--radius-input);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-card {
    padding: 36px 24px;
  }

  .login-title {
    font-size: 28px;
  }

  .logo-icon {
    width: 64px;
    height: 64px;
    font-size: 32px;
  }
}
</style>

