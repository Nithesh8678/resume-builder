"use client"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchUserResumes, deleteResume } from "@/lib/actions"
import { Loader2, FileText, Trash2, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { ConfirmModal } from "@/components/ui/ConfirmModal"

export default function ResumePage() {
  const [resumes, setResumes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const data = await fetchUserResumes()
        setResumes(data || [])
      } catch (error) {
        console.error("Error loading resumes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadResumes()
  }, [])

  const handleEdit = (id: string) => {
    const resume = resumes.find(r => r.id === id)
    const mode = resume?.mode || "manual"
    router.push(`/editor?id=${id}&mode=${mode}`)
  }

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setDeleteId(id)
  }

  const handleConfirmDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      await deleteResume(deleteId)
      setResumes(resumes.filter(r => r.id !== deleteId))
      toast.success("Resume deleted successfully")
    } catch (error) {
      console.error("Error deleting resume:", error)
      toast.error("Failed to delete resume")
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Resumes</h1>
          <p className="text-slate-500 mt-1">Manage and organize your professional documents.</p>
        </div>
        <Link href="/templates">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Resume
          </Button>
        </Link>
      </div>

      {/* Profile Completeness Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-black/10 blur-2xl" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white/90">Profile Completeness</h3>
            <p className="mt-1 text-sm text-blue-100">Complete your profile to unlock all features.</p>
          </div>
          <span className="text-2xl font-bold">50%</span>
        </div>
        
        <div className="relative z-10 mt-6 h-2 w-full overflow-hidden rounded-full bg-black/20">
          <div className="h-full w-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        </div>
      </div>

      {/* Recent Projects List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="font-semibold text-slate-900">Recent Projects</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-100 p-4 mb-4">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No resumes yet</h3>
            <p className="text-slate-500 mt-1 mb-6 max-w-sm">Create your first resume to start building your professional profile.</p>
            <Link href="/templates">
              <Button variant="outline">Create Resume</Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {resumes.map((resume) => (
              <div key={resume.id} className="group flex items-center justify-between p-4 transition-all hover:bg-slate-50">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleEdit(resume.id)}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {resume.title || "Untitled Resume"}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span>Edited {formatDistanceToNow(new Date(resume.updated_at), { addSuffix: true })}</span>
                      <span>•</span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700 font-medium">Ready</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600"
                    onClick={(e) => { e.stopPropagation(); handleEdit(resume.id); }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                    onClick={(e) => handleDeleteClick(resume.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Resume"
        description="Are you sure you want to delete this resume? This action cannot be undone and you will lose all your data."
        isLoading={isDeleting}
      />
    </div>
  );
}
