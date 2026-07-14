"use client"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "rounded-full bg-neon text-white font-semibold hover:bg-neon-dim hover:shadow-[0_4px_20px_#2e7d3240] active:scale-95",
        green: "rounded-full bg-neon text-white font-semibold hover:bg-neon-dim hover:shadow-[0_4px_20px_#2e7d3240] active:scale-95",
        orange: "rounded-full bg-orange-accent text-white font-semibold hover:bg-orange-light active:scale-95",
        outline: "rounded-full border border-glass-border bg-glass text-text-primary backdrop-blur-xl hover:bg-glass-hover hover:border-neon/30 active:scale-95",
        ghost: "rounded-2xl text-text-secondary hover:bg-glass hover:text-text-primary active:scale-95",
        link: "text-neon underline-offset-4 hover:underline p-0 h-auto",
        "outline-neon": "rounded-full border-2 border-neon/30 text-neon backdrop-blur-xl hover:bg-neon/5 hover:border-neon/60 active:scale-95",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-full",
        default: "h-11 px-6 py-2",
        lg: "h-11 px-7 text-sm",
        icon: "h-10 w-10 rounded-2xl",
        "icon-sm": "h-8 w-8 rounded-xl",
        "icon-lg": "h-12 w-12 rounded-2xl",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
