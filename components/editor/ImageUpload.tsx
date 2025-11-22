"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB")
      return
    }

    setIsUploading(true)
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("resume-photos")
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage
        .from("resume-photos")
        .getPublicUrl(filePath)

      onChange(data.publicUrl)
      toast.success("Photo uploaded successfully")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">Profile Photo</label>
      
      {value ? (
        <div className="relative w-32 h-32">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-slate-200">
            <Image
              src={value}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <button
            onClick={onRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-sm hover:bg-red-600 transition-colors"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            {isUploading ? (
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            ) : (
              <>
                <ImageIcon className="h-8 w-8 text-slate-400 group-hover:text-blue-500 mb-2" />
                <span className="text-xs text-slate-500 group-hover:text-blue-600 font-medium">Upload Photo</span>
              </>
            )}
          </div>
          <div className="text-xs text-slate-500">
            <p>Supported formats: JPG, PNG</p>
            <p>Max size: 2MB</p>
          </div>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
        disabled={isUploading}
      />
    </div>
  )
}
