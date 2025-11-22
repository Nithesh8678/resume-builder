"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { CoverLetterForm } from "./CoverLetterForm"
import { CoverLetterPreview } from "./CoverLetterPreview"
import { useReactToPrint } from "react-to-print"
import { Loader2, Save, Download, Wand2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { saveCoverLetter, fetchCoverLetter, fetchProfile, generateCoverLetterAI, fetchUserResumes, deleteCoverLetter } from "@/lib/actions"
import Link from "next/link"
import { ExitConfirmationModal } from "@/components/editor/ExitConfirmationModal"

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

export function CoverLetterEditor() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  
  const [data, setData] = useState<CoverLetterData>({
    jobTitle: "",
    companyName: "",
    hiringManager: "",
    body: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  })
  const [userData, setUserData] = useState<any>(null)
  const [resumes, setResumes] = useState<any[]>([])
  const [selectedResumeId, setSelectedResumeId] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  const [showAiModal, setShowAiModal] = useState(false)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [isDiscarding, setIsDiscarding] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${data.companyName || "Cover_Letter"} - ${data.fullName || "Candidate"}`,
  })

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [profile, userResumes] = await Promise.all([
          fetchProfile(),
          fetchUserResumes()
        ])
        setUserData(profile)
        setResumes(userResumes || [])
        if (userResumes && userResumes.length > 0) {
          setSelectedResumeId(userResumes[0].id)
        }

        if (id) {
          const doc = await fetchCoverLetter(id)
          if (doc) {
            setData(doc.content)
          }
        } else if (profile) {
          // Initialize with profile data for new cover letters
          setData(prev => ({
            ...prev,
            fullName: profile.full_name || "",
            email: profile.email || "",
            phone: profile.phone || "",
            address: profile.location || "",
          }))
        }
      } catch (error) {
        console.error(error)
        toast.error("Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }
    loadInitialData()
  }, [id])

  // Auto-save
  useEffect(() => {
    if (isLoading) return

    const timeoutId = setTimeout(async () => {
      if (data.companyName || data.jobTitle) { // Only auto-save if there's some content
        setIsSaving(true)
        try {
          const title = `${data.jobTitle || "Untitled"} @ ${data.companyName || "Unknown Company"}`
          const result = await saveCoverLetter(data, id || undefined, title)
          
          if (!id && result.id) {
            const params = new URLSearchParams(searchParams.toString())
            params.set("id", result.id)
            router.replace(`?${params.toString()}`, { scroll: false })
          }
          setLastSaved(new Date())
        } catch (error) {
          console.error("Auto-save error:", error)
        } finally {
          setIsSaving(false)
        }
      }
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [data, id, searchParams, router, isLoading])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const title = `${data.jobTitle || "Untitled"} @ ${data.companyName || "Unknown Company"}`
      const result = await saveCoverLetter(data, id || undefined, title)
      
      if (!id && result.id) {
        router.push(`/cv/editor?id=${result.id}`)
      }
      toast.success("Cover letter saved!")
      setLastSaved(new Date())
    } catch (error) {
      console.error(error)
      toast.error("Failed to save")
    } finally {
      setIsSaving(false)
    }
  }

  const handleExitSave = async () => {
    setIsSaving(true)
    try {
      const title = `${data.jobTitle || "Untitled"} @ ${data.companyName || "Unknown Company"}`
      await saveCoverLetter(data, id || undefined, title)
      router.push('/coverletter')
    } catch (error) {
      console.error("Error saving on exit:", error)
      setIsSaving(false)
    }
  }

  const handleExitDiscard = async () => {
    if (!id) {
      router.push('/coverletter')
      return
    }
    
    setIsDiscarding(true)
    try {
      await deleteCoverLetter(id)
      router.push('/coverletter')
    } catch (error) {
      console.error("Error discarding:", error)
      setIsDiscarding(false)
    }
  }

  const handleGenerate = async () => {
    if (!jobDescription) {
      toast.error("Please enter a job description")
      return
    }
    if (!selectedResumeId) {
      toast.error("Please select a resume for context")
      return
    }

    setIsGenerating(true)
    try {
      const generated = await generateCoverLetterAI(jobDescription, selectedResumeId)
      setData(prev => ({
        ...prev,
        ...generated,
      }))
      setShowAiModal(false)
      toast.success("Cover letter generated!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to generate content")
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setIsExitModalOpen(true)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold text-slate-900">
            {data.companyName ? `Cover Letter for ${data.companyName}` : "New Cover Letter"}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowAiModal(true)}
            className="hidden md:flex"
          >
            <Wand2 className="h-4 w-4 mr-2 text-purple-600" />
            AI Assistant
          </Button>
          
          <div className="h-6 w-px bg-slate-200 mx-2" />

          <Button variant="outline" onClick={handlePrint}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          
          <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column: Editor */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 w-fit">
              <button
                onClick={() => setActiveTab("write")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "write" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Write
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors lg:hidden ${
                  activeTab === "preview" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Preview
              </button>
            </div>

            {activeTab === "write" && (
              <>
                {/* AI Banner for Mobile */}
                <div className="md:hidden bg-purple-50 border border-purple-100 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-purple-900">Need help writing?</h3>
                    <p className="text-xs text-purple-700">Use AI to generate a draft.</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setShowAiModal(true)}>
                    <Wand2 className="h-4 w-4 mr-2" />
                    AI
                  </Button>
                </div>

                <CoverLetterForm data={data} onChange={setData} />
              </>
            )}
          </div>

          {/* Right Column: Preview (Hidden on mobile unless tab selected) */}
          <div className={`lg:block ${activeTab === "preview" ? "block" : "hidden"}`}>
            <div className="sticky top-24">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Live Preview</h2>
                <span className="text-xs text-slate-500">A4 Format</span>
              </div>
              <div className="border border-slate-200 shadow-xl rounded-sm overflow-hidden bg-slate-300/50 p-4 flex justify-center">
                <div className="transform scale-[0.6] origin-top lg:scale-[0.7] xl:scale-[0.8]">
                  <CoverLetterPreview ref={printRef} data={data} userData={userData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-purple-600" />
                AI Cover Letter Writer
              </h2>
              <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select Resume for Context
                </label>
                <select
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                >
                  {resumes.map(r => (
                    <option key={r.id} value={r.id}>{r.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md h-32 resize-none"
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating} 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" /> Generate Draft
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <ExitConfirmationModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onSave={handleExitSave}
        onDiscard={handleExitDiscard}
        isSaving={isSaving}
        isDiscarding={isDiscarding}
      />
    </div>
  )
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M9 9v4" />
      <path d="M20 14v4" />
    </svg>
  )
}
