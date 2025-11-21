"use server"

import { createClient } from "@/utils/supabase/server"
import { ResumeData } from "@/types/resume"
import { revalidatePath } from "next/cache"

export async function saveResume(data: ResumeData, id?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const resumePayload = {
    user_id: user.id,
    content: data,
    title: data.personalInfo.fullName ? `${data.personalInfo.fullName}'s Resume` : "Untitled Resume",
    updated_at: new Date().toISOString(),
  }

  if (id) {
    // Update existing resume
    const { error } = await supabase
      .from("resumes")
      .update(resumePayload)
      .eq("id", id)
      .eq("user_id", user.id)

    if (error) throw error
    return { id, error: null }
  } else {
    // Create new resume
    const { data: newResume, error } = await supabase
      .from("resumes")
      .insert(resumePayload)
      .select("id")
      .single()

    if (error) throw error
    return { id: newResume.id, error: null }
  }
}

export async function fetchResume(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error) throw error
  return { data, error: null }
}

export async function fetchUserResumes() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from("resumes")
    .select("id, title, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  if (error) throw error
  return data
}
