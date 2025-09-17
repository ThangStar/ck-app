"use client"

import { Home, Cog as Cow, TrendingUp, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { id: "home", label: "TRANG CHỦ", icon: Home, path: "/home" },
    { id: "service", label: "DỊCH VỤ", icon: Cow, path: "/activities" },
    { id: "ranch", label: "QUỶ RANCH", icon: TrendingUp, path: "/" },
    { id: "profile", label: "CỦA TÔI", icon: User, path: "/profile" },
  ]

  const handleTabClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex max-w-4xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.path

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.path)}
              className={`flex-1 py-2 sm:py-3 px-1 sm:px-2 flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-emerald-600" : "text-gray-500"
              }`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs sm:text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
      <div className="h-1 bg-black mx-auto w-24 sm:w-32 rounded-full mt-1 sm:mt-2"></div>
    </div>
  )
}
