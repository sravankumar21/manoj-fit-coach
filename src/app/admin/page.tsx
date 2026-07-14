"use client"
import { useEffect, useState } from "react"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { adminApi } from "@/lib/api"
import type { Appointment, Review, ContactMessage } from "@/types/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MessageSquare, Mail, CheckCircle, XCircle, Eye } from "lucide-react"
import Link from "next/link"

function AdminDashboard() {
  const { user, loading: authLoading, isAdmin } = useAuth()
  const [tab, setTab] = useState<"appointments" | "reviews" | "contacts">("appointments")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user || !isAdmin) return
    setLoading(true)
    const fetchData = async () => {
      try {
        const [appts, revs, conts] = await Promise.all([
          adminApi.getAppointments(),
          adminApi.getReviews(),
          adminApi.getContacts(),
        ])
        setAppointments(appts)
        setReviews(revs)
        setContacts(conts)
      } catch { /* error */ } finally { setLoading(false) }
    }
    fetchData()
  }, [user, isAdmin])

  if (authLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 rounded-full border-4 border-neon border-t-transparent animate-spin" /></div>
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-dark-base">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">Access Denied</h2>
          <p className="text-sm text-text-secondary mb-6">You need admin access to view this page.</p>
          <Link href="/login"><Button>Sign In as Admin</Button></Link>
        </div>
      </div>
    )
  }

  const handleApproveReview = async (id: string) => {
    try {
      await adminApi.approveReview(id)
      setReviews((prev) => prev.map((r) => r._id === id ? { ...r, isApproved: true } : r))
    } catch { /* error */ }
  }

  const handleRejectReview = async (id: string) => {
    try {
      await adminApi.rejectReview(id)
      setReviews((prev) => prev.filter((r) => r._id !== id))
    } catch { /* error */ }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const updated = await adminApi.updateAppointmentStatus(id, status)
      setAppointments((prev) => prev.map((a) => a._id === id ? updated : a))
    } catch { /* error */ }
  }

  const tabs = [
    { key: "appointments" as const, label: "Appointments", icon: Calendar, count: appointments.length },
    { key: "reviews" as const, label: "Reviews", icon: MessageSquare, count: reviews.length },
    { key: "contacts" as const, label: "Messages", icon: Mail, count: contacts.length },
  ]

  return (
    <div className="bg-dark-base min-h-[60vh] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8">
          <Badge variant="green" className="mb-4">Admin</Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">Dashboard</h2>
          <p className="text-sm text-text-secondary mt-1">Manage your clients, reviews, and messages.</p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 border shrink-0 ${tab === t.key ? "border-neon/30 bg-neon/10 text-neon" : "border-glass-border bg-glass text-text-secondary hover:border-neon/20"}`}>
              <t.icon className="h-4 w-4" />{t.label}
              <span className="ml-1 rounded-full bg-neon/10 px-2 py-0.5 text-[10px] font-semibold text-neon">{t.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-3xl border border-glass-border bg-glass p-6 shadow-sm">
                <div className="h-5 w-48 rounded shimmer mb-3" />
                <div className="h-4 w-32 rounded shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {tab === "appointments" && (
              <div className="space-y-3">
                {appointments.length === 0 ? (
                  <div className="rounded-3xl border border-glass-border bg-glass p-12 text-center shadow-sm">
                    <Calendar className="h-8 w-8 text-neon mx-auto mb-3" />
                    <p className="text-sm text-text-secondary">No appointments yet.</p>
                  </div>
                ) : appointments.map((a) => (
                  <div key={a._id} className="rounded-3xl border border-glass-border bg-glass backdrop-blur-xl p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-heading font-semibold text-text-primary">{a.serviceName}</h4>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${a.status === "confirmed" ? "border-neon/20 bg-neon/10 text-neon" : a.status === "pending" ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-700" : a.status === "completed" ? "border-blue-500/20 bg-blue-500/10 text-blue-700" : "border-red-500/20 bg-red-500/10 text-red-600"}`}>{a.status}</span>
                        </div>
                        <p className="text-xs text-text-muted">{a.clientName} | {a.clientEmail} | {a.clientPhone} | Ref: {a.bookingReference}</p>
                        <p className="text-xs text-text-muted">{new Date(a.date).toLocaleDateString()} at {a.time} | {a.location}</p>
                      </div>
                      <div className="flex gap-2">
                        {a.status === "pending" && (
                          <>
                            <Button size="sm" onClick={() => handleUpdateStatus(a._id, "confirmed")}><CheckCircle className="h-3 w-3" />Confirm</Button>
                            <Button size="sm" variant="ghost" onClick={() => handleUpdateStatus(a._id, "cancelled")}><XCircle className="h-3 w-3" />Cancel</Button>
                          </>
                        )}
                        {a.status === "confirmed" && (
                          <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(a._id, "completed")}>Complete</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div className="space-y-3">
                {reviews.length === 0 ? (
                  <div className="rounded-3xl border border-glass-border bg-glass p-12 text-center shadow-sm">
                    <MessageSquare className="h-8 w-8 text-neon mx-auto mb-3" />
                    <p className="text-sm text-text-secondary">No reviews yet.</p>
                  </div>
                ) : reviews.map((r) => (
                  <div key={r._id} className="rounded-3xl border border-glass-border bg-glass backdrop-blur-xl p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-heading font-semibold text-text-primary">{r.clientName}</h4>
                          <span className="text-xs text-neon">{r.rating}/5</span>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${r.isApproved ? "border-neon/20 bg-neon/10 text-neon" : "border-yellow-500/20 bg-yellow-500/10 text-yellow-700"}`}>{r.isApproved ? "Approved" : "Pending"}</span>
                        </div>
                        <p className="text-sm text-text-secondary">&ldquo;{r.comment}&rdquo;</p>
                      </div>
                      {!r.isApproved && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleApproveReview(r._id)}><CheckCircle className="h-3 w-3" />Approve</Button>
                          <Button size="sm" variant="ghost" onClick={() => handleRejectReview(r._id)}><XCircle className="h-3 w-3" />Reject</Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "contacts" && (
              <div className="space-y-3">
                {contacts.length === 0 ? (
                  <div className="rounded-3xl border border-glass-border bg-glass p-12 text-center shadow-sm">
                    <Mail className="h-8 w-8 text-neon mx-auto mb-3" />
                    <p className="text-sm text-text-secondary">No messages yet.</p>
                  </div>
                ) : contacts.map((c) => (
                  <div key={c._id} className={`rounded-3xl border bg-glass backdrop-blur-xl p-5 shadow-sm ${c.isRead ? "border-glass-border" : "border-neon/30"}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-heading font-semibold text-text-primary">{c.name}</h4>
                          <a href={`mailto:${c.email}`} className="text-xs text-neon hover:text-neon-dim">{c.email}</a>
                          {!c.isRead && <span className="rounded-full bg-neon px-2 py-0.5 text-[10px] font-semibold text-white">New</span>}
                        </div>
                        <p className="text-xs text-text-muted mb-1">Subject: {c.subject}{c.phone ? ` | Phone: ${c.phone}` : ""}</p>
                        <p className="text-sm text-text-secondary">{c.message}</p>
                      </div>
                      <div className="flex gap-2">
                        <a href={`mailto:${c.email}`}><Button size="sm" variant="outline"><Eye className="h-3 w-3" />Reply</Button></a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-1"><AdminDashboard /></main>
      <Footer />
    </AuthProvider>
  )
}
