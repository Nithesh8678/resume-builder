"use client"

import { ResumeData } from "@/types/resume"

interface PersonalInfoFormProps {
  data: ResumeData["personalInfo"]
  onChange: (data: ResumeData["personalInfo"]) => void
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={data.jobTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Software Engineer"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Location</label>
          <input
            type="text"
            name="location"
            value={data.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="City, Country"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">LinkedIn (Optional)</label>
          <input
            type="text"
            name="linkedin"
            value={data.linkedin || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Professional Summary</label>
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Briefly describe your professional background and goals..."
        />
      </div>
    </div>
  )
}
