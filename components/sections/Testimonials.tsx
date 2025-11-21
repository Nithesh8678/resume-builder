"use client"

import { Section } from "@/components/ui/Section"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer @ Google",
    content: "I used this builder to update my resume and got interviews at top tech companies within a week. The AI suggestions were a game changer.",
    avatar: "/avatar-1.png",
  },
  {
    name: "Michael Chen",
    role: "Product Manager @ Stripe",
    content: "The best open source resume builder I've found. Clean, intuitive, and the templates are beautiful. Highly recommended!",
    avatar: "/avatar-2.png",
  },
  {
    name: "Emily Davis",
    role: "UX Designer @ Airbnb",
    content: "As a designer, I'm picky about aesthetics. This builder produces stunning resumes that look professionally designed.",
    avatar: "/avatar-3.png",
  },
]

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-slate-50">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="secondary" className="mb-4">Testimonials</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Loved by Developers
        </h2>
        <p className="text-lg text-slate-600">
          Don't just take our word for it. Here's what our users have to say.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
