"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getIcon } from "@/lib/icons"
import { servicesApi } from "@/lib/api"
import { useApi } from "@/hooks/useApi"
import type { Service } from "@/types/api"
import { ArrowLeft, Check, Clock, DollarSign, ChevronRight } from "lucide-react"
import { AuthProvider } from "@/contexts/AuthContext"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { BookingModal } from "@/components/BookingModal"

function ServiceDetail() {
  const params = useParams<{ id: string }>()
  const { data: service, loading, error, execute: fetchService } = useApi<Service>(servicesApi.getById)
  const { data: allServices, execute: fetchAllServices } = useApi<Service[]>(servicesApi.getAll)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchService(params.id)
      fetchAllServices()
    }
  }, [params.id, fetchService, fetchAllServices])

  useEffect(() => {
    if (service && initialLoad) setInitialLoad(false)
  }, [service, initialLoad])

  if (loading && initialLoad) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-dark-base">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-neon border-t-transparent animate-spin" />
          <p className="text-sm text-text-muted">Loading service...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-dark-base px-5">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">Service Not Found</h2>
          <Link href="/"><Button variant="outline"><ArrowLeft className="h-4 w-4" />Back to Home</Button></Link>
        </div>
      </div>
    )
  }

  const Icon = getIcon(service.icon)
  const otherServices = allServices?.filter((s) => s._id !== service._id) || []

  return (
    <div className={`bg-dark-base min-h-screen transition-opacity duration-300 ${!initialLoad && loading ? "opacity-60" : ""}`}>
      {loading && !initialLoad && (
        <div className="fixed top-16 left-0 right-0 z-50 h-1">
          <div className="h-full bg-gradient-to-r from-neon to-neon-dim animate-pulse" />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" />Back to Home
            </Link>

            <div className="rounded-3xl border border-glass-border bg-glass backdrop-blur-xl p-8 md:p-10 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-neon/10 border border-neon/15">
                  <Icon className="h-8 w-8 text-neon" />
                </div>
                <div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">{service.title}</h1>
                  <p className="text-text-secondary mt-1">{service.description}</p>
                </div>
              </div>

              <div className="h-px bg-glass-border my-8" />

              <div className="grid grid-cols-2 gap-4 mb-8">
                {service.duration && (
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Clock className="h-4 w-4 text-neon" />
                    <span className="font-medium text-text-primary">Duration:</span> {service.duration}
                  </div>
                )}
                {service.price && (
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <DollarSign className="h-4 w-4 text-neon" />
                    <span className="font-medium text-text-primary">Price:</span> {service.price}
                  </div>
                )}
              </div>

              {service.details && (
                <div className="mb-8">
                  <h4 className="font-heading text-lg font-semibold text-text-primary mb-3">About This Service</h4>
                  <p className="text-text-secondary leading-relaxed">{service.details}</p>
                </div>
              )}

              {service.includes && service.includes.length > 0 && (
                <div>
                  <h4 className="font-heading text-lg font-semibold text-text-primary mb-3">What&apos;s Included</h4>
                  <ul className="space-y-2">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <Check className="h-4 w-4 mt-0.5 text-neon shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8">
                <Button size="lg" className="w-full sm:w-auto" onClick={() => window.dispatchEvent(new Event("open-booking-modal"))}>
                  Book This Service<ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-3xl border border-glass-border bg-glass backdrop-blur-xl p-6 shadow-sm">
              <h4 className="font-heading text-lg font-semibold text-text-primary mb-4">Other Services</h4>
              <div className="space-y-2">
                {otherServices.map((s) => {
                  const SIcon = getIcon(s.icon)
                  return (
                    <Link key={s._id} href={`/services/${s._id}`} className="flex items-center gap-3 rounded-2xl p-3 text-sm transition-all duration-300 hover:bg-glass-hover group">
                      <SIcon className="h-5 w-5 text-neon shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-text-primary truncate group-hover:text-neon transition-colors">{s.title}</p>
                        {s.duration && <p className="text-xs text-text-muted">{s.duration}</p>}
                      </div>
                      <ChevronRight className="h-4 w-4 text-text-muted shrink-0 group-hover:text-neon transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServiceDetailPage() {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-1"><ServiceDetail /></main>
      <Footer />
      <BookingModal />
    </AuthProvider>
  )
}
