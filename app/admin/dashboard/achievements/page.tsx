"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  getAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement,
  type Achievement,
} from "@/lib/admin-actions"
import { Plus, Edit, Trash2, Trophy, Star, Award, GraduationCap, Calendar, RefreshCw } from "lucide-react"

const iconOptions = [
  { value: "Trophy", label: "Trophy", icon: Trophy },
  { value: "Star", label: "Star", icon: Star },
  { value: "Award", label: "Award", icon: Award },
  { value: "GraduationCap", label: "Graduation Cap", icon: GraduationCap },
  { value: "Calendar", label: "Calendar", icon: Calendar },
]

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    icon: "Trophy",
  })

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    setLoading(true)
    try {
      const data = await getAchievements()
      setAchievements(data)
    } catch (error) {
      console.error("Error fetching achievements:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const achievementData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      icon: formData.icon,
    }

    try {
      if (editingAchievement) {
        await updateAchievement(editingAchievement.id!, achievementData)
      } else {
        await addAchievement(achievementData)
      }

      await fetchAchievements()
      setIsDialogOpen(false)
      setEditingAchievement(null)
      setFormData({
        title: "",
        description: "",
        date: "",
        icon: "Trophy",
      })
    } catch (error) {
      console.error("Error saving achievement:", error)
    }
  }

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement)
    setFormData({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      icon: achievement.icon,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return

    try {
      await deleteAchievement(id)
      await fetchAchievements()
    } catch (error) {
      console.error("Error deleting achievement:", error)
    }
  }

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find((opt) => opt.value === iconName)
    return iconOption ? iconOption.icon : Trophy
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-gray-600">Loading achievements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievements Management</h1>
          <p className="text-gray-600 mt-2">Manage your notable accomplishments and activities</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAchievement ? "Edit Achievement" : "Add New Achievement"}</DialogTitle>
              <DialogDescription>Add or update your notable accomplishments</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Achievement Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Top 5% in Adobe GenSolve"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your achievement..."
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g., 07/2024"
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
                <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700">
                  {editingAchievement ? "Update" : "Add"} Achievement
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {achievements.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-12">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No achievements added yet</p>
              <p className="text-sm text-gray-500 mt-2">Add your first achievement to get started</p>
            </CardContent>
          </Card>
        ) : (
          achievements.map((achievement) => {
            const IconComponent = getIcon(achievement.icon)
            return (
              <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="p-2 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg mr-3">
                      <IconComponent className="h-6 w-6 text-yellow-600" />
                    </div>
                    {achievement.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {achievement.date}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(achievement)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(achievement.id!)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
