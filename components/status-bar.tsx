"use client"

import { Wifi, Signal, Battery } from "lucide-react"
import { useAppSelector } from "@/lib/hooks"

export function StatusBar() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <div className="flex justify-between items-center px-6 py-3 text-white bg-black/10 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="text-lg font-medium">14:27</div>
        {user && <div className="text-sm text-emerald-100">Xin chào, {user.name?.split(" ")[0] || "Bạn"}</div>}
      </div>
      <div className="flex items-center gap-1">
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <Wifi className="w-4 h-4" />
        <Signal className="w-4 h-4" />
        <div className="flex items-center gap-1">
          <Battery className="w-5 h-5" />
          <span className="text-sm font-medium">62</span>
        </div>
      </div>
    </div>
  )
}
