"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const Divider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "green" | "ornate" }>(
  ({ className, variant = "default", ...props }, ref) => {
    if (variant === "green") {
      return <div ref={ref} className={cn("h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent", className)} {...props} />
    }
    if (variant === "ornate") {
      return (
        <div ref={ref} className={cn("flex items-center gap-4 py-2", className)} {...props}>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
          <div className="h-2 w-2 rotate-45 bg-neon/40" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
        </div>
      )
    }
    return <div ref={ref} className={cn("h-px bg-glass-border", className)} {...props} />
  },
)
Divider.displayName = "Divider"

export { Divider }
