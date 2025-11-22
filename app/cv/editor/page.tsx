import { Suspense } from "react"
import { CoverLetterEditor } from "@/components/cv/CoverLetterEditor"
import { Loader2 } from "lucide-react"

export default function CvEditorPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <CoverLetterEditor />
    </Suspense>
  )
}
