"use client"

import { Section } from "@/components/ui/Section"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Build and preview your resume",
    features: [
      "Create 1 Resume",
      "Basic Templates",
      "Online Preview",
      "No Downloads",
    ],
    cta: "Start Building",
    popular: false,
  },
  {
    name: "Manual",
    price: "₹5",
    period: "/resume",
    description: "Download your manually built resume",
    features: [
      "Everything in Free",
      "PDF Download",
      "Remove Watermark",
      "Manual Data Entry",
    ],
    cta: "Buy Now",
    popular: false,
  },
  {
    name: "AI Assisted",
    price: "₹10",
    period: "/resume",
    description: "Get AI help while you write",
    features: [
      "Everything in Manual",
      "AI Bullet Point Suggestions",
      "Grammar Check",
      "Keyword Optimization",
    ],
    cta: "Buy Now",
    popular: true,
  },
  {
    name: "Full AI",
    price: "₹25",
    period: "/resume",
    description: "Let AI build it for you",
    features: [
      "Everything in AI Assisted",
      "Full Resume Generation",
      "Cover Letter Generation",
      "LinkedIn Profile Optimization",
    ],
    cta: "Buy Now",
    popular: false,
  },
]

export function Pricing() {
  return (
    <Section id="pricing" className="bg-slate-50">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="secondary" className="mb-4">Pricing</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Simple, Student-Friendly Pricing
        </h2>
        <p className="text-lg text-slate-600">
          Pay only for what you need. No monthly subscriptions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`h-full flex flex-col ${plan.popular ? "border-blue-600 shadow-xl relative scale-105 z-10" : "hover:border-blue-200 hover:shadow-lg transition-all"}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Best Value
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-xs mt-2">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-slate-500 text-sm">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "primary" : "outline"}
                  size="sm"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
