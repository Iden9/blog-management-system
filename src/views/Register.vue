<template>
  <div class="register-container">
    <!-- 背景装饰元素 -->
    <div class="bg-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>

    <!-- 注册卡片 -->
    <div class="register-wrapper">
      <div class="register-card">
        <!-- Logo 区域 -->
        <div class="register-logo">
          <div class="logo-icon">
            <UserAddOutlined />
          </div>
        </div>

        <!-- 标题区域 -->
        <div class="register-header">
          <h1 class="register-title">创建账户</h1>
          <p class="register-subtitle">加入我们，开始您的博客之旅</p>
        </div>

        <!-- 表单区域 -->
        <a-form
          :model="registerForm"
          :rules="rules"
          @finish="handleRegister"
          @finishFailed="handleRegisterFailed"
          layout="vertical"
          class="register-form"
        >
          <a-form-item name="username" class="form-item-custom">
            <a-input
              v-model:value="registerForm.username"
              size="large"
              placeholder="请输入用户名"
              class="custom-input"
            >
              <template #prefix>
                <UserOutlined class="input-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="email" class="form-item-custom">
            <a-input
              v-model:value="registerForm.email"
              size="large"
              placeholder="请输入邮箱地址"
              class="custom-input"
            >
              <template #prefix>
                <MailOutlined class="input-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" class="form-item-custom">
            <a-input-password
              v-model:value="registerForm.password"
              size="large"
              placeholder="请输入密码（至少6个字符）"
              class="custom-input"
            >
              <template #prefix>
                <LockOutlined class="input-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item name="confirmPassword" class="form-item-custom">
            <a-input-password
              v-model:value="registerForm.confirmPassword"
              size="large"
              placeholder="请再次输入密码"
              class="custom-input"
            >
              <template #prefix>
                <LockOutlined class="input-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item name="agreement" class="agreement-item">
            <a-checkbox v-model:checked="registerForm.agreement">
              我已阅读并同意
              <a class="agreement-link">《用户协议》</a>
              和
              <a class="agreement-link">《隐私政策》</a>
            </a-checkbox>
          </a-form-item>

          <a-form-item class="submit-item">
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              :loading="loading"
              block
              class="register-button"
            >
              <span v-if="!loading">注册</span>
              <span v-else>注册中...</span>
            </a-button>
          </a-form-item>
        </a-form>

        <!-- 错误提示 -->
        <transition name="fade">
          <div v-if="errorMessage" class="error-message">
            <a-alert :message="errorMessage" type="error" show-icon :closable="true" @close="errorMessage = ''" />
          </div>
        </transition>

        <!-- 成功提示 -->
        <transition name="fade">
          <div v-if="successMessage" class="success-message">
            <a-alert :message="successMessage" type="success" show-icon :closable="true" @close="successMessage = ''" />
          </div>
        </transition>

        <!-- 底部提示 -->
        <div class="register-footer">
          <p class="footer-text">
            已有账户？
            <RouterLink to="/login" class="login-link">立即登录</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { UserOutlined, LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '@/stores/auth'
import type { Rule } from 'ant-design-vue/es/form'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

// 自定义验证：确认密码
const validateConfirmPassword = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject('请再次输入密码')
  }
  if (registerForm.password && value !== registerForm.password) {
    return Promise.reject('两次输入的密码不一致')
  }
  return Promise.resolve()
}

// 自定义验证：用户协议
const validateAgreement = async (_rule: Rule, value: boolean) => {
  if (!value) {
    return Promise.reject('请先同意用户协议和隐私政策')
  }
  return Promise.resolve()
}

const rules: Record<string, Rule[]> = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名至少3个字符', trigger: 'blur' },
    { max: 20, message: '用户名最多20个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6个字符', trigger: 'blur' },
    { max: 20, message: '密码最多20个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  agreement: [
    { validator: validateAgreement, trigger: 'change' }
  ]
}

async function handleRegister() {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const success = await authStore.register(
      registerForm.username,
      registerForm.email,
      registerForm.password
    )
    
    if (success) {
      successMessage.value = '注册成功！正在跳转到登录页面...'
      // 延迟跳转到登录页
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      errorMessage.value = '注册失败，用户名或邮箱可能已被使用'
    }
  } catch (error) {
    errorMessage.value = '注册失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

function handleRegisterFailed() {
  errorMessage.value = '请检查输入信息'
}
</script>

<style scoped>
.register-container {
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

/* 注册卡片容器 */
.register-wrapper {
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

.register-card {
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

.register-card::before {
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
.register-logo {
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
.register-header {
  text-align: center;
  margin-bottom: 40px;
}

.register-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.register-subtitle {
  color: var(--muted);
  font-size: 15px;
  margin: 0;
  font-weight: 400;
}

/* 表单区域 */
.register-form {
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

.agreement-item {
  margin-bottom: 32px;
  margin-top: -8px;
}

.agreement-item :deep(.ant-form-item-control) {
  line-height: 1.5;
}

.agreement-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.agreement-link:hover {
  color: var(--primary-300);
  text-decoration: underline;
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

/* 提交按钮 */
.submit-item {
  margin-bottom: 0;
}

.register-button {
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

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 20px rgba(37, 99, 235, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.15) inset;
  filter: brightness(1.05);
}

.register-button:active:not(:disabled) {
  transform: translateY(0);
}

/* 错误和成功提示 */
.error-message,
.success-message {
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
.register-footer {
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

.login-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
  transition: all 0.2s ease;
}

.login-link:hover {
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
}

:deep(.ant-alert-error) {
  border: 1px solid rgba(239, 68, 68, 0.2);
}

:deep(.ant-alert-success) {
  border: 1px solid rgba(34, 197, 94, 0.2);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .register-card {
    padding: 36px 24px;
  }

  .register-title {
    font-size: 28px;
  }

  .logo-icon {
    width: 64px;
    height: 64px;
    font-size: 32px;
  }
}
</style>

