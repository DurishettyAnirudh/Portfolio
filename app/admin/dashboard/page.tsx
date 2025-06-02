import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMessages, getSkills, getProjects, getCertifications, getAchievements } from "@/lib/admin-actions"
import { MessageSquare, Code, FolderOpen, Award, Trophy, TrendingUp, Eye } from "lucide-react"

export default async function AdminDashboard() {
  const [messages, skills, projects, certifications, achievements] = await Promise.all([
    getMessages(),
    getSkills(),
    getProjects(),
    getCertifications(),
    getAchievements(),
  ])

  const unreadMessages = messages.filter((msg) => !msg.read).length
  const totalMessages = messages.length

  const stats = [
    {
      title: "Total Messages",
      value: totalMessages,
      description: `${unreadMessages} unread`,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Skills",
      value: skills.length,
      description: "Technical skills",
      icon: Code,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Projects",
      value: projects.length,
      description: "Portfolio projects",
      icon: FolderOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Certifications",
      value: certifications.length,
      description: "Professional certs",
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const recentMessages = messages.slice(0, 5)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Manage your portfolio content and messages</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
              Recent Messages
            </CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentMessages.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No messages yet</p>
            ) : (
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 truncate">{message.name}</p>
                        {!message.read && <Badge className="bg-blue-100 text-blue-800 text-xs">New</Badge>}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{message.subject}</p>
                      <p className="text-xs text-gray-500">{new Date(message.created_at!).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <h4 className="font-medium text-emerald-900">Add New Skill</h4>
                <p className="text-sm text-emerald-700">Update your technical skills</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900">Create Project</h4>
                <p className="text-sm text-purple-700">Showcase your latest work</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-900">Add Certification</h4>
                <p className="text-sm text-orange-700">Display new credentials</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900">View Messages</h4>
                <p className="text-sm text-blue-700">Respond to inquiries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2 text-gray-600" />
            Content Summary
          </CardTitle>
          <CardDescription>Overview of your portfolio content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <Code className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-emerald-900">{skills.length} Skills</p>
              <p className="text-sm text-emerald-700">Technical expertise</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <FolderOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-purple-900">{projects.length} Projects</p>
              <p className="text-sm text-purple-700">Portfolio showcase</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="font-semibold text-orange-900">{certifications.length} Certifications</p>
              <p className="text-sm text-orange-700">Professional credentials</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="font-semibold text-yellow-900">{achievements.length} Achievements</p>
              <p className="text-sm text-yellow-700">Notable accomplishments</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
