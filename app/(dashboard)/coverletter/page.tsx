"use client"

import { Button } from "@/components/ui/Button"
import { Plus, FileText, Sparkles, Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchUserCoverLetters, deleteCoverLetter } from "@/lib/actions"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function CoverLetters() {
  const [letters, setLetters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserCoverLetters()
        setLetters(data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm("Are you sure you want to delete this cover letter?")) return

    try {
      await deleteCoverLetter(id)
      setLetters(letters.filter(l => l.id !== id))
      toast.success("Deleted successfully")
    } catch (error) {
      toast.error("Failed to delete")
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cover Letters</h1>
          <p className="text-slate-600 mt-1">Create tailored cover letters for every job application.</p>
        </div>
        <Link href="/cv/editor">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200">
            <Plus className="w-4 h-4 mr-2" />
            New Cover Letter
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Card */}
          <Link href="/cv/editor">
            <button className="w-full group relative flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 transition-all hover:border-blue-500 hover:bg-blue-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-200 mb-4">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900">Create New</h3>
              <p className="text-sm text-slate-500 mt-1">AI-powered generation</p>
            </button>
          </Link>

          {/* List Items */}
          {letters.map((letter) => (
            <Link key={letter.id} href={`/cv/editor?id=${letter.id}`}>
              <div className="group relative flex h-64 flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-200 cursor-pointer">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-slate-400 hover:text-red-600"
                        onClick={(e) => handleDelete(letter.id, e)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">
                    {letter.title || "Untitled Cover Letter"}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-3">
                    {letter.content?.body?.replace(/<[^>]*>/g, '') || "No content..."}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400">
                    {formatDistanceToNow(new Date(letter.updated_at), { addSuffix: true })}
                  </span>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full group-hover:bg-blue-100 transition-colors">
                    Edit
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
