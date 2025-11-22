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
export async function analyzeResumeWithATS(resumeId: string, jobDescription: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  // Fetch resume
  const { data: resume, error } = await supabase
    .from("resumes")
    .select("content")
    .eq("id", resumeId)
    .eq("user_id", user.id)
    .single()

  if (error || !resume) throw new Error("Resume not found")

  const resumeContent = JSON.stringify(resume.content)

  const prompt = `
    Act as a premium Applicant Tracking System (ATS) and expert Resume Coach.
    
    Job Description:
    "${jobDescription}"

    Resume Data (JSON):
    ${resumeContent}

    Analyze the resume against the job description. 
    Return a JSON object with the following structure (and ONLY valid JSON):
    {
      "score": number, // 0-100 integer
      "summary": "string", // Brief overall assessment (2 sentences)
      "missingKeywords": ["string", "string"], // Top 5-10 important keywords missing from resume
      "criticalIssues": ["string"], // Formatting or major content issues (e.g. "Missing contact info", "Summary too long")
      "improvements": ["string"] // Specific actionable advice to increase the score
    }

    Scoring Criteria:
    - 90-100: Perfect match, highly likely to get interviewed.
    - 75-89: Good match, minor tweaks needed.
    - 50-74: Average, needs significant improvement.
    - <50: Poor match, rewrite required.

    Be strict but helpful. Focus on keyword matching, skills alignment, and relevance.
  `

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Clean up markdown code blocks if present
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim()
    
    return JSON.parse(jsonStr)
  } catch (error) {
    console.error("ATS Analysis Error:", error)
    throw new Error("Failed to analyze resume")
  }
}



export async function fetchUserCoverLetters() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from("cover_letters")
    .select("id, title, updated_at, content")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  if (error) throw error
  return data
}

export async function fetchCoverLetter(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const { data, error } = await supabase
    .from("cover_letters")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error) throw error
  return data
}

export async function saveCoverLetter(data: any, id?: string, title?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const payload: any = {
    user_id: user.id,
    content: data,
    updated_at: new Date().toISOString(),
  }

  if (title) payload.title = title

  if (id) {
    const { error } = await supabase
      .from("cover_letters")
      .update(payload)
      .eq("id", id)
      .eq("user_id", user.id)
    if (error) throw error
    return { id, error: null }
  } else {
    if (!title) payload.title = "Untitled Cover Letter"
    const { data: newDoc, error } = await supabase
      .from("cover_letters")
      .insert(payload)
      .select("id")
      .single()
    if (error) throw error
    return { id: newDoc.id, error: null }
  }
}

export async function deleteCoverLetter(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const { error } = await supabase
    .from("cover_letters")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw error
  revalidatePath("/coverletter")
  return { success: true }
}

export async function generateCoverLetterAI(jobDescription: string, resumeId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  // Fetch resume to get context
  const { data: resume } = await supabase
    .from("resumes")
    .select("content")
    .eq("id", resumeId)
    .single()

  if (!resume) throw new Error("Resume not found")

  const resumeContent = JSON.stringify(resume.content)

  const prompt = `
    Act as an expert career coach and professional writer.
    Write a compelling cover letter based on the following:

    Job Description:
    "${jobDescription}"

    Candidate's Resume Data:
    ${resumeContent}

    Requirements:
    1. Professional, engaging tone.
    2. Highlight relevant skills from the resume that match the JD.
    3. Structure:
       - Header (Candidate Info)
       - Salutation
       - Opening (Hook)
       - Body Paragraphs (Experience & Fit)
       - Closing (Call to Action)
       - Sign-off
    
    Return a JSON object with this structure:
    {
      "jobTitle": "Target Job Title",
      "companyName": "Target Company",
      "hiringManager": "Hiring Manager Name (or Hiring Team)",
      "body": "The full body of the letter (HTML formatted with <p> tags for paragraphs)"
    }
  `

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  } catch (error) {
    console.error("Cover Letter Generation Error:", error)
    throw new Error("Failed to generate cover letter")
  }
}
