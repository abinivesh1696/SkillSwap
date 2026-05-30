import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_AVATAR } from '../constants/avatarConstants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const current = localStorage.getItem('ss-current-user')
    if (current) setUser(JSON.parse(current))
  }, [])

  function register(profile) {
    const users = JSON.parse(localStorage.getItem('ss-users') || '[]')
    const exists = users.some((u) => u.email.toLowerCase() === profile.email.toLowerCase())
    if (exists) {
      return { ok: false, message: 'Email already registered.' }
    }
    const newUser = {
      id: Date.now().toString(),
      avatar: DEFAULT_AVATAR,
      ...profile
    }
    localStorage.setItem('ss-users', JSON.stringify([newUser, ...users]))
    localStorage.setItem('ss-current-user', JSON.stringify(newUser))
    setUser(newUser)
    return { ok: true }
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('ss-users') || '[]')
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      return { ok: false, message: 'Invalid email or password.' }
    }
    localStorage.setItem('ss-current-user', JSON.stringify(found))
    setUser(found)
    return { ok: true }
  }

  function logout() {
    localStorage.removeItem('ss-current-user')
    setUser(null)
  }

  function updateUser(updates) {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('ss-current-user', JSON.stringify(updated))
    const users = JSON.parse(localStorage.getItem('ss-users') || '[]')
    const idx = users.findIndex((u) => u.id === updated.id)
    if (idx !== -1) {
      users[idx] = updated
      localStorage.setItem('ss-users', JSON.stringify(users))
    }
    return { ok: true }
  }

  const value = useMemo(
    () => ({ user, register, login, logout, updateUser, isAuthenticated: Boolean(user) }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
