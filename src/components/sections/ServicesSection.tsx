"use client"
import { useEffect } from "react"
import Link from "next/link"
import { getIcon } from "@/lib/icons"
import { ArrowRight } from "lucide-react"
import { useApi } from "@/hooks/useApi"
import { servicesApi } from "@/lib/api"
import type { Service } from "@/types/api"

const fallbackServices = [
  { _id: "1", title: "Weight Loss Programs", description: "Structured habit-based programs for sustainable weight loss", icon: "Flame", price: "Contact for pricing", duration: "8-12 weeks", isActive: true, createdAt: "", updatedAt: "" },
  { _id: "2", title: "Body Transformation", description: "Complete body recomposition coaching", icon: "Dumbbell", price: "Contact for pricing", duration: "12-16 weeks", isActive: true, createdAt: "", updatedAt: "" },
  { _id: "3", title: "Nutrition Planning", description: "Personalized meal plans & habit-based nutrition coaching", icon: "Apple", price: "Contact for pricing", duration: "Ongoing", isActive: true, createdAt: "", updatedAt: "" },
  { _id: "4", title: "Online Coaching", description: "Virtual 1-on-1 coaching with weekly check-ins", icon: "Monitor", price: "Contact for pricing", duration: "Monthly", isActive: true, createdAt: "", updatedAt: "" },
  { _id: "5", title: "Personal Training", description: "In-person training sessions tailored to your goals", icon: "Users", price: "Contact for pricing", duration: "Per session", isActive: true, createdAt: "", updatedAt: "" },
]

export function ServicesSection() {
  const { data: apiServices, loading, execute: fetchServices } = useApi<Service[]>(servicesApi.getAll)

  useEffect(() => { fetchServices() }, [fetchServices])

  const services = apiServices?.length ? apiServices : fallbackServices

  return (
    <section id="services" className="bg-dark-elevated py-16 md:py-24 border-t border-glass-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs font-medium text-neon tracking-[0.3em] uppercase mb-3">Our Services</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary tracking-tight leading-tight mb-3">
            Everything You Need<br />to <span className="text-neon">Transform</span>
          </h2>
          <p className="text-sm text-text-secondary">Comprehensive fitness and nutrition coaching designed to help you lose weight, build strength, and create lasting healthy habits.</p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-12 gap-3 ${loading ? "opacity-60" : ""}`}>
          {services.slice(0, 2).map((service) => {
            const Icon = getIcon(service.icon)
            return (
              <Link key={service._id} href={`/services/${service._id}`} className="group md:col-span-6 rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-6 transition-all duration-500 hover:bg-glass-hover hover:border-neon/20 shadow-sm hover:shadow-lg flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 border border-neon/15 transition-all duration-500 group-hover:bg-neon/20 group-hover:border-neon/30">
                    <Icon className="h-6 w-6 text-neon" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-text-primary group-hover:text-neon transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{service.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  {service.duration && <span className="text-[10px] font-medium text-neon border border-neon/20 bg-neon/5 rounded-full px-2.5 py-0.5">{service.duration}</span>}
                  <div className="flex items-center gap-1 text-xs font-medium text-neon group-hover:gap-2 transition-all">Learn More <ArrowRight className="h-3 w-3" /></div>
                </div>
              </Link>
            )
          })}

          {services.slice(2, 5).map((service) => {
            const Icon = getIcon(service.icon)
            return (
              <Link key={service._id} href={`/services/${service._id}`} className="group md:col-span-4 rounded-2xl border border-glass-border bg-glass backdrop-blur-xl p-5 transition-all duration-500 hover:bg-glass-hover hover:border-neon/20 shadow-sm hover:shadow-lg flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-neon/10 border border-neon/15 transition-all duration-500 group-hover:bg-neon/20">
                    <Icon className="h-5 w-5 text-neon" />
                  </div>
                  <h3 className="mb-1.5 font-heading text-base font-bold text-text-primary group-hover:text-neon transition-colors duration-300">{service.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{service.description}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  {service.duration && <span className="text-[10px] font-medium text-neon border border-neon/20 bg-neon/5 rounded-full px-2 py-0.5">{service.duration}</span>}
                  <div className="flex items-center gap-1 text-[10px] font-medium text-neon group-hover:gap-2 transition-all">Learn More <ArrowRight className="h-3 w-3" /></div>
                </div>
              </Link>
            )
          })}
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-6">
            {[6,6,4,4,4].map((span, i) => (
              <div key={i} className={`md:col-span-${span} rounded-2xl border border-glass-border bg-glass p-${span > 5 ? '6' : '5'}`}>
                <div className={`mb-${span > 5 ? '4' : '3'} h-${span > 5 ? '12' : '10'} w-${span > 5 ? '12' : '10'} rounded-xl shimmer`} />
                <div className={`mb-2 h-${span > 5 ? '5' : '4'} w-3/4 rounded shimmer`} />
                <div className="h-3 w-full rounded shimmer" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
