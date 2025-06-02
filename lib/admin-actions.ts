"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Types for content management
export type Skill = {
  id?: number
  category: string
  skills: string[]
  icon: string
  created_at?: string
}

export type Project = {
  id?: number
  title: string
  date: string
  technologies: string[]
  description: string
  features: string[]
  link: string
  created_at?: string
}

export type Certification = {
  id?: number
  name: string
  issuer: string
  date: string
  created_at?: string
}

export type Achievement = {
  id?: number
  title: string
  description: string
  date: string
  icon: string
  created_at?: string
}

// Messages
export async function getMessages() {
  const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching messages:", error)
    return []
  }

  return data
}

export async function getMessage(id: number) {
  const { data, error } = await supabase.from("contact_messages").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching message:", error)
    return null
  }

  return data
}

export async function markMessageAsRead(id: number) {
  const { error } = await supabase.from("contact_messages").update({ read: true }).eq("id", id)

  if (error) {
    console.error("Error marking message as read:", error)
    return false
  }

  revalidatePath("/admin/dashboard/messages")
  return true
}

export async function deleteMessage(id: number) {
  const { error } = await supabase.from("contact_messages").delete().eq("id", id)

  if (error) {
    console.error("Error deleting message:", error)
    return false
  }

  revalidatePath("/admin/dashboard/messages")
  return true
}

// Skills
export async function getSkills() {
  // Check if skills table exists
  const { error: checkError } = await supabase.from("skills").select("id").limit(1)

  // Create table if it doesn't exist
  if (checkError && checkError.code === "42P01") {
    await supabase.rpc("create_skills_table")
  }

  const { data, error } = await supabase.from("skills").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching skills:", error)
    return []
  }

  return data
}

export async function addSkill(skill: Skill) {
  const { data, error } = await supabase.from("skills").insert([skill]).select()

  if (error) {
    console.error("Error adding skill:", error)
    return null
  }

  revalidatePath("/admin/dashboard/skills")
  return data[0]
}

export async function updateSkill(id: number, skill: Skill) {
  const { data, error } = await supabase.from("skills").update(skill).eq("id", id).select()

  if (error) {
    console.error("Error updating skill:", error)
    return null
  }

  revalidatePath("/admin/dashboard/skills")
  return data[0]
}

export async function deleteSkill(id: number) {
  const { error } = await supabase.from("skills").delete().eq("id", id)

  if (error) {
    console.error("Error deleting skill:", error)
    return false
  }

  revalidatePath("/admin/dashboard/skills")
  return true
}

// Projects
export async function getProjects() {
  // Check if projects table exists
  const { error: checkError } = await supabase.from("projects").select("id").limit(1)

  // Create table if it doesn't exist
  if (checkError && checkError.code === "42P01") {
    await supabase.rpc("create_projects_table")
  }

  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data
}

export async function addProject(project: Project) {
  const { data, error } = await supabase.from("projects").insert([project]).select()

  if (error) {
    console.error("Error adding project:", error)
    return null
  }

  revalidatePath("/admin/dashboard/projects")
  return data[0]
}

export async function updateProject(id: number, project: Project) {
  const { data, error } = await supabase.from("projects").update(project).eq("id", id).select()

  if (error) {
    console.error("Error updating project:", error)
    return null
  }

  revalidatePath("/admin/dashboard/projects")
  return data[0]
}

export async function deleteProject(id: number) {
  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    console.error("Error deleting project:", error)
    return false
  }

  revalidatePath("/admin/dashboard/projects")
  return true
}

// Certifications
export async function getCertifications() {
  // Check if certifications table exists
  const { error: checkError } = await supabase.from("certifications").select("id").limit(1)

  // Create table if it doesn't exist
  if (checkError && checkError.code === "42P01") {
    await supabase.rpc("create_certifications_table")
  }

  const { data, error } = await supabase.from("certifications").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching certifications:", error)
    return []
  }

  return data
}

export async function addCertification(certification: Certification) {
  const { data, error } = await supabase.from("certifications").insert([certification]).select()

  if (error) {
    console.error("Error adding certification:", error)
    return null
  }

  revalidatePath("/admin/dashboard/certifications")
  return data[0]
}

export async function updateCertification(id: number, certification: Certification) {
  const { data, error } = await supabase.from("certifications").update(certification).eq("id", id).select()

  if (error) {
    console.error("Error updating certification:", error)
    return null
  }

  revalidatePath("/admin/dashboard/certifications")
  return data[0]
}

export async function deleteCertification(id: number) {
  const { error } = await supabase.from("certifications").delete().eq("id", id)

  if (error) {
    console.error("Error deleting certification:", error)
    return false
  }

  revalidatePath("/admin/dashboard/certifications")
  return true
}

// Achievements
export async function getAchievements() {
  // Check if achievements table exists
  const { error: checkError } = await supabase.from("achievements").select("id").limit(1)

  // Create table if it doesn't exist
  if (checkError && checkError.code === "42P01") {
    await supabase.rpc("create_achievements_table")
  }

  const { data, error } = await supabase.from("achievements").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching achievements:", error)
    return []
  }

  return data
}

export async function addAchievement(achievement: Achievement) {
  const { data, error } = await supabase.from("achievements").insert([achievement]).select()

  if (error) {
    console.error("Error adding achievement:", error)
    return null
  }

  revalidatePath("/admin/dashboard/achievements")
  return data[0]
}

export async function updateAchievement(id: number, achievement: Achievement) {
  const { data, error } = await supabase.from("achievements").update(achievement).eq("id", id).select()

  if (error) {
    console.error("Error updating achievement:", error)
    return null
  }

  revalidatePath("/admin/dashboard/achievements")
  return data[0]
}

export async function deleteAchievement(id: number) {
  const { error } = await supabase.from("achievements").delete().eq("id", id)

  if (error) {
    console.error("Error deleting achievement:", error)
    return false
  }

  revalidatePath("/admin/dashboard/achievements")
  return true
}
