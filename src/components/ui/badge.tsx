"use client"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-neon/20 bg-neon/10 text-neon",
        green: "border-neon/20 bg-neon text-white font-semibold",
        outline: "border-neon/30 text-neon",
        cream: "border-glass-border bg-glass text-text-secondary",
        orange: "border-orange-accent/20 bg-orange-accent/10 text-orange-accent",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
