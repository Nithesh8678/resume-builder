"use client"

import { Button } from "@/components/ui/Button"
import { Plus, FileText, Sparkles } from "lucide-react"

export default function CoverLetters() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cover Letters</h1>
          <p className="text-slate-600 mt-1">Create tailored cover letters for every job application.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200">
          <Plus className="w-4 h-4 mr-2" />
          New Cover Letter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Card */}
        <button className="group relative flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 transition-all hover:border-blue-500 hover:bg-blue-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-200 mb-4">
            <Plus className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-slate-900">Create New</h3>
          <p className="text-sm text-slate-500 mt-1">AI-powered generation</p>
        </button>

        {/* Example Cover Letter Card */}
        <div className="group relative flex h-64 flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Draft</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Software Engineer @ Google</h3>
            <p className="text-sm text-slate-500 line-clamp-2">
              Dear Hiring Manager, I am writing to express my strong interest in the Software Engineer position...
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400">Edited 2 days ago</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Sparkles className="w-4 h-4 text-blue-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
