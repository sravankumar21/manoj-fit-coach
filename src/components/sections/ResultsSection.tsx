"use client"
import { TrendingUp, Flame, Dumbbell, Heart, Award } from "lucide-react"

const results = [
  { name: "Priya S.", weight: "-12kg", duration: "3 months", program: "Weight Loss", icon: Flame },
  { name: "Rahul K.", weight: "-15kg", duration: "4 months", program: "Body Transformation", icon: Dumbbell },
  { name: "Anita M.", weight: "-8kg", duration: "2 months", program: "Nutrition Planning", icon: Heart },
  { name: "Vikram P.", weight: "-17kg", duration: "6 months", program: "Online Coaching", icon: TrendingUp },
  { name: "Deepa R.", weight: "-20kg", duration: "8 months", program: "Personal Training", icon: Award },
  { name: "Kiran T.", weight: "-10kg", duration: "3 months", program: "Weight Loss", icon: Flame },
]

const bigStats = [
  { number: "450+", label: "Clients Transformed" },
  { number: "5000+", label: "KGs Lost Combined" },
  { number: "100%", label: "Dedication" },
]

export function ResultsSection() {
  return (
    <section id="results" className="bg-dark-base py-16 md:py-24 border-t border-glass-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {bigStats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary tracking-tight">{stat.number}</div>
              <div className="mt-1 text-xs text-text-muted uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-8 max-w-2xl">
          <div className="text-xs font-medium text-neon tracking-[0.3em] uppercase mb-3">Results</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight leading-tight">
            Transformations That<br /><span className="text-neon">Inspire</span>
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 md:-mx-8 md:px-8 snap-x snap-mandatory scrollbar-hide">
          {results.map((result, i) => {
            const Icon = result.icon
            return (
              <div key={i} className="group snap-start shrink-0 w-[240px] md:w-[280px] rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-5 transition-all duration-500 hover:bg-glass-hover hover:border-neon/20 shadow-sm hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon/10 border border-neon/15">
                    <Icon className="h-5 w-5 text-neon" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-heading font-bold text-neon">{result.weight}</div>
                    <div className="text-[10px] text-text-muted">{result.duration}</div>
                  </div>
                </div>
                <h3 className="font-heading text-sm font-semibold text-text-primary mb-0.5">{result.name}</h3>
                <p className="text-xs text-text-secondary mb-3">{result.program}</p>
                <div className="h-1 w-full rounded-full bg-glass-border overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-neon to-neon-dim transition-all duration-1000" style={{ width: `${Math.min(100, Math.abs(parseInt(result.weight)) * 5)}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
