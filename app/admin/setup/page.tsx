"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { addSkill, addProject, addCertification, addAchievement } from "@/lib/admin-actions"
import { CheckCircle, Loader2, Database, AlertCircle } from "lucide-react"

// Initial data from the website
const initialSkills = [
  {
    category: "Programming Languages",
    skills: ["Python", "Java"],
    icon: "Code",
  },
  {
    category: "Web Development",
    skills: ["HTML", "CSS", "SpringBoot"],
    icon: "Code",
  },
  {
    category: "ML/Data Science",
    skills: ["numpy", "pandas", "scikit-learn", "matplotlib", "seaborn", "streamlit"],
    icon: "Brain",
  },
  {
    category: "Databases",
    skills: ["MySQL", "MongoDB"],
    icon: "Database",
  },
  {
    category: "Tools & Software",
    skills: ["Tableau", "Git", "Jupyter", "VS Code", "Eclipse", "IntelliJ IDEA"],
    icon: "Code",
  },
]

const initialProjects = [
  {
    title: "Intruder Alert System",
    date: "06/2024",
    technologies: ["Python", "OpenCV", "smtplib", "Windows Logs"],
    description:
      "Developed a Python-based security system that activates when Windows is locked, monitoring system logs for incorrect password attempts.",
    features: [
      "Automated alert system with email notifications",
      "Captures intruder images",
      "Enhanced personal security monitoring",
    ],
    link: "#",
  },
  {
    title: "AI powered Content Creation Bot",
    date: "11/2024",
    technologies: ["Python", "Streamlit", "EdgeTTS", "Whisper"],
    description:
      "Built an AI-powered bot that automates social media content generation by streamlining script writing, voiceovers, captioning, and video assembly.",
    features: [
      "ChatGPT integration for script generation",
      "EdgeTTS for voiceovers",
      "Whisper for captioning",
      "Fully automated workflow",
    ],
    link: "#",
  },
]

const initialCertifications = [
  {
    name: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
    issuer: "Oracle University",
    date: "07/2024",
  },
  {
    name: "Oracle Cloud Infrastructure 2024 Certified Data Science Professional",
    issuer: "Oracle University",
    date: "09/2024",
  },
  { name: "AWS Academy Machine Learning Foundations", issuer: "AWS Academy", date: "02/2025" },
  { name: "Data Fundamentals", issuer: "IBM SkillsBuild", date: "02/2025" },
  { name: "Prompt Design in Vertex AI Skill Badge", issuer: "Google Cloud", date: "10/2024" },
  { name: "Develop GenAI Apps with Gemini and Streamlit Skill Badge", issuer: "Google Cloud", date: "10/2024" },
  { name: "JobReady Employability Skills", issuer: "Wadhwani Foundation", date: "06/2024" },
  { name: "Cambridge English Empower Level C1 Course", issuer: "Cambridge", date: "09/2023" },
]

const initialAchievements = [
  {
    title: "Top 5% in Adobe GenSolve",
    description: "Ranked in the top 5% in Adobe GenSolve, hosted by Adobe and GeeksforGeeks, nationwide. (07/2024)",
    date: "07/2024",
    icon: "Star",
  },
  {
    title: "CTF Qualification",
    description: "Qualified for CTF round (Penetration testing) for Great AppSec Hackathon.",
    date: "05/2024",
    icon: "Award",
  },
  {
    title: "Student Coordinator",
    description: "Student Coordinator Avishkar 2023 Techno Fest. (01/2023)",
    date: "01/2023",
    icon: "GraduationCap",
  },
  {
    title: "Events Attended",
    description:
      "AIOUG OCYatra 2024 Hyderabad, Techo Workshop Series'24 – Level 1 organised by Techobytes Technologies in collaboration with IITH",
    date: "2024",
    icon: "Calendar",
  },
]

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{
    skills: "idle" | "loading" | "success" | "error"
    projects: "idle" | "loading" | "success" | "error"
    certifications: "idle" | "loading" | "success" | "error"
    achievements: "idle" | "loading" | "success" | "error"
  }>({
    skills: "idle",
    projects: "idle",
    certifications: "idle",
    achievements: "idle",
  })
  const [error, setError] = useState<string | null>(null)

  const migrateSkills = async () => {
    setStatus((prev) => ({ ...prev, skills: "loading" }))
    try {
      for (const skill of initialSkills) {
        await addSkill(skill)
      }
      setStatus((prev) => ({ ...prev, skills: "success" }))
    } catch (err) {
      console.error("Error migrating skills:", err)
      setStatus((prev) => ({ ...prev, skills: "error" }))
      setError("Failed to migrate skills. Check console for details.")
    }
  }

  const migrateProjects = async () => {
    setStatus((prev) => ({ ...prev, projects: "loading" }))
    try {
      for (const project of initialProjects) {
        await addProject(project)
      }
      setStatus((prev) => ({ ...prev, projects: "success" }))
    } catch (err) {
      console.error("Error migrating projects:", err)
      setStatus((prev) => ({ ...prev, projects: "error" }))
      setError("Failed to migrate projects. Check console for details.")
    }
  }

  const migrateCertifications = async () => {
    setStatus((prev) => ({ ...prev, certifications: "loading" }))
    try {
      for (const certification of initialCertifications) {
        await addCertification(certification)
      }
      setStatus((prev) => ({ ...prev, certifications: "success" }))
    } catch (err) {
      console.error("Error migrating certifications:", err)
      setStatus((prev) => ({ ...prev, certifications: "error" }))
      setError("Failed to migrate certifications. Check console for details.")
    }
  }

  const migrateAchievements = async () => {
    setStatus((prev) => ({ ...prev, achievements: "loading" }))
    try {
      for (const achievement of initialAchievements) {
        await addAchievement(achievement)
      }
      setStatus((prev) => ({ ...prev, achievements: "success" }))
    } catch (err) {
      console.error("Error migrating achievements:", err)
      setStatus((prev) => ({ ...prev, achievements: "error" }))
      setError("Failed to migrate achievements. Check console for details.")
    }
  }

  const migrateAll = async () => {
    setLoading(true)
    setError(null)
    try {
      await migrateSkills()
      await migrateProjects()
      await migrateCertifications()
      await migrateAchievements()
    } catch (err) {
      console.error("Error during migration:", err)
      setError("An error occurred during migration. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: "idle" | "loading" | "success" | "error") => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const allSuccess = Object.values(status).every((s) => s === "success")

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Database Setup</h1>
        <p className="text-gray-600 mt-2">Migrate your existing website content to the database</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2 text-blue-600" />
            Content Migration
          </CardTitle>
          <CardDescription>
            This will populate your database with the existing content from your website. You only need to do this once.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {allSuccess ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700">
                All content has been successfully migrated to the database! You can now manage your content from the
                dashboard.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Skills</h3>
                    <p className="text-sm text-gray-500">{initialSkills.length} items</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status.skills)}
                    <Button
                      size="sm"
                      onClick={migrateSkills}
                      disabled={loading || status.skills === "loading" || status.skills === "success"}
                    >
                      {status.skills === "loading" ? "Migrating..." : "Migrate"}
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Projects</h3>
                    <p className="text-sm text-gray-500">{initialProjects.length} items</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status.projects)}
                    <Button
                      size="sm"
                      onClick={migrateProjects}
                      disabled={loading || status.projects === "loading" || status.projects === "success"}
                    >
                      {status.projects === "loading" ? "Migrating..." : "Migrate"}
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Certifications</h3>
                    <p className="text-sm text-gray-500">{initialCertifications.length} items</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status.certifications)}
                    <Button
                      size="sm"
                      onClick={migrateCertifications}
                      disabled={loading || status.certifications === "loading" || status.certifications === "success"}
                    >
                      {status.certifications === "loading" ? "Migrating..." : "Migrate"}
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Achievements</h3>
                    <p className="text-sm text-gray-500">{initialAchievements.length} items</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status.achievements)}
                    <Button
                      size="sm"
                      onClick={migrateAchievements}
                      disabled={loading || status.achievements === "loading" || status.achievements === "success"}
                    >
                      {status.achievements === "loading" ? "Migrating..." : "Migrate"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={migrateAll}
                  disabled={loading || allSuccess}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Migrating All Content...
                    </>
                  ) : (
                    "Migrate All Content"
                  )}
                </Button>
              </div>
            </>
          )}

          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>
              After migration, go to the{" "}
              <a href="/admin/dashboard" className="text-blue-600 hover:underline">
                dashboard
              </a>{" "}
              to manage your content.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
