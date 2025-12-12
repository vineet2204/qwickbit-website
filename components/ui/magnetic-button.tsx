"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary"
  children: React.ReactNode
}

export function MagneticButton({
  size = "md",
  variant = "primary",
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  }

  return (
    <Button className={cn(sizeClasses[size], variantClasses[variant], "transition-all", className)} {...props}>
      {children}
    </Button>
  )
}
