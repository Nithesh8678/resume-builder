"use client"

import { Button } from "@/components/ui/Button"
import { useState } from "react"
import { ResumeBuilderModal } from "@/components/dashboard/ResumeBuilderModal"

export default function ResumePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Resumes</h1>
          <p className="text-slate-500 mt-1">Manage and organize your professional documents.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Resume
        </Button>
      </div>

      <ResumeBuilderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
        <div className="divide-y divide-slate-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group flex items-center justify-between p-4 transition-all hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Software Engineer Resume {i}</h4>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <span>Edited 2 days ago</span>
                    <span>•</span>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700 font-medium">Ready</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
