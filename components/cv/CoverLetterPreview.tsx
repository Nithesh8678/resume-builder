"use client"

import { forwardRef } from "react"

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

interface CoverLetterPreviewProps {
  data: CoverLetterData
  userData?: any // Kept for backward compatibility if needed, but unused
}

export const CoverLetterPreview = forwardRef<HTMLDivElement, CoverLetterPreviewProps>(
  ({ data }, ref) => {
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    return (
      <div ref={ref} className="bg-white w-[210mm] min-h-[297mm] p-[25mm] mx-auto shadow-lg text-slate-900">
        {/* Header */}
        <div className="mb-8 border-b border-slate-900 pb-6">
          <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
            {data.fullName || "Your Name"}
          </h1>
          <div className="text-sm text-slate-600 flex flex-wrap gap-4">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>• {data.phone}</span>}
            {data.address && <span>• {data.address}</span>}
          </div>
        </div>

        {/* Date & Recipient */}
        <div className="mb-8 text-sm">
          <p className="mb-6">{today}</p>
          
          <div className="space-y-1">
            <p className="font-bold">{data.hiringManager || "Hiring Manager"}</p>
            <p>{data.companyName || "Company Name"}</p>
            {/* Address placeholder if we had it */}
          </div>
        </div>

        {/* Body */}
        <div className=" max-w-none font-serif text-[11pt] leading-relaxed text-justify">
          <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </div>

        {/* Sign-off */}
        <div className="mt-12">
          <p className="mb-4">Sincerely,</p>
          <p className="font-bold text-lg">{data.fullName || "Your Name"}</p>
        </div>
      </div>
    )
  }
)

CoverLetterPreview.displayName = "CoverLetterPreview"
