"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const scrollToContact = () => {
    const el = document.getElementById("contact")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToServices = () => {
    const el = document.getElementById("services")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-dark-base">
      <div className="absolute inset-0">
        <img src="https://images.pexels.com/photos/33433977/pexels-photo-33433977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="h-full w-full object-cover opacity-12" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-base/70 via-dark-base/40 to-dark-base" />
      </div>
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-neon/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-neon/3 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight text-text-primary reveal-up">
            Transform<br />
            <span className="text-neon">Your Body</span><br />
            <span className="text-text-muted">Transform</span> Your Life
          </h1>
          <p className="mb-6 max-w-lg text-base text-text-secondary leading-relaxed reveal-up" style={{ animationDelay: "200ms" }}>
            Habit-based nutrition and personalized coaching to help you lose weight, build strength, and create lasting lifestyle changes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row reveal-up" style={{ animationDelay: "300ms" }}>
            <Button size="lg" onClick={scrollToContact}>
              Start Your Transformation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline-neon" size="lg" onClick={scrollToServices}>
              Explore Programs
            </Button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-glass-border pt-6 reveal-up" style={{ animationDelay: "400ms" }}>
          <div>
            <div className="text-3xl md:text-4xl font-heading font-bold text-text-primary">450<span className="text-neon">+</span></div>
            <div className="mt-1 text-xs text-text-muted">Clients Transformed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-heading font-bold text-text-primary">5000<span className="text-neon">+</span></div>
            <div className="mt-1 text-xs text-text-muted">KGs Lost Combined</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-heading font-bold text-text-primary">5<span className="text-neon">+</span></div>
            <div className="mt-1 text-xs text-text-muted">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}
