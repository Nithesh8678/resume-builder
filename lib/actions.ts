"use server"

import { createClient } from "@/utils/supabase/server"
import { ResumeData } from "@/types/resume"
import { revalidatePath } from "next/cache"
import { model } from "./gemini"

export async function saveResume(data: ResumeData, id?: string, title?: string, mode?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const resumePayload: Record<string, unknown> = {
    user_id: user.id,
    content: data as unknown as Record<string, unknown>,
    updated_at: new Date().toISOString(),
  }

  if (mode) {
    resumePayload.mode = mode
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
    .select("id, title, updated_at, mode")
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

export async function generateAIContent(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return { text, error: null };
  } catch (error: unknown) {
    console.error("Error generating AI content:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate content";
    return { text: null, error: errorMessage };
  }
}

export async function chatWithResumeAI(messages: { role: "user" | "assistant", content: string }[], currentData: ResumeData) {
  try {
    const systemPrompt = `You are an expert resume consultant. Your goal is to help the user build a professional resume.
    You have access to the current resume data JSON.
    
    When the user provides information, you should:
    1. Analyze it and extract relevant resume details.
    2. Return a JSON object with the *updated* fields for the resume data.
    3. Also return a helpful message to the user confirming what you updated or asking for more info.
    
    Current Resume Data:
    ${JSON.stringify(currentData, null, 2)}
    
    Output Format:
    Return a JSON object with this structure:
    {
      "message": "Your response to the user",
      "data": { ...partial update for resume data... }
    }
    
    If the user just says "hi" or asks a question without providing data, return null for "data".
    Ensure the "data" matches the ResumeData structure.
    `

    // Ensure history starts with user message
    let historyMessages = messages.slice(0, -1);
    const firstUserIndex = historyMessages.findIndex(m => m.role === 'user');
    
    if (firstUserIndex !== -1) {
      historyMessages = historyMessages.slice(firstUserIndex);
    } else {
      historyMessages = [];
    }

    const chatHistory = historyMessages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
    }));

    const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
            responseMimeType: "application/json"
        }
    })

    const lastMessage = messages[messages.length - 1].content
    const result = await chat.sendMessage(systemPrompt + "\n\nUser: " + lastMessage)
    const responseText = result.response.text()
    
    const response = JSON.parse(responseText)
    
    return { message: response.message, data: response.data, error: null }

  } catch (error: unknown) {
    console.error("Error in chatWithResumeAI:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to process request";
    return { message: null, data: null, error: errorMessage }
  }
}
export async function fetchProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    console.error("Error fetching profile:", error)
  }

  return data
}

export async function updateProfile(data: any) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  // Upsert profile
  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      ...data,
      updated_at: new Date().toISOString(),
    })

  if (error) throw error
  revalidatePath("/profile")
  return { success: true }
}

export async function updatePassword(password: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) throw error
  return { success: true }
}
