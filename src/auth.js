import { computed, ref } from 'vue'
import { api } from './api'

const storageKey = 'psicoconecta-token'
const currentUser = ref(null)
const isAuthenticated = computed(() => Boolean(currentUser.value))
const restoredSession = sessionStorage.getItem(storageKey)
  ? api('session').then((user) => { currentUser.value = user }).catch(() => sessionStorage.removeItem(storageKey))
  : Promise.resolve()

export function useAuth() {
  async function login(email, password) {
    const { user, token } = await api('session', { method: 'POST', body: { email, password } })
    sessionStorage.setItem(storageKey, token)
    currentUser.value = user
  }

  async function logout() {
    try {
      await api('session', { method: 'DELETE' })
    } finally {
      currentUser.value = null
      sessionStorage.removeItem(storageKey)
    }
  }

  return { currentUser, isAuthenticated, login, logout, restoredSession }
}
