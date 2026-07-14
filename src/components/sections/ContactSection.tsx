"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, MapPin, Mail, Camera } from "lucide-react"
import { contactApi } from "@/lib/api"
import { siteConfig } from "@/lib/site"

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "Consultation Request", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await contactApi.create(formData)
      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", subject: "Consultation Request", message: "" })
    } catch { /* error */ } finally { setLoading(false) }
  }

  return (
    <section id="contact" className="bg-dark-base py-16 md:py-24 border-t border-glass-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="text-xs font-medium text-neon tracking-[0.3em] uppercase mb-3">Get In Touch</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight leading-tight mb-4">
              Ready to<br /><span className="text-neon">Transform</span>?
            </h2>
            <p className="text-sm text-text-secondary mb-8 max-w-md">Book your free consultation or reach out with any questions. Your journey starts with a conversation.</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neon/10 border border-neon/15"><MapPin className="h-4 w-4 text-neon" /></div>
                <div>
                  <p className="text-xs font-medium text-text-primary mb-0.5">Location</p>
                  <p className="text-xs text-text-secondary">Hyderabad, India</p>
                  <p className="text-[10px] text-text-muted">In-person & Online sessions available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neon/10 border border-neon/15"><Mail className="h-4 w-4 text-neon" /></div>
                <div>
                  <p className="text-xs font-medium text-text-primary mb-0.5">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-xs text-text-secondary hover:text-neon transition-colors duration-300">{siteConfig.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neon/10 border border-neon/15"><Camera className="h-4 w-4 text-neon" /></div>
                <div>
                  <p className="text-xs font-medium text-text-primary mb-0.5">Instagram</p>
                  <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="text-xs text-text-secondary hover:text-neon transition-colors duration-300">@manojfitcoach_05</a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-6 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 border border-neon/15"><Send className="h-6 w-6 text-neon" /></div>
                <h3 className="font-heading text-xl font-bold text-text-primary mb-1.5">Message Sent!</h3>
                <p className="text-xs text-text-secondary mb-5">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <Button onClick={() => setSubmitted(false)} size="sm">Send Another Message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number <span className="text-text-muted font-normal">(we&apos;ll call to confirm)</span></Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="How can we help?" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your fitness goals..." rows={3} className="flex w-full rounded-xl border border-glass-border bg-glass backdrop-blur-xl px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 resize-none transition-all duration-300" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
