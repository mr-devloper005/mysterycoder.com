'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { User } from '@/types'
import { currentUser } from '@/data/mock-data'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  /** True after reading persisted user from localStorage on the client */
  hasHydrated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const storedUser = loadFromStorage<User | null>(storageKeys.user, null)
    if (storedUser) {
      setUser(storedUser)
    }
    setHasHydrated(true)
  }, [])

  const buildUser = useCallback((overrides: Partial<User>) => {
    const joinedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    const base: User =
      currentUser ??
      ({
        id: '',
        name: '',
        email: '',
        avatar: '/placeholder.svg?height=80&width=80',
        bio: '',
        joinedDate: '',
        followers: 0,
        following: 0,
        isVerified: false,
      } satisfies User)
    return {
      ...base,
      id: `user-${Date.now()}`,
      joinedDate,
      followers: 0,
      following: 0,
      isVerified: false,
      ...overrides,
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) {
      throw new Error('Please enter your email and password.')
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 400))

      const storedUser = loadFromStorage<User | null>(storageKeys.user, null)
      const nextUser =
        storedUser?.email === trimmedEmail
          ? storedUser
          : buildUser({
              email: trimmedEmail,
              name: trimmedEmail.split('@')[0]?.replace(/[^a-zA-Z0-9]/g, '') || currentUser?.name || 'Reader',
            })

      setUser(nextUser)
      saveToStorage(storageKeys.user, nextUser)
    } finally {
      setIsLoading(false)
    }
  }, [buildUser])

  const logout = useCallback(() => {
    setUser(null)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKeys.user)
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    if (!name?.trim() || !email?.trim() || !password) {
      throw new Error('Please fill in all fields.')
    }
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const nextUser = buildUser({
        name: name.trim(),
        email: email.trim(),
      })
      setUser(nextUser)
      saveToStorage(storageKeys.user, nextUser)
    } finally {
      setIsLoading(false)
    }
  }, [buildUser])

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev
      const nextUser = { ...prev, ...updates }
      saveToStorage(storageKeys.user, nextUser)
      return nextUser
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        hasHydrated,
        login,
        logout,
        signup,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
