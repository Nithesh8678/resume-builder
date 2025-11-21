export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full overflow-hidden bg-slate-100">
      {children}
    </div>
  )
}
