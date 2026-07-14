"use client"
import { useEffect, useState } from "react"
import { Heart, Target, Zap, TrendingUp } from "lucide-react"
import { useApi } from "@/hooks/useApi"
import { reviewsApi } from "@/lib/api"

const values = [
  { icon: Heart, title: "Habit-Based Approach", desc: "Building sustainable habits, not crash diets" },
  { icon: Target, title: "Personalized Plans", desc: "Tailored nutrition and training for your goals" },
  { icon: Zap, title: "Online + In-Person", desc: "Flexible coaching that fits your lifestyle" },
  { icon: TrendingUp, title: "Proven Results", desc: "Real transformations with measurable outcomes" },
]

export function AboutSection() {
  const { data: reviews, execute: fetchReviews } = useApi(reviewsApi.getApproved)
  const [reviewCount, setReviewCount] = useState(0)

  useEffect(() => { fetchReviews() }, [fetchReviews])
  useEffect(() => { if (reviews) setReviewCount(reviews.length) }, [reviews])

  return (
    <section id="about" className="bg-dark-base py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10">
          <div className="text-xs font-medium text-neon tracking-[0.3em] uppercase mb-3">About Manoj</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight leading-tight">
            Your Partner in<br /><span className="text-neon">Health & Fitness</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-500">
            <div className="space-y-4 text-text-secondary leading-relaxed text-sm md:text-base">
              <p>I&apos;m Manoj — a certified Fitness Coach and Online Weight Loss & Body Transformation Specialist. As a Herbalife coach, I combine science-backed nutrition with habit-based coaching to help you achieve sustainable results.</p>
              <p>Whether you&apos;re looking to lose weight, build strength, or completely transform your body and lifestyle, I provide the guidance, accountability, and support you need — online or in-person.</p>
              <p className="text-neon font-medium">My approach isn&apos;t about quick fixes. It&apos;s about building healthy habits that last a lifetime. Lose weight now — ask me how!</p>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-6 flex flex-col justify-center shadow-sm hover:shadow-md transition-all duration-500">
            <div className="space-y-5">
              {[
                { label: "Happy Clients", value: "450+" },
                { label: "KGs Lost Combined", value: "5000+" },
                { label: "Client Reviews", value: reviewCount || "50+" },
                { label: "Years Experience", value: "5+" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline justify-between">
                  <span className="text-2xl md:text-3xl font-heading font-bold text-text-primary">{stat.value}</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {values.map((value, i) => (
            <div key={value.title} className={`rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-5 transition-all duration-500 hover:bg-glass-hover hover:border-neon/20 shadow-sm hover:shadow-md ${i < 2 ? "md:col-span-6" : "md:col-span-6"}`}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon/10 border border-neon/15">
                  <value.icon className="h-5 w-5 text-neon" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-semibold text-text-primary mb-0.5">{value.title}</h4>
                  <p className="text-xs text-text-secondary">{value.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
