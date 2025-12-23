"use client"
import { Home, Calendar, User } from "lucide-react"
import { usePathname } from "next/navigation"

export function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", href: "/dashboard/patient" },
    { icon: Calendar, label: "Schedule", href: "/book-appointment" },
    { icon: User, label: "Profile", href: "/profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center px-6 py-2 transition-colors ${
                  isActive ? "text-[#0ea5e9]" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? "fill-[#0ea5e9]/20" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
