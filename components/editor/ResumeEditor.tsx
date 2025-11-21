"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ResumeData } from "@/types/resume"
import { sampleResume } from "@/data/sampleResume"
import { getTemplateById } from "@/lib/templates"
import { PersonalInfoForm } from "./forms/PersonalInfoForm"
import { ExperienceForm } from "./forms/ExperienceForm"
import { EducationForm } from "./forms/EducationForm"
import { SkillsForm } from "./forms/SkillsForm"
import { ProjectsForm } from "./forms/ProjectsForm"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Save, Download, Eye, PanelLeftClose, PanelLeftOpen, Loader2, Check, Pencil } from "lucide-react"
import Link from "next/link"
import { saveResume, fetchResume } from "@/lib/actions"

export function ResumeEditor() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const templateId = searchParams.get("template") || "modern"
  const paramResumeId = searchParams.get("id")
  
  const [resumeId, setResumeId] = useState<string | null>(paramResumeId)
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResume)
  const [resumeTitle, setResumeTitle] = useState("Untitled Resume")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [activeSection, setActiveSection] = useState("personal")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isCreatingSession, setIsCreatingSession] = useState(false)
  const [hasLoadError, setHasLoadError] = useState(false)

  const resumePreviewRef = useRef<HTMLDivElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const Template = getTemplateById(templateId)?.component || getTemplateById("modern")!.component

  // Focus input when editing starts
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [isEditingTitle])

  // Sync state with URL params
  useEffect(() => {
    if (paramResumeId && paramResumeId !== resumeId) {
      setResumeId(paramResumeId)
    }
  }, [paramResumeId])

  // Initialize Session: Fetch if ID exists, Create if not
  useEffect(() => {
    async function initializeSession() {
      if (resumeId) {
        // Fetch existing session
        try {
          setHasLoadError(false)
          const { data, error } = await fetchResume(resumeId)
          if (error) throw error
          if (data) {
            if (data.content) setResumeData(data.content as ResumeData)
            if (data.title) setResumeTitle(data.title)
          }
        } catch (error) {
          console.error("Error loading resume:", error)
          setHasLoadError(true)
        } finally {
          setIsInitialLoad(false)
        }
      } else if (isInitialLoad && !isCreatingSession) {
        // Create new session immediately
        setIsCreatingSession(true)
        try {
          // Create a new resume with sample data
          const result = await saveResume(sampleResume)
          if (result.id) {
            setResumeId(result.id)
            // Update URL immediately
            const params = new URLSearchParams(searchParams.toString())
            params.set("id", result.id)
            router.replace(`?${params.toString()}`, { scroll: false })
          }
        } catch (error) {
          console.error("Error creating session:", error)
          setHasLoadError(true)
        } finally {
          setIsCreatingSession(false)
          setIsInitialLoad(false)
        }
      }
    }
    
    initializeSession()
  }, [resumeId, isInitialLoad])

  // Auto-save functionality
  useEffect(() => {
    if (isInitialLoad || isCreatingSession || hasLoadError) return

    const timeoutId = setTimeout(async () => {
      setIsSaving(true)
      try {
        const result = await saveResume(resumeData, resumeId || undefined, resumeTitle)
        if (result.id && result.id !== resumeId) {
          // This case shouldn't happen often now as we have an ID, but good for safety
          setResumeId(result.id)
          const params = new URLSearchParams(searchParams.toString())
          params.set("id", result.id)
          router.replace(`?${params.toString()}`, { scroll: false })
        }
        setLastSaved(new Date())
      } catch (error) {
        console.error("Error auto-saving:", error)
      } finally {
        setIsSaving(false)
      }
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [resumeData, resumeId, resumeTitle, isInitialLoad, isCreatingSession, hasLoadError, searchParams, router])

  if (isInitialLoad || isCreatingSession) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="text-slate-500">Initializing Editor...</p>
        </div>
      </div>
    )
  }

  const handleManualSave = async () => {
    if (hasLoadError) return
    
    setIsSaving(true)
    try {
      const result = await saveResume(resumeData, resumeId || undefined, resumeTitle)
      if (result.id && result.id !== resumeId) {
        setResumeId(result.id)
        const params = new URLSearchParams(searchParams.toString())
        params.set("id", result.id)
        router.replace(`?${params.toString()}`, { scroll: false })
      }
      setLastSaved(new Date())
    } catch (error) {
      console.error("Error saving:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleTitleSubmit = () => {
    setIsEditingTitle(false)
    // Trigger save immediately when title changes
    handleManualSave()
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <div className="flex h-screen flex-col print:hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <Link href="/templates" className="text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-slate-500 hover:text-slate-900"
            >
              {isSidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
            </Button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 ml-2">
                {isEditingTitle ? (
                  <input
                    ref={titleInputRef}
                    type="text"
                    value={resumeTitle}
                    onChange={(e) => setResumeTitle(e.target.value)}
                    onBlur={handleTitleSubmit}
                    onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
                    className="text-lg font-bold text-slate-900 bg-transparent border-b border-blue-500 focus:outline-none px-1 min-w-[200px]"
                  />
                ) : (
                  <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingTitle(true)}>
                    <h1 className="text-lg font-bold text-slate-900 leading-tight hover:text-blue-600 transition-colors">
                      {resumeTitle}
                    </h1>
                    <Pencil className="h-3.5 w-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
              <div className="ml-2 flex items-center gap-2 text-xs text-slate-500">
                {isSaving ? (
                  <span className="flex items-center gap-1 text-blue-600">
                    <Loader2 className="h-3 w-3 animate-spin" /> Saving...
                  </span>
                ) : lastSaved ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <Check className="h-3 w-3" /> Saved
                  </span>
                ) : (
                  <span>Unsaved changes</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleManualSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => setIsPreviewOpen(true)}>
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handlePrint}>
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Navigation */}
          <div 
            className={`border-r border-slate-200 bg-white flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${
              isSidebarOpen ? "w-64 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <nav className="p-4 space-y-1 min-w-[16rem]">
              {[
                { id: "personal", label: "Personal Info" },
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Middle - Form Area */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
            <div className="max-w-2xl mx-auto">
              {activeSection === "personal" && (
                <PersonalInfoForm 
                  data={resumeData.personalInfo} 
                  onChange={(newData) => setResumeData({ ...resumeData, personalInfo: newData })} 
                  isAiEnabled={searchParams.get("mode") === "ai-assisted"}
                />
              )}
              {activeSection === "experience" && (
                <ExperienceForm 
                  data={resumeData.experience} 
                  onChange={(newData) => setResumeData({ ...resumeData, experience: newData })} 
                  isAiEnabled={searchParams.get("mode") === "ai-assisted"}
                />
              )}
              {activeSection === "education" && (
                <EducationForm 
                  data={resumeData.education} 
                  onChange={(newData) => setResumeData({ ...resumeData, education: newData })} 
                  isAiEnabled={searchParams.get("mode") === "ai-assisted"}
                />
              )}
              {activeSection === "skills" && (
                <SkillsForm 
                  data={resumeData.skills} 
                  onChange={(newData) => setResumeData({ ...resumeData, skills: newData })} 
                  isAiEnabled={searchParams.get("mode") === "ai-assisted"}
                />
              )}
              {activeSection === "projects" && (
                <ProjectsForm 
                  data={resumeData.projects} 
                  onChange={(newData) => setResumeData({ ...resumeData, projects: newData })} 
                  isAiEnabled={searchParams.get("mode") === "ai-assisted"}
                />
              )}
            </div>
          </div>

          {/* Right - Live Preview */}
          <div className="w-[50%] bg-slate-100 border-l border-slate-200 overflow-hidden flex flex-col">
            <div className="p-2 bg-white border-b border-slate-200 flex justify-between items-center text-xs text-slate-500 px-4">
              <span>Live Preview</span>
              <span>A4 - 100%</span>
            </div>
            <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-slate-200/50">
              <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl origin-top transform scale-[0.85] origin-top">
                <Template data={resumeData} />
              </div>
            </div>
          </div>
        </div>

        {/* Full Screen Preview Overlay */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/95 backdrop-blur-sm">
            <div className="flex items-center justify-between px-6 py-4 text-white">
              <h2 className="text-lg font-semibold">Resume Preview</h2>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10" 
                onClick={() => setIsPreviewOpen(false)}
              >
                Close Preview
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 flex justify-center">
              <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl">
                <Template data={resumeData} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Print Only Section */}
      <div className="hidden print:block print:absolute print:top-0 print:left-0 print:w-full print:bg-white">
        <style type="text/css" media="print">
          {`
            @page { size: auto; margin: 0mm; }
            body { margin: 0; padding: 0; }
          `}
        </style>
        <div style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}>
          <Template data={resumeData} />
        </div>
      </div>
    </>
  )
}
