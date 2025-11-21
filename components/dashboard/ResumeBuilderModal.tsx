"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, PenTool, Sparkles, Bot } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useRouter } from "next/navigation"

interface ResumeBuilderModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeBuilderModal({ isOpen, onClose }: ResumeBuilderModalProps) {
  const router = useRouter()

  const handleSelect = (mode: string) => {
    router.push(`/templates?mode=${mode}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">How would you like to start?</h2>
                <p className="mt-2 text-slate-500">Select the method that best suits your workflow.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Manual Build */}
                <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                    <PenTool className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">Manual Build</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500">
                    Start with a blank canvas. Perfect if you have a specific layout in mind and want full control.
                  </p>
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full border-slate-200 hover:border-blue-500 hover:text-blue-600"
                      onClick={() => handleSelect('manual')}
                    >
                      Start Manual
                    </Button>
                  </div>
                </div>

                {/* AI-Assisted */}
                <div className="group relative flex flex-col rounded-2xl border-2 border-blue-100 bg-blue-50/30 p-6 transition-all hover:border-blue-500 hover:shadow-lg hover:-translate-y-1">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    RECOMMENDED
                  </div>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">AI-Assisted</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    We'll guide you section by section with smart suggestions and real-time improvements.
                  </p>
                  <div className="mt-auto">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200"
                      onClick={() => handleSelect('ai-assisted')}
                    >
                      Start with AI
                    </Button>
                  </div>
                </div>

                {/* Full AI Build */}
                <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-purple-500 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-100">
                    <Bot className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">Full AI Build</h3>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500">
                    Upload your LinkedIn or existing resume, and let our AI rewrite and format it perfectly.
                  </p>
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full border-slate-200 hover:border-purple-500 hover:text-purple-600"
                      onClick={() => handleSelect('full-ai')}
                    >
                      Auto-Generate
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
