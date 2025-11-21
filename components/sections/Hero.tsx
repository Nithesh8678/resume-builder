"use client"

import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { motion } from "framer-motion"
import { ArrowRight, Github, FileText } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-38 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <span className="mr-2">✨</span>
              v2.0 is now live!
            </Badge>
          </motion.div> */}

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Tailor-Made Resumes for <span className="text-blue-600">Students</span> to Crack the First Round
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The industry is growing, and competition is tough. As a student, I built this platform to help you create custom, tailor-made resumes for every company—because a generic resume just doesn't cut it anymore.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="w-full sm:w-auto gap-2">
              <FileText className="w-4 h-4" />
              Build Your Resume
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <Github className="w-4 h-4" />
              Star on GitHub
            </Button>
          </motion.div>
          
          <motion.div
             className="mt-8 flex items-center gap-4 text-sm text-slate-500"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
          >
             <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                ))}
             </div>
             <p>Loved by 10,000+ developers</p>
          </motion.div>
        </div>

        {/* Hero Image / Visual */}
        <motion.div
          className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm shadow-2xl overflow-hidden p-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
           <div className="rounded-xl overflow-hidden bg-slate-50 aspect-[16/9] relative group">
              {/* Placeholder for actual app screenshot */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                 <p className="text-slate-400 font-medium">App Screenshot Placeholder</p>
              </div>
              
              {/* Floating elements to simulate UI */}
              <motion.div 
                className="absolute top-10 left-10 w-64 h-80 bg-white rounded-lg shadow-lg p-4 border border-slate-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                 <div className="h-4 w-20 bg-slate-100 rounded mb-4" />
                 <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-50 rounded" />
                    <div className="h-2 w-full bg-slate-50 rounded" />
                    <div className="h-2 w-3/4 bg-slate-50 rounded" />
                 </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-10 right-10 w-72 h-64 bg-white rounded-lg shadow-lg p-4 border border-slate-100"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100" />
                    <div>
                       <div className="h-3 w-24 bg-slate-100 rounded mb-1" />
                       <div className="h-2 w-16 bg-slate-50 rounded" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-50 rounded" />
                    <div className="h-2 w-full bg-slate-50 rounded" />
                 </div>
              </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  )
}
