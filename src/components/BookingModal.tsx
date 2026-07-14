"use client"
import { useState, useEffect } from "react"
import { X, Calendar, MapPin, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApi } from "@/hooks/useApi"
import { servicesApi, appointmentsApi } from "@/lib/api"
import type { Service } from "@/types/api"
import { useAuth } from "@/contexts/AuthContext"

export function BookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<"form" | "success">("form")
  const [bookingRef, setBookingRef] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const { data: services, loading: loadingServices, execute: fetchServices } = useApi<Service[]>(servicesApi.getAll)

  const [formData, setFormData] = useState({
    serviceId: "", clientName: user?.name || "", clientEmail: user?.email || "",
    clientPhone: "", date: "", time: "", location: "online", notes: "",
  })

  useEffect(() => {
    const handler = () => {
      setIsOpen(true)
      fetchServices()
      document.body.style.overflow = "hidden"
    }
    window.addEventListener("open-booking-modal", handler)
    return () => {
      window.removeEventListener("open-booking-modal", handler)
      document.body.style.overflow = ""
    }
  }, [fetchServices])

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, clientName: user.name, clientEmail: user.email }))
    }
  }, [user])

  const handleClose = () => {
    setIsOpen(false)
    setStep("form")
    setBookingRef("")
    document.body.style.overflow = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const result = await appointmentsApi.create(formData)
      if (result?.bookingReference) setBookingRef(result.bookingReference)
      setStep("success")
    } catch { /* error handled */ } finally { setSubmitting(false) }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-glass-border bg-glass backdrop-blur-2xl shadow-2xl animate-scale-up scrollbar-hide">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-glass-border bg-glass/90 backdrop-blur-xl px-6 py-4 rounded-t-3xl">
          <h3 className="font-heading text-lg font-bold text-text-primary">
            {step === "form" ? "Book a Session" : "Booking Confirmed!"}
          </h3>
          <button onClick={handleClose} className="flex h-9 w-9 items-center justify-center rounded-2xl text-text-muted hover:bg-glass hover:text-text-primary transition-all duration-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <Label>Select Service</Label>
              {loadingServices ? (
                <div className="text-sm text-text-muted py-3">Loading services...</div>
              ) : (
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {services?.map((service) => (
                    <label key={service._id} className={`flex items-center gap-3 rounded-2xl border p-3 cursor-pointer transition-all duration-300 ${formData.serviceId === service._id ? "border-neon/40 bg-neon/5" : "border-glass-border hover:border-neon/20"}`}>
                      <input type="radio" name="service" value={service._id} checked={formData.serviceId === service._id} onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })} className="sr-only" />
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300 ${formData.serviceId === service._id ? "bg-neon text-white" : "bg-neon/10 text-neon"}`}>
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{service.title}</p>
                        {service.duration && <p className="text-xs text-text-muted">{service.duration}</p>}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="booking-name">Full Name</Label>
                <Input id="booking-name" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="booking-email">Email</Label>
                <Input id="booking-email" type="email" value={formData.clientEmail} onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })} required />
              </div>
            </div>

            <div>
              <Label htmlFor="booking-phone">Phone <span className="text-text-muted font-normal">(we&apos;ll call to confirm)</span></Label>
              <Input id="booking-phone" type="tel" value={formData.clientPhone} onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })} placeholder="+91 98765 43210" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="booking-date"><Calendar className="inline h-3 w-3 mr-1" />Preferred Date</Label>
                <Input id="booking-date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="booking-time"><Clock className="inline h-3 w-3 mr-1" />Preferred Time</Label>
                <Input id="booking-time" type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />
              </div>
            </div>

            <div>
              <Label><MapPin className="inline h-3 w-3 mr-1" />Session Type</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {["online", "in-person"].map((loc) => (
                  <label key={loc} className={`flex items-center justify-center gap-2 rounded-2xl border p-3 cursor-pointer transition-all duration-300 text-sm ${formData.location === loc ? "border-neon/40 bg-neon/5 text-neon font-medium" : "border-glass-border text-text-muted hover:border-neon/20"}`}>
                    <input type="radio" name="location" value={loc} checked={formData.location === loc} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="sr-only" />
                    {loc === "online" ? "Online" : "In-Person"}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="booking-notes">Additional Notes (optional)</Label>
              <textarea id="booking-notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Any specific goals or requirements..." rows={3} className="flex w-full rounded-2xl border border-glass-border bg-glass backdrop-blur-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 resize-none transition-all duration-300" />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={submitting || !formData.serviceId}>
              {submitting ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        ) : (
          <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon/10 border border-neon/15">
              <Check className="h-8 w-8 text-neon" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-2">You&apos;re Booked!</h3>
            {bookingRef && (
              <p className="text-sm text-text-secondary mb-2">
                Booking Reference: <span className="font-mono font-semibold text-neon">{bookingRef}</span>
              </p>
            )}
            <p className="text-sm text-text-secondary mb-6">We&apos;ve sent a confirmation to your email. Manoj will reach out shortly to confirm your session details.</p>
            <Button onClick={handleClose}>Done</Button>
          </div>
        )}
      </div>
    </div>
  )
}
