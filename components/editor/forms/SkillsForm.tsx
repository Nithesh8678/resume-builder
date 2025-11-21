"use client"

import { ResumeData, Skill } from "@/types/resume"
import { Button } from "@/components/ui/Button"
import { Plus, X } from "lucide-react"
import { useState } from "react"

interface SkillsFormProps {
  data: Skill[]
  onChange: (data: Skill[]) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")

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

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">Skills</h3>

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
