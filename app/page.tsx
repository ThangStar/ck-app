import { StatusBar } from "@/components/status-bar"
import { RanchDashboard } from "@/components/ranch-dashboard"
import { BottomNavigation } from "@/components/bottom-navigation"
import AuthGuard from "@/components/auth-guard"

export default function HomePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen relative overflow-hidden max-w-md mx-auto bg-white">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-12 h-12 md:w-16 md:h-16 bg-yellow-300 rounded-full"></div>
          <div className="absolute top-40 right-8 w-8 h-8 md:w-12 md:h-12 bg-orange-300 rounded-full"></div>
          <div className="absolute bottom-40 left-6 w-16 h-16 md:w-20 md:h-20 bg-yellow-200 rounded-full"></div>
          <div className="absolute bottom-60 right-12 w-10 h-10 md:w-14 md:h-14 bg-orange-200 rounded-full"></div>
        </div>

        <div className="relative z-10">
          <StatusBar />
          <RanchDashboard />
          <BottomNavigation />
        </div>
      </div>
    </AuthGuard>
  )
}
