import { Metadata } from "next"
import { fetchUserResumes } from "@/lib/actions"
import { AtsAnalyzer } from "@/components/ats/AtsAnalyzer"

export const metadata: Metadata = {
  title: "ATS Checker - Resume Builder",
  description: "Analyze your resume against job descriptions with AI.",
}

export default async function AtsCheckerPage() {
  const resumes = await fetchUserResumes()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Premium ATS Checker</h1>
        <p className="text-slate-500 mt-2">
          Optimize your resume for Applicant Tracking Systems. Get a match score and actionable feedback.
        </p>
      </div>

      <AtsAnalyzer resumes={resumes} />
    </div>
  )
}
