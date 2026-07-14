import { Camera, Mail, MapPin } from "lucide-react"
import { siteConfig } from "@/lib/site"

export function Footer() {
  return (
    <footer id="contact-footer" className="bg-dark-elevated border-t border-glass-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Manoj Fit Coach</h3>
              <p className="text-xs text-neon tracking-[0.3em] uppercase font-medium">Transform Your Body</p>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              Online Weight Loss & Body Transformation Coach. Habit-based Nutrition for sustainable, life-changing results.
            </p>
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-neon/70 hover:text-neon transition-colors duration-300">
              <Camera className="h-4 w-4" />
              @manojfitcoach_05
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-5">Navigate</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "Services", href: "/#services" },
                  { label: "Results", href: "/#results" },
                  { label: "Contact", href: "/#contact" },
                  { label: "Login", href: "/login" },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-text-secondary hover:text-neon transition-colors duration-300">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 text-neon/50 shrink-0" />
                  <span className="text-sm text-text-secondary">Hyderabad, India</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-0.5 text-neon/50 shrink-0" />
                  <a href={`mailto:${siteConfig.email}`} className="text-sm text-text-secondary hover:text-neon transition-colors duration-300">{siteConfig.email}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-glass-border pt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-xs text-text-muted">&copy; {new Date().getFullYear()} Manoj Fit Coach. All rights reserved.</p>
          <p className="text-xs text-text-muted">
            Designed & maintained by{" "}
            <a href="https://instagram.com/sra1kumar2_18" target="_blank" rel="noopener noreferrer" className="text-neon/60 hover:text-neon transition-colors duration-300">@sra1kumar2_18</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
