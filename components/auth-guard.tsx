"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { getUserProfile } from "@/lib/authSlice"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user, token } = useAppSelector((state) => state.auth)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const checkAuth = async () => {
      try {
        // Check if token exists in localStorage
        const storedToken = localStorage.getItem("token")

        if (!storedToken) {
          router.push("/login")
          return
        }

        // If we have a token but no user in Redux, fetch user profile
        if (storedToken && !user) {
          try {
            await dispatch(getUserProfile()).unwrap()
          } catch (error) {
            console.error("Failed to fetch user profile:", error)
            localStorage.removeItem("token")
            router.push("/login")
            return
          }
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("token")
        router.push("/login")
      }
    }

    checkAuth()
  }, [isClient, dispatch, router, user])

  // Don't render anything until we're on the client
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
          <p className="text-white font-medium">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
          <p className="text-white font-medium">Đang tải...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, redirect will happen in useEffect
  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
