"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, PenTool, Sparkles, Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useRouter } from "next/navigation"
import { saveResume } from "@/lib/actions"
import { sampleResume } from "@/data/sampleResume"
import { useState } from "react"
import { toast } from "sonner"
import { div } from "framer-motion/client"

interface ResumeBuilderModalProps {
  isOpen: boolean
  onClose: () => void
  templateId: string
}

export function ResumeBuilderModal({ isOpen, onClose, templateId }: ResumeBuilderModalProps) {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)

  const handleSelect = async (mode: string) => {
    setIsCreating(true)
    try {
      // Create the session immediately
      const result = await saveResume(sampleResume, undefined, undefined, mode)
      
      if (result.id) {
        // Redirect with the new ID
        router.push(`/editor?id=${result.id}&template=${templateId}&mode=${mode}`)
        onClose()
      } else {
        throw new Error("Failed to create resume session")
      }
    } catch (error) {
      console.error("Error creating session:", error)
      // Fallback to old behavior if creation fails, or show error
      // For now, let's just try to redirect without ID and let Editor handle it (fallback)
      router.push(`/editor?template=${templateId}&mode=${mode}`)
      onClose()
    } finally {
      setIsCreating(false)
    }
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Manual Build */}
                <button
                  onClick={() => handleSelect("manual")}
                  disabled={isCreating}
                  className="flex flex-col items-center justify-center p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-center space-y-4"
                >
                  <div className="p-4 bg-slate-100 rounded-full group-hover:bg-blue-100 transition-colors">
                    <PenTool className="h-8 w-8 text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Manual Build</h3>
                    <p className="text-sm text-slate-500 mt-1">Fill in the details yourself with full control.</p>
                  </div>
                </button>

                {/* AI Assisted */}
                <button
                  onClick={() => handleSelect("ai-assisted")}
                  disabled={isCreating}
                  className="flex flex-col items-center justify-center p-6 border-2 border-slate-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group text-center space-y-4"
                >
                  <div className="p-4 bg-slate-100 rounded-full group-hover:bg-purple-100 transition-colors">
                    <Sparkles className="h-8 w-8 text-slate-600 group-hover:text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">AI Assisted</h3>
                    <p className="text-sm text-slate-500 mt-1">Fill forms with AI help for descriptions.</p>
                  </div>
                </button>

                {/* Full AI Build */}
                <button
                  onClick={() => handleSelect("ai-chat")}
                  disabled={isCreating}
                  className="flex flex-col items-center justify-center p-6 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-center space-y-4"
                >
                  <div className="p-4 bg-slate-100 rounded-full group-hover:bg-indigo-100 transition-colors">
                    <Bot className="h-8 w-8 text-slate-600 group-hover:text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Full AI Build</h3>
                    <p className="text-sm text-slate-500 mt-1">Chat with AI to build your resume entirely.</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
