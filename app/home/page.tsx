"use client"

import { StatusBar } from "@/components/status-bar"
import { Homepage } from "@/components/homepage"
import { BottomNavigation } from "@/components/bottom-navigation"
import AuthGuard from "@/components/auth-guard"

export default function HomePageRoute() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400">
        
        <Homepage />
        <BottomNavigation />
      </div>
    </AuthGuard>
  )
}
