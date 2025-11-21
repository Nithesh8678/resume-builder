"use client"

import Link from "next/link"
import { ArrowLeft, Layout, Star, Briefcase, Palette, Code } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const categories = [
  { name: "All Templates", icon: Layout, id: "all" },
  { name: "Professional", icon: Briefcase, id: "professional" },
  { name: "Creative", icon: Palette, id: "creative" },
  { name: "Simple", icon: Star, id: "simple" },
  { name: "Technical", icon: Code, id: "technical" },
]

export function TemplateSidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link href="/resume" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-slate-900">Templates</h2>
          <p className="text-sm text-slate-500">Choose a design for your resume</p>
        </div>
        
        <nav className="space-y-1 px-3">
          {categories.map((category) => (
            <button
              key={category.id}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                category.id === "all"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <category.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  category.id === "all"
                    ? "text-blue-600"
                    : "text-slate-400"
                )}
              />
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
