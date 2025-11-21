import { ResumeEditor } from "@/components/editor/ResumeEditor"
import { Suspense } from "react"

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading editor...</div>}>
      <ResumeEditor />
    </Suspense>
  )
}
