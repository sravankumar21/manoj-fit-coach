"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { siteConfig } from "@/lib/site"
import { Suspense } from "react"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, googleLogin, user, isAdmin } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || "/"

  useEffect(() => {
    if (user) {
      router.replace(isAdmin ? "/admin" : from)
    }
  }, [user, isAdmin, router, from])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    const w = window as unknown as { google?: { accounts?: { id: { initialize: (config: Record<string, unknown>) => void; prompt: () => void } } } }
    if (!w.google?.accounts?.id) {
      setError("Google Sign-In not loaded. Please try again.")
      return
    }
    w.google.accounts.id.initialize({
      client_id: siteConfig.googleClientId || "",
      callback: async (response: { credential?: string }) => {
        if (response.credential) {
          try {
            await googleLogin(response.credential)
          } catch (err) {
            setError(err instanceof Error ? err.message : "Google login failed")
          }
        }
      },
    })
    w.google.accounts.id.prompt()
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-dark-base px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon text-white font-heading font-bold text-2xl shadow-sm">MJ</div>
          <h2 className="font-heading text-3xl font-bold text-text-primary">Welcome Back</h2>
          <p className="mt-2 text-sm text-text-secondary">Sign in to manage your fitness journey</p>
        </div>

        <div className="rounded-3xl border border-glass-border bg-glass backdrop-blur-xl p-8 shadow-sm">
          {error && (
            <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" required />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-glass-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-glass px-3 text-text-muted">or continue with</span></div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </Button>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-neon hover:text-neon-dim transition-colors">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center"><div className="h-8 w-8 rounded-full border-4 border-neon border-t-transparent animate-spin" /></div>}>
        <LoginForm />
      </Suspense>
    </AuthProvider>
  )
}
