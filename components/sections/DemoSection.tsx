"use client"

import { Section } from "@/components/ui/Section"
import { Badge } from "@/components/ui/Badge"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

export function DemoSection() {
  return (
    <Section className="bg-white">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="secondary" className="mb-4">Demo</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          See Resume in Action
        </h2>
        <p className="text-lg text-slate-600">
          Watch how easy it is to create a professional resume with our builder.
        </p>
      </div>

      <motion.div
        className="relative max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group cursor-pointer"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-blue-600 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
        
        {/* Abstract background for video placeholder */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-800 to-slate-900" />
        <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      </motion.div>
    </Section>
  )
}
