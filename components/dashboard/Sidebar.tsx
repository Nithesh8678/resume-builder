"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, PenTool, User, Settings, LogOut, CheckSquare, LayoutTemplate } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

const sidebarItems = [
  {
    title: "My Resumes",
    href: "/resume",
    icon: FileText,
  },
  {
    title: "ATS Checker",
    href: "/ats-checker",
    icon: CheckSquare,
  },
  {
    title: "CV",
    href: "/coverletter",
    icon: PenTool,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link href="/resume" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
            R
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            ResumeAI
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-slate-400 group-hover:text-slate-500"
                )}
              />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-200 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-700 hover:bg-red-50 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
