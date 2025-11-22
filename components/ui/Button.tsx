import * as React from "react"

import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
    
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20",
      secondary: "bg-white text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm",
      outline: "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900",
      ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600",
      link: "text-blue-600 underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-10 px-6 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-12 rounded-full px-8 text-base",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
