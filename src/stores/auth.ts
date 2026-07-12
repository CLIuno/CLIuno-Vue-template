import api from '@/apis'

interface User {
  id: string
  username: string
  first_name: string
  last_name: string
  email: string
  phone: string
  is_verified: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)
  const fullName = computed(() =>
    user.value ? `${user.value.first_name} ${user.value.last_name}` : '',
  )

  function setTokens(accessToken: string, refresh: string) {
    token.value = accessToken
    refreshToken.value = refresh
    localStorage.setItem('token', accessToken)
    localStorage.setItem('refreshToken', refresh)
  }

  function clearAuth() {
    user.value = null
    token.value = null
    refreshToken.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  async function login(usernameOrEmail: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const res = await api.auth.login({ usernameOrEmail, password })
      const data = res.data.data
      setTokens(data.token, data.refreshToken)
      user.value = data.user
      router.push({ name: 'todos' })
    } catch (err: unknown) {
      error.value = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Login failed'
        : 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(userData: {
    first_name: string
    last_name: string
    username: string
    email: string
    phone: string
    password: string
    password_confirmation: string
  }) {
    loading.value = true
    error.value = null
    try {
      await api.auth.register(userData)
      router.push({ name: 'login' })
    } catch (err: unknown) {
      error.value = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Registration failed'
        : 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await api.auth.logout()
    } catch {
      // ignore
    } finally {
      clearAuth()
      router.push({ name: 'login' })
    }
  }

  async function fetchCurrentUser() {
    if (!token.value) return
    try {
      const res = await api.user.getCurrentUser()
      user.value = res.data.data.user
    } catch {
      clearAuth()
    }
  }

  return {
    user,
    token,
    refreshToken,
    loading,
    error,
    isAuthenticated,
    fullName,
    login,
    register,
    logout,
    fetchCurrentUser,
    clearAuth,
  }
})
