"use client"

import { StatusBar } from "@/components/status-bar"
import { RanchActivities } from "@/components/ranch-activities"
import { BottomNavigation } from "@/components/bottom-navigation"
import AuthGuard from "@/components/auth-guard"

export default function ActivitiesPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400">
        
        <RanchActivities />
        <BottomNavigation />
      </div>
    </AuthGuard>
  )
}
