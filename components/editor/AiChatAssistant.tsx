"use client"

import { useState, useRef, useEffect } from "react"
import { ResumeData } from "@/types/resume"
import { Button } from "@/components/ui/Button"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { chatWithResumeAI } from "@/lib/actions"
import { toast } from "sonner"

interface AiChatAssistantProps {
  data: ResumeData
  onUpdate: (data: ResumeData) => void
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AiChatAssistant({ data, onUpdate }: AiChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI Resume Consultant. Tell me about yourself, your experience, or your skills, and I'll build your resume for you." }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      // Pass current history + new message
      const currentHistory: { role: "user" | "assistant", content: string }[] = [...messages, { role: "user", content: userMessage }]
      const { message, data: updateData, error } = await chatWithResumeAI(currentHistory, data)

      if (error) throw new Error(error)

      if (updateData) {
        // Merge logic: This is a simple merge. 
        // For arrays, we might want to be smarter, but for now let's trust the AI's "partial update" 
        // or assume the AI sends the *complete* section if it modifies an array.
        // A safer approach for arrays is to let the AI send the whole array.
        
        // Deep merge or spread? 
        // If AI sends { personalInfo: { ... } }, we merge it.
        // If AI sends { experience: [...] }, we replace the array (assuming AI sends full list or we append).
        // Let's assume AI sends the *updated fields*.
        
        const newData = { ...data, ...updateData }
        
        // Special handling for nested objects if needed, but shallow merge of top-level keys works 
        // if AI sends full objects for those keys.
        // Let's do a slightly deeper merge for personalInfo
        if (updateData.personalInfo) {
            newData.personalInfo = { ...data.personalInfo, ...updateData.personalInfo }
        }

        onUpdate(newData)
        toast.success("Resume updated!")
      }

      setMessages(prev => [...prev, { role: "assistant", content: message || "Resume updated." }])

    } catch (error) {
      console.error("Chat Error:", error)
      toast.error("Failed to get AI response")
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-2 shadow-sm">
        <div className="bg-blue-100 p-2 rounded-full">
          <Bot className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="font-semibold text-slate-900">AI Consultant</h2>
          <p className="text-xs text-slate-500">Full AI Build Mode</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "user" ? "bg-slate-900 text-white" : "bg-blue-100 text-blue-600"
              }`}
            >
              {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-slate-900 text-white rounded-tr-none"
                  : "bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-lg rounded-tl-none shadow-sm">
              <span className="text-slate-400 text-sm">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your details here..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading}
            className="rounded-full w-10 h-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
