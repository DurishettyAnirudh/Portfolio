"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSkills, addSkill, updateSkill, deleteSkill, type Skill } from "@/lib/admin-actions"
import { Plus, Edit, Trash2, Code, Database, Brain, RefreshCw } from "lucide-react"

const iconOptions = [
  { value: "Code", label: "Code", icon: Code },
  { value: "Database", label: "Database", icon: Database },
  { value: "Brain", label: "Brain", icon: Brain },
]

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [formData, setFormData] = useState({
    category: "",
    skills: "",
    icon: "Code",
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    setLoading(true)
    try {
      const data = await getSkills()
      setSkills(data)
    } catch (error) {
      console.error("Error fetching skills:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s)

    const skillData = {
      category: formData.category,
      skills: skillsArray,
      icon: formData.icon,
    }

    try {
      if (editingSkill) {
        await updateSkill(editingSkill.id!, skillData)
      } else {
        await addSkill(skillData)
      }

      await fetchSkills()
      setIsDialogOpen(false)
      setEditingSkill(null)
      setFormData({ category: "", skills: "", icon: "Code" })
    } catch (error) {
      console.error("Error saving skill:", error)
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      category: skill.category,
      skills: skill.skills.join(", "),
      icon: skill.icon,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill category?")) return

    try {
      await deleteSkill(id)
      await fetchSkills()
    } catch (error) {
      console.error("Error deleting skill:", error)
    }
  }

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find((opt) => opt.value === iconName)
    return iconOption ? iconOption.icon : Code
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-gray-600">Loading skills...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Skills Management</h1>
          <p className="text-gray-600 mt-2">Manage your technical skills and expertise</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill Category" : "Add New Skill Category"}</DialogTitle>
              <DialogDescription>Create a new skill category with multiple skills</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="category">Category Name</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Programming Languages"
                  required
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g., Python, Java, JavaScript"
                  required
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => {
                      const Icon = option.icon
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            <Icon className="h-4 w-4 mr-2" />
                            {option.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                  {editingSkill ? "Update" : "Add"} Skill Category
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-12">
              <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No skills added yet</p>
              <p className="text-sm text-gray-500 mt-2">Add your first skill category to get started</p>
            </CardContent>
          </Card>
        ) : (
          skills.map((skill) => {
            const IconComponent = getIcon(skill.icon)
            return (
              <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mr-3">
                        <IconComponent className="h-6 w-6 text-emerald-600" />
                      </div>
                      {skill.category}
                    </CardTitle>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(skill)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(skill.id!)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((skillName, index) => (
                      <Badge key={index} variant="outline" className="bg-white border-emerald-200 text-emerald-700">
                        {skillName}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    {skill.skills.length} skill{skill.skills.length !== 1 ? "s" : ""}
                  </p>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
