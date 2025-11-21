"use client"

import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { templates } from "@/lib/templates"
import { sampleResume } from "@/data/sampleResume"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { ResumeBuilderModal } from "@/components/dashboard/ResumeBuilderModal"
import { Loader2 } from "lucide-react"

function TemplatesPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState("modern")

  const handleUseTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Select a Template</h1>
          <p className="text-slate-500 mt-2">Choose a template to start building your resume.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, index) => {
          const TemplateComponent = template.component;
          
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col"
            >
              {/* Live Preview Container */}
              <div className="aspect-[210/297] bg-slate-100 relative overflow-hidden group-hover:bg-slate-50 transition-colors">
                {/* Scaled Preview */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="origin-top-left transform scale-[0.25] w-[400%] h-[400%] pointer-events-none select-none p-8">
                    <TemplateComponent data={sampleResume} />
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button 
                    onClick={() => handleUseTemplate(template.id)}
                    className="bg-blue-600 text-white hover:bg-blue-700 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Use This Template
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 border-t border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{template.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{template.category}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-2 line-clamp-2">{template.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <ResumeBuilderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        templateId={selectedTemplateId}
      />
    </div>
  )
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <TemplatesPageContent />
    </Suspense>
  )
}
