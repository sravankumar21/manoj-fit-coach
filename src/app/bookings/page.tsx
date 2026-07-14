"use client"
import { useEffect } from "react"
import { Badge, Button } from "@/components/ui"
import { useApi } from "@/hooks/useApi"
import { appointmentsApi } from "@/lib/api"
import type { Appointment } from "@/types/api"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { AuthProvider } from "@/contexts/AuthContext"
import { useAuth } from "@/contexts/AuthContext"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { BookingModal } from "@/components/BookingModal"

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  confirmed: "bg-neon/10 text-neon border-neon/20",
  completed: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
}

function BookingsContent() {
  const { user, loading: authLoading } = useAuth()
  const { data: bookings, loading, execute: fetchBookings } = useApi<Appointment[]>(appointmentsApi.getMine)

  useEffect(() => {
    if (user) fetchBookings()
  }, [user, fetchBookings])

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-dark-base">
        <div className="h-8 w-8 rounded-full border-4 border-neon border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-dark-base">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">Please Sign In</h2>
          <p className="text-sm text-text-secondary mb-6">You need to be signed in to view your bookings.</p>
          <a href="/login"><Button>Sign In</Button></a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-base min-h-[60vh] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8">
          <Badge variant="default" className="mb-4">My Bookings</Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">Your Fitness Sessions</h2>
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
        ) : bookings?.length ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="rounded-3xl border border-glass-border bg-glass backdrop-blur-xl p-6 transition-all duration-500 hover:bg-glass-hover hover:border-neon/20 shadow-sm hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-heading text-lg font-semibold text-text-primary">{booking.serviceName}</h3>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[booking.status] || ""}`}>{booking.status}</span>
                    </div>
                    {booking.bookingReference && <p className="text-xs text-text-muted mb-2">Ref: {booking.bookingReference}</p>}
                    <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-neon" />{new Date(booking.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-neon" />{booking.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-neon" />{booking.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-glass-border bg-glass backdrop-blur-xl p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon/10 border border-neon/15">
              <Calendar className="h-8 w-8 text-neon" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-2">No Bookings Yet</h3>
            <p className="text-sm text-text-secondary mb-6">Start your transformation journey by booking your first session.</p>
            <Button onClick={() => window.dispatchEvent(new Event("open-booking-modal"))}>
              Book Your First Session<ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookingsPage() {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-1"><BookingsContent /></main>
      <Footer />
      <BookingModal />
    </AuthProvider>
  )
}
