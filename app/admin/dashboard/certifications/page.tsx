"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
import {
  getCertifications,
  addCertification,
  updateCertification,
  deleteCertification,
  type Certification,
} from "@/lib/admin-actions"
import { Plus, Edit, Trash2, Award, RefreshCw } from "lucide-react"

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    date: "",
  })

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    setLoading(true)
    try {
      const data = await getCertifications()
      setCertifications(data)
    } catch (error) {
      console.error("Error fetching certifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const certificationData = {
      name: formData.name,
      issuer: formData.issuer,
      date: formData.date,
    }

    try {
      if (editingCertification) {
        await updateCertification(editingCertification.id!, certificationData)
      } else {
        await addCertification(certificationData)
      }

      await fetchCertifications()
      setIsDialogOpen(false)
      setEditingCertification(null)
      setFormData({
        name: "",
        issuer: "",
        date: "",
      })
    } catch (error) {
      console.error("Error saving certification:", error)
    }
  }

  const handleEdit = (certification: Certification) => {
    setEditingCertification(certification)
    setFormData({
      name: certification.name,
      issuer: certification.issuer,
      date: certification.date,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this certification?")) return

    try {
      await deleteCertification(id)
      await fetchCertifications()
    } catch (error) {
      console.error("Error deleting certification:", error)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-gray-600">Loading certifications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Certifications Management</h1>
          <p className="text-gray-600 mt-2">Manage your professional certifications and credentials</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCertification ? "Edit Certification" : "Add New Certification"}</DialogTitle>
              <DialogDescription>Add or update your professional certifications</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Certification Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., AWS Certified Solutions Architect"
                  required
                />
              </div>
              <div>
                <Label htmlFor="issuer">Issuing Organization</Label>
                <Input
                  id="issuer"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="e.g., Amazon Web Services"
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date Issued</Label>
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g., 06/2024"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                  {editingCertification ? "Update" : "Add"} Certification
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Certifications Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {certifications.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-12">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No certifications added yet</p>
              <p className="text-sm text-gray-500 mt-2">Add your first certification to get started</p>
            </CardContent>
          </Card>
        ) : (
          certifications.map((certification) => (
            <Card key={certification.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span className="text-lg leading-tight pr-4">{certification.name}</span>
                  <div className="p-2 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex-shrink-0">
                    <Award className="h-5 w-5 text-orange-600" />
                  </div>
                </CardTitle>
                <CardDescription>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-base">{certification.issuer}</span>
                    <Badge className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200">
                      {certification.date}
                    </Badge>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(certification)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(certification.id!)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
