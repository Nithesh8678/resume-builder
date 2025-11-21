"use client"

import { Project } from "@/types/resume"
import { Button } from "@/components/ui/Button"
import { Plus, Trash2, X, Sparkles, Loader2 } from "lucide-react"
import { useState } from "react"
import { generateAIContent } from "@/lib/actions"
import { toast } from "sonner"

interface ProjectsFormProps {
  data: Project[]
  onChange: (data: Project[]) => void
  isAiEnabled?: boolean
}

export function ProjectsForm({ data, onChange, isAiEnabled }: ProjectsFormProps) {
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null)

  const handleAdd = () => {
    onChange([
      ...data,
      {
        name: "",
        description: "",
        url: "",
        technologies: [],
      },
    ])
  }

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: keyof Project, value: string) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
  }

  const handleAddTech = (index: number, tech: string) => {
    if (!tech.trim()) return
    const newData = [...data]
    const currentTechs = newData[index].technologies || []
    newData[index] = { ...newData[index], technologies: [...currentTechs, tech.trim()] }
    onChange(newData)
  }

  const handleRemoveTech = (projectIndex: number, techIndex: number) => {
    const newData = [...data]
    const currentTechs = newData[projectIndex].technologies || []
    newData[projectIndex] = { 
      ...newData[projectIndex], 
      technologies: currentTechs.filter((_, i) => i !== techIndex) 
    }
    onChange(newData)
  }

  const handleAiGenerate = async (index: number) => {
    const project = data[index]
    if (!project.name) {
      toast.error("Please enter a Project Name first")
      return
    }

    setGeneratingIndex(index)
    try {
      const userContext = project.description 
        ? `Context/Keywords provided by user: "${project.description}"` 
        : "No specific context provided.";
      
      const techStack = project.technologies?.length 
        ? `Technologies used: ${project.technologies.join(", ")}`
        : "";

      const prompt = `Generate a concise project description for a project named "${project.name}".
      ${techStack}
      ${userContext}
      
      Rules:
      1. Highlight the problem solved and the solution.
      2. Mention technologies if provided.
      3. Keep it to 2-3 bullet points.
      4. Use action verbs.
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
        <h3 className="text-lg font-semibold text-slate-900">Projects</h3>
        <Button onClick={handleAdd} size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </div>

      {data.map((project, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 space-y-4 relative group">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Project Name</label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Project URL (Optional)</label>
              <input
                type="text"
                value={project.url || ""}
                onChange={(e) => handleChange(index, "url", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/username/project"
              />
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
                value={project.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the project and your role..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Technologies</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(project.technologies || []).map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium"
                  >
                    <span>{tech}</span>
                    <button
                      onClick={() => handleRemoveTech(index, techIndex)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add technology (Press Enter)"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTech(index, e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
