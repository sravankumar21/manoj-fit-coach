"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types/api"
import { authApi } from "@/lib/api"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  googleLogin: (credential: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      authApi.me()
        .then((res) => {
          const u = res.user
          setUser({
            _id: u.id,
            name: u.name,
            email: u.email,
            role: u.role as "admin" | "client",
            createdAt: new Date().toISOString(),
          })
        })
        .catch(() => localStorage.removeItem("auth_token"))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password })
    localStorage.setItem("auth_token", res.token)
    setUser(res.user)
  }

  const googleLogin = async (credential: string) => {
    const res = await authApi.googleLogin({ credential })
    localStorage.setItem("auth_token", res.token)
    setUser(res.user)
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await authApi.register({ name, email, password })
    localStorage.setItem("auth_token", res.token)
    setUser(res.user)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, googleLogin, register, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
