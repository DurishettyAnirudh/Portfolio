"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { getMessages, markMessageAsRead, deleteMessage, type ContactMessage } from "@/lib/admin-actions"
import {
  Mail,
  Calendar,
  User,
  MessageSquare,
  Search,
  BookMarkedIcon as MarkAsRead,
  Trash2,
  RefreshCw,
} from "lucide-react"

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const data = await getMessages()
      setMessages(data)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id: number) => {
    const success = await markMessageAsRead(id)
    if (success) {
      setMessages(messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)))
    }
  }

  const handleDeleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    const success = await deleteMessage(id)
    if (success) {
      setMessages(messages.filter((msg) => msg.id !== id))
      setSelectedMessage(null)
    }
  }

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const unreadCount = messages.filter((msg) => !msg.read).length

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">Manage contact form submissions</p>
        </div>
        <Button onClick={fetchMessages} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{messages.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Unread Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Read Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{messages.length - unreadCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Messages List */}
        <div>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No messages found</p>
                </CardContent>
              </Card>
            ) : (
              filteredMessages.map((message) => (
                <Card
                  key={message.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage?.id === message.id ? "ring-2 ring-emerald-500" : ""
                  } ${!message.read ? "border-l-4 border-l-emerald-500" : ""}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          {message.name}
                          {!message.read && <Badge className="ml-2 bg-emerald-100 text-emerald-800">New</Badge>}
                        </CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Mail className="h-4 w-4 mr-2" />
                          {message.email}
                        </CardDescription>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(message.created_at!).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-gray-900 mb-2">{message.subject}</p>
                    <p className="text-gray-600 text-sm line-clamp-2">{message.message}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div>
          {selectedMessage ? (
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedMessage.subject}</CardTitle>
                    <CardDescription className="mt-2">
                      From: {selectedMessage.name} ({selectedMessage.email})
                    </CardDescription>
                    <CardDescription>Sent: {new Date(selectedMessage.created_at!).toLocaleString()}</CardDescription>
                  </div>
                  {!selectedMessage.read && <Badge className="bg-emerald-100 text-emerald-800">Unread</Badge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex space-x-2">
                    {!selectedMessage.read && (
                      <Button
                        onClick={() => handleMarkAsRead(selectedMessage.id!)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <MarkAsRead className="h-4 w-4 mr-2" />
                        Mark as Read
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)
                      }
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply
                    </Button>

                    <Button variant="destructive" onClick={() => handleDeleteMessage(selectedMessage.id!)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>

                  {selectedMessage.read && (
                    <Alert>
                      <MarkAsRead className="h-4 w-4" />
                      <AlertDescription>This message has been marked as read.</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a message to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
