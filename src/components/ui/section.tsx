"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padded?: boolean
}

function Section({ className, padded = true, ...props }: SectionProps) {
  return <section className={cn(padded && "py-16 md:py-24", className)} {...props} />
}

function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 md:px-8", className)} {...props} />
}

export { Section, Container }
