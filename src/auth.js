import { computed, ref } from 'vue'
import { demoUsers, publicUser } from './data/users'

const storageKey = 'psicoconecta-session'
const stored = localStorage.getItem(storageKey)
const currentUser = ref(stored ? JSON.parse(stored) : null)

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(currentUser.value))

  function login(email, password) {
    const user = demoUsers.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password,
    )
    if (!user) return false
    currentUser.value = publicUser(user)
    localStorage.setItem(storageKey, JSON.stringify(currentUser.value))
    return true
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem(storageKey)
  }

  return { currentUser, isAuthenticated, login, logout }
}
