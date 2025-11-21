"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  isLoading?: boolean
}

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description,
  isLoading 
}: ConfirmModalProps) {
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
              className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {description}
                </p>

                <div className="mt-6 flex w-full gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200"
                    onClick={onConfirm}
                    disabled={isLoading}
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
