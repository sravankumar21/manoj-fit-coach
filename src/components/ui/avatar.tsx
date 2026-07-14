"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "default" | "lg" | "xl"
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  default: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-xl",
}

function Avatar({ src, alt, fallback, size = "default", className, ...props }: AvatarProps) {
  const initials = fallback || "?"
  return (
    <div className={cn("relative flex shrink-0 overflow-hidden rounded-full bg-neon/10 border border-neon/15", sizeClasses[size], className)} {...props}>
      {src ? (
        <img src={src} alt={alt} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-heading font-semibold text-neon">{initials}</div>
      )}
    </div>
  )
}

export { Avatar }
