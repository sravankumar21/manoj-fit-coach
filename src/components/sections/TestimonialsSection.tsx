"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useApi } from "@/hooks/useApi"
import { reviewsApi } from "@/lib/api"
import type { Review } from "@/types/api"

const fallbackReviews = [
  { _id: "1", clientName: "Priya S.", rating: 5, comment: "Lost 12kg in 3 months! Manoj&apos;s habit-based approach changed my life. The nutrition plans are easy to follow and he&apos;s always there for support.", isApproved: true, createdAt: "", updatedAt: "" },
  { _id: "2", clientName: "Rahul K.", rating: 5, comment: "Best online coaching experience. Lost 15kg and gained confidence. The weekly check-ins kept me accountable.", isApproved: true, createdAt: "", updatedAt: "" },
  { _id: "3", clientName: "Anita M.", rating: 5, comment: "Transformed my body and my mindset. The personalized meal plans made all the difference. Highly recommend!", isApproved: true, createdAt: "", updatedAt: "" },
  { _id: "4", clientName: "Vikram P.", rating: 5, comment: "From 95kg to 78kg in 6 months. Manoj knows exactly what he&apos;s doing. Professional and caring coach.", isApproved: true, createdAt: "", updatedAt: "" },
  { _id: "5", clientName: "Deepa R.", rating: 5, comment: "Post-pregnancy weight loss seemed impossible until I found Manoj. Lost 20kg with his guidance!", isApproved: true, createdAt: "", updatedAt: "" },
]

export function TestimonialsSection() {
  const { data: apiReviews, loading, execute: fetchReviews } = useApi<Review[]>(reviewsApi.getApproved)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => { fetchReviews() }, [fetchReviews])

  const reviews = apiReviews?.length ? apiReviews : fallbackReviews

  useEffect(() => {
    if (reviews.length === 0) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [reviews.length])

  return (
    <section id="testimonials" className="bg-dark-elevated py-16 md:py-24 border-t border-glass-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs font-medium text-neon tracking-[0.3em] uppercase mb-3">Testimonials</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight leading-tight">
            Real People,<br /><span className="text-neon">Real Results</span>
          </h2>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-glass-border bg-glass p-8">
              <div className="h-3 w-24 rounded shimmer mb-4" />
              <div className="h-6 w-3/4 rounded shimmer mb-3" />
              <div className="h-3 w-1/2 rounded shimmer" />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-6 md:p-8 shadow-sm transition-all duration-500">
              <div className="mb-4 text-5xl md:text-7xl font-heading text-neon/20 leading-none">&ldquo;</div>
              <p className="text-xl md:text-2xl lg:text-3xl font-heading font-medium text-text-primary leading-snug mb-6 max-w-4xl">
                {reviews[activeIndex]?.comment}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neon/10 border border-neon/15 text-neon font-heading font-bold text-sm">
                  {reviews[activeIndex]?.clientName?.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-text-primary">{reviews[activeIndex]?.clientName}</p>
                  <p className="text-xs text-text-muted">Verified Client</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0">
              {reviews.map((review, i) => (
                <button key={review._id} onClick={() => setActiveIndex(i)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 border ${i === activeIndex ? "border-neon/30 bg-neon/10 text-neon" : "border-glass-border bg-glass text-text-secondary hover:border-neon/20 hover:text-text-primary"}`}>
                  {review.clientName}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-8">
          <Button variant="outline" size="default" onClick={() => {
            const el = document.getElementById("contact")
            if (el) el.scrollIntoView({ behavior: "smooth" })
          }}>
            Share Your Experience
          </Button>
        </div>
      </div>
    </section>
  )
}
