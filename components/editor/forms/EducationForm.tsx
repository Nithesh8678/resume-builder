"use client"

import { ResumeData, Education } from "@/types/resume"
import { Button } from "@/components/ui/Button"
import { Plus, Trash2 } from "lucide-react"

interface EducationFormProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const handleAdd = () => {
    onChange([
      ...data,
      {
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        current: false,
        location: "",
      },
    ])
  }

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: keyof Education, value: any) => {
    const newData = [...data]
    newData[index] = { ...newData[index], [field]: value }
    onChange(newData)
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
                placeholder="Bachelor's in Computer Science"
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
        </div>
      ))}
    </div>
  )
}
