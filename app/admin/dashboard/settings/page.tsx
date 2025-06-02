"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Lock, Globe, CheckCircle } from "lucide-react"

export default function SettingsPage() {
  const [profileSaved, setProfileSaved] = useState(false)
  const [contactSaved, setContactSaved] = useState(false)
  const [securitySaved, setSecuritySaved] = useState(false)
  const [websiteSaved, setWebsiteSaved] = useState(false)

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate saving
    setTimeout(() => {
      setProfileSaved(true)
      setTimeout(() => setProfileSaved(false), 3000)
    }, 500)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate saving
    setTimeout(() => {
      setContactSaved(true)
      setTimeout(() => setContactSaved(false), 3000)
    }, 500)
  }

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate saving
    setTimeout(() => {
      setSecuritySaved(true)
      setTimeout(() => setSecuritySaved(false), 3000)
    }, 500)
  }

  const handleWebsiteSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate saving
    setTimeout(() => {
      setWebsiteSaved(true)
      setTimeout(() => setWebsiteSaved(false), 3000)
    }, 500)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and website settings</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Contact</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="website" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Website</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-gray-600" />
                Profile Settings
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                {profileSaved && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700">Profile settings saved successfully!</AlertDescription>
                  </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Durishetty Anirudh" />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" defaultValue="Data Science & AI Enthusiast | Backend Developer" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    defaultValue="Aspiring tech professional with expertise in Data Science, Machine Learning, Generative AI, and Web Development. Passionate about building AI-powered solutions and leveraging data for meaningful insights."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="Hyderabad, Telangana" />
                  </div>
                  <div>
                    <Label htmlFor="website">Personal Website</Label>
                    <Input id="website" type="url" placeholder="https://yourwebsite.com" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                    Save Profile Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-600" />
                Contact Settings
              </CardTitle>
              <CardDescription>Update your contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {contactSaved && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700">Contact settings saved successfully!</AlertDescription>
                  </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="anirudhdurishetty@gmail.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+91 9492557005" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input id="linkedin" placeholder="https://linkedin.com/in/yourusername" />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub Profile</Label>
                    <Input id="github" placeholder="https://github.com/yourusername" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="contactFormEnabled">Enable Contact Form</Label>
                    <Switch id="contactFormEnabled" defaultChecked />
                  </div>
                  <p className="text-sm text-gray-500">Allow visitors to contact you through the website form</p>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                    Save Contact Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-gray-600" />
                Security Settings
              </CardTitle>
              <CardDescription>Update your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSecuritySubmit} className="space-y-4">
                {securitySaved && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700">
                      Security settings saved successfully!
                    </AlertDescription>
                  </Alert>
                )}

                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-gray-900">Security Preferences</h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <Switch id="twoFactorAuth" />
                    </div>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="loginNotifications">Login Notifications</Label>
                      <Switch id="loginNotifications" defaultChecked />
                    </div>
                    <p className="text-sm text-gray-500">Receive email notifications for new login attempts</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                    Save Security Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Settings */}
        <TabsContent value="website">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-gray-600" />
                Website Settings
              </CardTitle>
              <CardDescription>Configure your portfolio website</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWebsiteSubmit} className="space-y-4">
                {websiteSaved && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700">Website settings saved successfully!</AlertDescription>
                  </Alert>
                )}

                <div>
                  <Label htmlFor="siteTitle">Website Title</Label>
                  <Input id="siteTitle" defaultValue="Durishetty Anirudh - Portfolio" />
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    rows={2}
                    defaultValue="Portfolio website of Durishetty Anirudh, showcasing skills in Data Science, AI, and Backend Development."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="primaryColor" defaultValue="#10b981" />
                      <div
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: "#10b981" }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="accentColor" defaultValue="#0d9488" />
                      <div
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: "#0d9488" }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-gray-900">Display Options</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showSkills">Show Skills Section</Label>
                        <Switch id="showSkills" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showProjects">Show Projects Section</Label>
                        <Switch id="showProjects" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showCertifications">Show Certifications Section</Label>
                        <Switch id="showCertifications" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showAchievements">Show Achievements Section</Label>
                        <Switch id="showAchievements" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                    Save Website Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
