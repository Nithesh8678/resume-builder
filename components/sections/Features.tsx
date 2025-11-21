"use client"

import { Section } from "@/components/ui/Section"
import { Badge } from "@/components/ui/Badge"
import { motion } from "framer-motion"
import { Bot, LayoutDashboard, LineChart, PenTool } from "lucide-react"
import Image from "next/image"

const features = [
  {
    title: "AI-Powered Resume Assistant",
    description: "Our advanced AI helps you write professional bullet points, optimize your content for ATS, and suggests improvements based on your industry.",
    icon: Bot,
    image: "/feature-ai.png", // Placeholder
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Beautiful Resume Dashboard",
    description: "Manage multiple versions of your resume, track your applications, and organize your job search all in one place.",
    icon: LayoutDashboard,
    image: "/feature-dashboard.png", // Placeholder
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Resume Performance Scoring",
    description: "Get instant feedback on your resume's strength. Our scoring system analyzes your content against industry standards and job descriptions.",
    icon: LineChart,
    image: "/feature-score.png", // Placeholder
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "AI Cover Letter Generator",
    description: "Generate tailored cover letters for each job application in seconds. Just paste the job description and let AI do the rest.",
    icon: PenTool,
    image: "/feature-cover.png", // Placeholder
    color: "bg-orange-100 text-orange-600",
  },
]

export function Features() {
  return (
    <Section id="features" className="bg-slate-50/50">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="secondary" className="mb-4">Why Tailor-Made?</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Generic Resumes Get Rejected
        </h2>
        <p className="text-lg text-slate-600">
          Resumes play the most important role in the first round. To stand out, you need to tailor your resume for each specific company and role. Here's how we help you do that.
        </p>
      </div>

      <div className="space-y-24">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex-1 space-y-6">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">{feature.title}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Feature benefit point {i}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1 w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white group">
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                   <span className="text-slate-400">Feature Preview: {feature.title}</span>
                </div>
                {/* Interactive hover effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
