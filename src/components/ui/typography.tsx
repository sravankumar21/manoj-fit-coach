"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyVariant
  children: React.ReactNode
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight",
  h2: "text-3xl md:text-4xl font-heading font-bold tracking-tight",
  h3: "text-2xl md:text-3xl font-heading font-semibold",
  h4: "text-xl md:text-2xl font-heading font-semibold",
  h5: "text-lg md:text-xl font-heading font-medium",
  h6: "text-base md:text-lg font-heading font-medium",
  p: "text-base md:text-lg leading-relaxed",
  span: "text-base",
  label: "text-sm font-medium",
}

export function Typography({ as = "p", className, children, ...props }: TypographyProps) {
  const Component = as
  return <Component className={cn(variantClasses[as], className)} {...props}>{children}</Component>
}
