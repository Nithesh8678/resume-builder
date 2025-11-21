"use client"

import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"

export function CTA() {
  return (
    <Section className="bg-white">
      <motion.div
        className="bg-slate-900 rounded-3xl p-12 md:p-24 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to land your dream job?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10">
            Join thousands of developers who have successfully landed jobs at top tech companies using our resume builder.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100">
              Build Your Resume Now
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800 hover:text-white">
              View Examples
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
