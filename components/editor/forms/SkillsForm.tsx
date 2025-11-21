"use client"

import { ResumeData, Skill } from "@/types/resume"
import { Button } from "@/components/ui/Button"
import { Plus, X, Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"
import { generateAIContent } from "@/lib/actions"
import { toast } from "sonner"

interface SkillsFormProps {
  data: Skill[]
  onChange: (data: Skill[]) => void
  isAiEnabled?: boolean
  jobTitle?: string
}

export function SkillsForm({ data, onChange, isAiEnabled, jobTitle }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (newSkill.trim()) {
      onChange([...data, { name: newSkill.trim() }])
      setNewSkill("")
    }
  }

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleAiSuggest = async () => {
    if (!jobTitle) {
      toast.error("Please enter a Job Title in Personal Info first")
      return
    }

    setIsGenerating(true)
    try {
      const prompt = `Suggest 5-7 essential technical and soft skills for a ${jobTitle}.
      
      Rules:
      1. Return ONLY a comma-separated list of skills.
      2. No numbering, no bullet points.
      3. Example output: React, TypeScript, Project Management, Communication`
      
      const { text, error } = await generateAIContent(prompt)
      
      if (error || !text) throw new Error(error || "No content generated")
      
      const suggestedSkills = text.split(',').map(s => s.trim()).filter(s => s)
      
      // Filter out duplicates that already exist
      const existingNames = new Set(data.map(s => s.name.toLowerCase()))
      const newSkills = suggestedSkills
        .filter(s => !existingNames.has(s.toLowerCase()))
        .map(name => ({ name }))

      if (newSkills.length === 0) {
        toast.info("No new skills found to add")
      } else {
        onChange([...data, ...newSkills])
        toast.success(`Added ${newSkills.length} skills`)
      }
    } catch (error) {
      console.error("AI Generation error:", error)
      toast.error("Failed to generate content")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
        {isAiEnabled && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAiSuggest}
            disabled={isGenerating}
            className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            {isGenerating ? (
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
            ) : (
              <Sparkles className="h-3 w-3 mr-1" />
            )}
            <span className="text-xs font-medium">Auto-Suggest Skills</span>
          </Button>
        )}
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a skill (e.g. React, Project Management)"
        />
        <Button type="submit" disabled={!newSkill.trim()}>
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-sm font-medium group"
          >
            <span>{skill.name}</span>
            <button
              onClick={() => handleRemove(index)}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-slate-500 italic">No skills added yet.</p>
        )}
      </div>
    </div>
  )
}
