"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  MessageSquare,
  Code,
  FolderOpen,
  Award,
  Trophy,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
  Database,
} from "lucide-react"

const navigationItems = [
  {
    title: "Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Setup",
    href: "/admin/setup",
    icon: Database,
    badge: "Setup",
  },
  {
    title: "Messages",
    href: "/admin/dashboard/messages",
    icon: MessageSquare,
    badge: "New",
  },
  {
    title: "Skills",
    href: "/admin/dashboard/skills",
    icon: Code,
  },
  {
    title: "Projects",
    href: "/admin/dashboard/projects",
    icon: FolderOpen,
  },
  {
    title: "Certifications",
    href: "/admin/dashboard/certifications",
    icon: Award,
  },
  {
    title: "Achievements",
    href: "/admin/dashboard/achievements",
    icon: Trophy,
  },
  {
    title: "Settings",
    href: "/admin/dashboard/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
                <p className="text-sm text-gray-500">Portfolio CMS</p>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-2">
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Profile */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-200">
            <Card className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                  AD
                </div>
                <div>
                  <p className="font-medium text-gray-900">Anirudh</p>
                  <p className="text-sm text-gray-500">Administrator</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-emerald-100 text-emerald-800 text-xs">{item.badge}</Badge>
                      )}
                    </>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start">
              <Home className="h-4 w-4 mr-2" />
              {!collapsed && "View Portfolio"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
