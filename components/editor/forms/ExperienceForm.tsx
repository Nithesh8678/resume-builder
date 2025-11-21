"use client"

import { ResumeData, Experience } from "@/types/resume"
import { Button } from "@/components/ui/Button"
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react"
import { generateAIContent } from "@/lib/actions"
import { useState } from "react"
import { toast } from "sonner"

interface ExperienceFormProps {
  data: Experience[]
  onChange: (data: Experience[]) => void
  isAiEnabled?: boolean
}

export function ExperienceForm({ data, onChange, isAiEnabled }: ExperienceFormProps) {
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null)

  const handleAdd = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        location: "",
        description: "",
      },
    ])
  }

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: keyof Experience, value: string | boolean) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const handleAiGenerate = async (index: number) => {
    const exp = data[index]
    if (!exp.position || !exp.company) {
      toast.error("Please enter a Position and Company first")
      return
    }

    setGeneratingIndex(index)
    try {
      const userContext = exp.description 
        ? `Context/Keywords provided by user: "${exp.description}"` 
        : "No specific context provided.";

      const prompt = `Generate 3-4 high-impact, ATS-friendly resume bullet points for a ${exp.position} at ${exp.company}.
      ${userContext}
      
      Rules:
      1. If user context is provided, strictly base the bullet points on those keywords/achievements.
      2. Start each bullet with a strong action verb.
      3. Focus on quantifiable achievements and metrics if possible.
      4. Keep it concise and professional (1-2 lines per bullet).
      5. Format: Start each line with a "• " character.
      6. Return ONLY the bullet points. No intro/outro.`
      
      const { text, error } = await generateAIContent(prompt)
      
      if (error || !text) throw new Error(error || "No content generated")
      
      handleChange(index, "description", text)
      toast.success("Description generated with AI")
    } catch (error) {
      console.error("AI Generation error:", error)
      toast.error("Failed to generate content")
    } finally {
      setGeneratingIndex(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">Work Experience</h3>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Add Position
        </Button>
      </div>

      {data.map((exp, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 space-y-4 relative group">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Company Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Position</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleChange(index, "position", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Job Title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Start Date</label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="MM/YYYY"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">End Date</label>
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                disabled={exp.current}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                placeholder="MM/YYYY"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`current-${index}`}
              checked={exp.current}
              onChange={(e) => handleChange(index, "current", e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`current-${index}`} className="text-sm text-slate-700">
              I currently work here
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700">Description</label>
              {isAiEnabled && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAiGenerate(index)}
                  disabled={generatingIndex === index}
                  className="h-6 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  {generatingIndex === index ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <Sparkles className="h-3 w-3 mr-1" />
                  )}
                  <span className="text-xs font-medium">Generate with AI</span>
                </Button>
              )}
            </div>
            <textarea
              value={exp.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}
    </div>
  )
}
