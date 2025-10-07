"use client"

import { StatusBar } from "@/components/status-bar"
import { UserProfile } from "@/components/user-profile"
import { BottomNavigation } from "@/components/bottom-navigation"
import AuthGuard from "@/components/auth-guard"

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400">
        
        <UserProfile />
        <BottomNavigation />
      </div>
    </AuthGuard>
  )
}
