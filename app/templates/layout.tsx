import { TemplateSidebar } from "@/components/templates/TemplateSidebar"

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <TemplateSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
