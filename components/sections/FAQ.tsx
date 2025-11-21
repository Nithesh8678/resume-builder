"use client"

import { Section } from "@/components/ui/Section"
import { Badge } from "@/components/ui/Badge"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "Is this resume builder really free?",
    answer: "Yes, we offer a generous free tier that allows you to build and export a professional resume. We also have a Pro plan for advanced features.",
  },
  {
    question: "Can I import my existing resume?",
    answer: "Currently, we support importing from JSON Resume format. We are working on PDF and Word import features for future updates.",
  },
  {
    question: "How does the AI scoring work?",
    answer: "Our AI analyzes your resume content against thousands of successful resumes and job descriptions to give you a score and actionable improvements.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption and do not share your personal data with third parties without your consent.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <Section id="faq" className="bg-white">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="secondary" className="mb-4">FAQ</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Questions & Answers
        </h2>
        <p className="text-lg text-slate-600">
          Everything you need to know about the product and billing.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border border-slate-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-900">{faq.question}</span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-slate-500" />
              ) : (
                <Plus className="w-5 h-5 text-slate-500" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 pt-0 text-slate-600 border-t border-slate-100">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
