"use client"
import { useState, useEffect, useRef } from "react"
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
import { ArrowLeft, Save, Download, Eye, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import Link from "next/link"

export function ResumeEditor() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "modern"
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResume)
  const [activeSection, setActiveSection] = useState("personal")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const resumePreviewRef = useRef<HTMLDivElement>(null)

  const Template = getTemplateById(templateId)?.component || getTemplateById("modern")!.component

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
            <h1 className="text-lg font-bold text-slate-900 ml-2">Untitled Resume</h1>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              Draft
            </span>
          </div>
          <div className="flex items-center gap-3">
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
                />
              )}
              {activeSection === "experience" && (
                <ExperienceForm 
                  data={resumeData.experience} 
                  onChange={(newData) => setResumeData({ ...resumeData, experience: newData })} 
                />
              )}
              {activeSection === "education" && (
                <EducationForm 
                  data={resumeData.education} 
                  onChange={(newData) => setResumeData({ ...resumeData, education: newData })} 
                />
              )}
              {activeSection === "skills" && (
                <SkillsForm 
                  data={resumeData.skills} 
                  onChange={(newData) => setResumeData({ ...resumeData, skills: newData })} 
                />
              )}
              {activeSection === "projects" && (
                <ProjectsForm 
                  data={resumeData.projects} 
                  onChange={(newData) => setResumeData({ ...resumeData, projects: newData })} 
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
