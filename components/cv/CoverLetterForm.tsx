"use client"

import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"

interface CoverLetterData {
  jobTitle: string
  companyName: string
  hiringManager: string
  body: string
  fullName: string
  email: string
  phone: string
  address: string
}

interface CoverLetterFormProps {
  data: CoverLetterData
  onChange: (data: CoverLetterData) => void
}

export function CoverLetterForm({ data, onChange }: CoverLetterFormProps) {
  const handleChange = (field: keyof CoverLetterData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      {/* Personal Details Section */}
      <div className="space-y-4 border-b border-slate-100 pb-6">
        <h3 className="font-medium text-slate-900">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("fullName", e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={data.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("phone", e.target.value)}
              placeholder="+1 234 567 890"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={data.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("address", e.target.value)}
              placeholder="City, Country"
            />
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="space-y-4">
        <h3 className="font-medium text-slate-900">Job Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Target Job Title</Label>
            <Input
              id="jobTitle"
              value={data.jobTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("jobTitle", e.target.value)}
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={data.companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("companyName", e.target.value)}
              placeholder="e.g. Acme Corp"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hiringManager">Hiring Manager / Recipient</Label>
          <Input
            id="hiringManager"
            value={data.hiringManager}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("hiringManager", e.target.value)}
            placeholder="e.g. Jane Doe or Hiring Team"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Letter Body</Label>
        <Textarea
          id="body"
          value={data.body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("body", e.target.value)}
          placeholder="Write your cover letter here..."
          className="min-h-[400px] font-serif text-lg leading-relaxed p-6"
        />
        <p className="text-xs text-slate-500">
          Tip: Use the AI generator to create a draft, then refine it here.
        </p>
      </div>
    </div>
  )
}
