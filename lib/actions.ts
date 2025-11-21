"use server"

import { createClient } from "@/utils/supabase/server"
import { ResumeData } from "@/types/resume"
import { revalidatePath } from "next/cache"

export async function saveResume(data: ResumeData, id?: string, title?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const resumePayload: any = {
    user_id: user.id,
    content: data,
    updated_at: new Date().toISOString(),
  }

  if (title) {
    resumePayload.title = title
  } else if (!id) {
    // Set default title only on creation if not provided
    resumePayload.title = data.personalInfo.fullName ? `${data.personalInfo.fullName}'s Resume` : "Untitled Resume"
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

export async function deleteResume(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { error } = await supabase
    .from("resumes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw error
  
  revalidatePath('/resume')
  return { success: true, error: null }
}

import { model } from "./gemini"

export async function generateAIContent(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return { text, error: null };
  } catch (error: any) {
    console.error("Error generating AI content:", error);
    return { text: null, error: error.message || "Failed to generate content" };
  }
}
