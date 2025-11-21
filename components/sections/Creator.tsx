"use client"

import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { motion } from "framer-motion"
import { Twitter, Linkedin } from "lucide-react"

export function Creator() {
  return (
    <Section className="bg-white">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
        <motion.div 
          className="w-full md:w-1/3"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 relative">
             {/* Placeholder for creator image */}
             <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                Creator Photo
             </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full md:w-2/3"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">Meet the Creator</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            I'm a Student, Just Like You.
          </h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            I saw the problem firsthand. As the industry grows bigger, thousands of students are applying for the same roles. I realized that sending the same resume everywhere wasn't working.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            I understood that the first round is all about relevance. That's why I built this platform—to help us create tailor-made resumes that actually fit the job description. I'm here to help you land that dream job.
          </p>
          
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Twitter className="w-4 h-4" />
              Follow on Twitter
            </Button>
            <Button variant="outline" className="gap-2">
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
