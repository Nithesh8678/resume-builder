"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, AlertCircle, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface ExitConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onDiscard: () => void
  isSaving?: boolean
  isDiscarding?: boolean
}

export function ExitConfirmationModal({ 
  isOpen, 
  onClose, 
  onSave, 
  onDiscard,
  isSaving,
  isDiscarding
}: ExitConfirmationModalProps) {
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
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <AlertCircle className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900">Save Changes?</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  You are about to exit the editor. Do you want to save your resume?
                  <br />
                  <span className="text-red-500 font-medium">Warning: "Discard" will permanently delete this resume.</span>
                </p>

                <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300" 
                    onClick={onDiscard}
                    disabled={isSaving || isDiscarding}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isDiscarding ? "Discarding..." : "Discard"}
                  </Button>
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200"
                    onClick={onSave}
                    disabled={isSaving || isDiscarding}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save & Exit"}
                  </Button>
                </div>
                <button 
                  onClick={onClose}
                  disabled={isSaving || isDiscarding}
                  className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline"
                >
                  Cancel and stay
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
