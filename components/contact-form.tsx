"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Send, CheckCircle, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/lib/contact-actions"

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const response = await submitContactForm(formData)
      setResult(response)

      if (response.success) {
        // Reset form on success
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      }
    })
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Send Me a Message
        </CardTitle>
        <p className="text-gray-600 mt-2">I'd love to hear from you. Let's start a conversation!</p>
      </CardHeader>
      <CardContent>
        <form id="contact-form" action={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your.email@example.com"
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
                disabled={isPending}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
              Subject *
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="What's this about?"
              className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Tell me about your project, opportunity, or just say hello!"
              rows={6}
              className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-colors resize-none"
              disabled={isPending}
            />
          </div>

          {result && (
            <Alert className={result.success ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}>
              {result.success ? (
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={result.success ? "text-emerald-800" : "text-red-800"}>
                {result.success ? result.message : result.error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
