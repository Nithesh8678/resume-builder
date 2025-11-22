"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Loader2, AlertTriangle, CheckCircle, XCircle, Search, UploadCloud, FileText, Lock } from "lucide-react"
import { analyzeResumeWithATS } from "@/lib/actions"
import { ScoreChart } from "./ScoreChart"
import { toast } from "sonner"

interface Resume {
  id: string
  title: string
  updated_at: string
}

interface AtsResult {
  score: number
  summary: string
  missingKeywords: string[]
  criticalIssues: string[]
  improvements: string[]
}

export function AtsAnalyzer({ resumes }: { resumes: Resume[] }) {
  const [activeTab, setActiveTab] = useState<"select" | "upload">("select")
  const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]?.id || "")
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AtsResult | null>(null)

  const handleAnalyze = async () => {
    if (!selectedResumeId) {
      toast.error("Please select a resume")
      return
    }
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description")
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    try {
      const data = await analyzeResumeWithATS(selectedResumeId, jobDescription)
      setResult(data)
      toast.success("Analysis complete!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to analyze resume. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (resumes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
        <h3 className="text-lg font-medium text-slate-900">No Resumes Found</h3>
        <p className="text-slate-500 mt-2">Create a resume first to use the ATS Checker.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">1. Choose Resume</h2>
          
          {/* Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
            <button
              onClick={() => setActiveTab("select")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "select" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <FileText className="h-4 w-4" />
              Select Existing
            </button>
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md text-slate-400 cursor-not-allowed opacity-70"
            >
              <Lock className="h-3 w-3" />
              Upload PDF
              <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded-full text-slate-600 font-bold">Soon</span>
            </button>
          </div>

          <select
            value={selectedResumeId}
            onChange={(e) => setSelectedResumeId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.title} ({new Date(resume.updated_at).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">2. Job Description</h2>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="flex-1 w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing} 
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 h-12 text-lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" /> Analyze Match
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-7">
        {result ? (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Match Score</h2>
                <p className="text-slate-600 max-w-md">{result.summary}</p>
              </div>
              <ScoreChart score={result.score} />
            </div>

            {/* Missing Keywords */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Missing Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.map((keyword, i) => (
                  <span key={i} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100">
                    {keyword}
                  </span>
                ))}
                {result.missingKeywords.length === 0 && (
                  <p className="text-slate-500 italic">Great job! No major keywords missing.</p>
                )}
              </div>
            </div>

            {/* Critical Issues */}
            {result.criticalIssues.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Critical Issues
                </h3>
                <ul className="space-y-2">
                  {result.criticalIssues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Recommended Improvements
              </h3>
              <ul className="space-y-3">
                {result.improvements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="mt-0.5 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 border-dashed p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Ready to Analyze</h3>
            <p className="text-slate-500 max-w-md">
              Paste a job description and click analyze to see how well your resume matches the requirements.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
