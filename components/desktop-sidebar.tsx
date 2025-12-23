"use client"
import { Heart, LayoutDashboard, Users, FilePlus, Calendar, Settings, LogOut } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface DesktopSidebarProps {
  userRole?: "doctor" | "admin"
}

export function DesktopSidebar({ userRole = "doctor" }: DesktopSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const doctorNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/doctor/dashboard" },
    { icon: Users, label: "My Patients", href: "/doctor/dashboard" },
    { icon: FilePlus, label: "Add Record", href: "/doctor/add-record" },
  ]

  const adminNavItems = [
    { icon: Calendar, label: "Schedule Manager", href: "/admin/schedule-manager" },
    { icon: Users, label: "Manage Doctors", href: "/admin/doctors" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ]

  const navItems = userRole === "admin" ? adminNavItems : doctorNavItems

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen flex flex-col fixed left-0 top-0 bottom-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-[#0ea5e9] rounded-lg">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <span className="text-xl font-bold">e-Clinic</span>
            <p className="text-xs text-slate-400">{userRole === "admin" ? "Admin Panel" : "Doctor Portal"}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-[#0ea5e9] text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
