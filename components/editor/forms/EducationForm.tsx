"use client"

import { ResumeData, Education } from "@/types/resume"
import { Button } from "@/components/ui/Button"
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"
import { generateAIContent } from "@/lib/actions"
import { toast } from "sonner"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
  isAiEnabled?: boolean
}

export function EducationForm({ data, onChange, isAiEnabled }: EducationFormProps) {
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null)

  const handleAdd = () => {
    onChange([
      ...data,
      {
        school: "",
        degree: "",
        field: "",
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

  const handleChange = (index: number, field: keyof Education, value: string | boolean) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const handleAiGenerate = async (index: number) => {
    const edu = data[index]
    if (!edu.degree || !edu.school) {
      toast.error("Please enter a Degree and School first")
      return
    }

    setGeneratingIndex(index)
    try {
      const userContext = edu.description 
        ? `Context/Keywords provided by user: "${edu.description}"` 
        : "No specific context provided.";

      const prompt = `Generate a brief description of coursework and achievements for a ${edu.degree} at ${edu.school}.
      ${userContext}
      
      Rules:
      1. Highlight key subjects and skills learned.
      2. Mention any honors or relevant activities if implied by context.
      3. Keep it to 2-3 bullet points.
      4. Format: Start each line with a "• " character.
      5. Return ONLY the bullet points. No intro/outro.`
      
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
        <h3 className="text-lg font-semibold text-slate-900">Education</h3>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </div>

      {data.map((edu, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 space-y-4 relative group">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">School / University</label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleChange(index, "school", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="University Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bachelor's, Master's, etc."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Field of Study</label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => handleChange(index, "field", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Computer Science, Business, etc."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Start Date</label>
              <input
                type="text"
                value={edu.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="MM/YYYY"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">End Date</label>
              <input
                type="text"
                value={edu.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="MM/YYYY"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-700">Description (Optional)</label>
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
              value={edu.description || ""}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Relevant coursework, honors, or achievements..."
            />
          </div>
        </div>
      ))}
    </div>
  )
}
