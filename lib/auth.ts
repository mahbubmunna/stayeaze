// Mock authentication utilities using localStorage

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const USERS_STORAGE_KEY = "stayease_users"
const CURRENT_USER_KEY = "stayease_current_user"
const DEMO_INITIALIZED_KEY = "stayease_demo_initialized"

export function initializeDemoUser(): void {
  if (typeof window === "undefined") return

  const isInitialized = localStorage.getItem(DEMO_INITIALIZED_KEY)
  if (isInitialized) return

  const demoUser: User = {
    id: "user_demo",
    email: "demo@stayease.com",
    name: "Demo User",
    createdAt: new Date().toISOString(),
  }

  const users = getAllUsers()
  users.push(demoUser)
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  localStorage.setItem("password_user_demo", "demo123")
  localStorage.setItem(DEMO_INITIALIZED_KEY, "true")
}

// Get all registered users from localStorage
export function getAllUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(USERS_STORAGE_KEY)
  return users ? JSON.parse(users) : []
}

// Check if email exists
export function emailExists(email: string): boolean {
  const users = getAllUsers()
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase())
}

// Validate email and password
export function validateCredentials(email: string, password: string): boolean {
  const users = getAllUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return false
  // Note: In production, use bcrypt. This is for demo only.
  const storedPassword = localStorage.getItem(`password_${user.id}`)
  return storedPassword === password
}

// Sign up user
export function signup(email: string, password: string, name: string): { success: boolean; error?: string } {
  if (emailExists(email)) {
    return { success: false, error: "Email already registered" }
  }

  const users = getAllUsers()
  const newUser: User = {
    id: `user_${Date.now()}`,
    email: email.toLowerCase(),
    name,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  // Note: In production, use bcrypt. This is for demo only.
  localStorage.setItem(`password_${newUser.id}`, password)

  return { success: true }
}

// Login user
export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const users = getAllUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (!user) {
    return { success: false, error: "Invalid email or password" }
  }

  const storedPassword = localStorage.getItem(`password_${user.id}`)
  if (storedPassword !== password) {
    return { success: false, error: "Invalid email or password" }
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  return { success: true, user }
}

// Get current logged-in user
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}

// Logout user
export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CURRENT_USER_KEY)
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
