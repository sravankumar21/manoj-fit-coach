"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useMediaQuery } from "@/hooks/useApi"

export function HeaderBrand({ className = "" }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  return (
    <button onClick={handleClick} className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neon text-white font-heading font-bold text-lg shadow-sm">
        MJ
      </div>
      <div className="flex flex-col items-start">
        <span className="font-heading text-lg font-bold text-text-primary leading-tight tracking-tight">Manoj Fit Coach</span>
        <span className="text-[10px] text-text-muted leading-tight tracking-[0.2em] uppercase">Transform Your Body</span>
      </div>
    </button>
  )
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Results", href: "/#results" },
  { label: "Contact", href: "/#contact" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const pathname = usePathname()

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "")
      if (pathname === "/") {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      } else {
        window.location.href = href
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-glass-border bg-glass/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <HeaderBrand />

        {!isMobile && (
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }
                }}
                className="rounded-full px-5 py-2 text-sm font-medium text-text-secondary transition-all duration-300 hover:bg-neon/5 hover:text-neon"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {!isMobile && (
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="ghost" size="sm">
                    <Link href="/admin" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-text-secondary hover:bg-glass hover:text-neon transition-all duration-300"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        )}
      </div>

      {isMobile && mobileOpen && (
        <div className="border-t border-glass-border bg-glass/95 backdrop-blur-2xl px-5 py-4 animate-fade-in">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("/#")) {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }
                }}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-text-secondary transition-all duration-300 hover:bg-neon/5 hover:text-neon"
              >
                {link.label}
              </a>
            ))}
            <div className="my-2 h-px bg-glass-border" />
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-medium text-text-secondary hover:bg-neon/5 hover:text-neon">
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={() => { logout(); setMobileOpen(false) }} className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-text-secondary hover:bg-neon/5 hover:text-neon">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-medium text-text-secondary hover:bg-neon/5 hover:text-neon">
                  Login
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="rounded-full bg-neon px-4 py-3 text-center text-sm font-semibold text-white hover:bg-neon-dim transition-all duration-300">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
