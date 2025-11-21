import { ResumeData } from "@/types/resume"
import { Button } from "@/components/ui/Button"
import { Sparkles, Loader2 } from "lucide-react"
import { generateAIContent } from "@/lib/actions"
import { useState } from "react"
import { toast } from "sonner"

interface PersonalInfoFormProps {
  data: ResumeData["personalInfo"]
  onChange: (data: ResumeData["personalInfo"]) => void
  isAiEnabled?: boolean
}

export function PersonalInfoForm({ data, onChange, isAiEnabled }: PersonalInfoFormProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: value })
  }

  const handleAiGenerate = async () => {
    if (!data.jobTitle) {
      toast.error("Please enter a Job Title first")
      return
    }

    setIsGenerating(true)
    try {
      const userContext = data.summary 
        ? `Context/Keywords provided by user: "${data.summary}"` 
        : "No specific context provided.";

      const prompt = `Write a professional resume summary for a ${data.jobTitle}.
      ${userContext}
      
      Rules:
      1. Keep it concise (2-3 sentences).
      2. Highlight key strengths and career goals.
      3. Use professional tone.
      4. Return ONLY the summary text.`
      
      const { text, error } = await generateAIContent(prompt)
      
      if (error || !text) throw new Error(error || "No content generated")
      
      onChange({ ...data, summary: text })
      toast.success("Summary generated with AI")
    } catch (error) {
      console.error("AI Generation error:", error)
      toast.error("Failed to generate content")
    } finally {
      setIsGenerating(false)
    }
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
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-slate-700">Professional Summary</label>
          {isAiEnabled && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAiGenerate}
              disabled={isGenerating}
              className="h-6 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              {isGenerating ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : (
                <Sparkles className="h-3 w-3 mr-1" />
              )}
              <span className="text-xs font-medium">Generate Summary</span>
            </Button>
          )}
        </div>
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
