"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setCredentials } from "@/lib/authSlice"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token")

        if (!token) {
          router.push("/login")
          return
        }

        // If we have a token but no user in Redux, restore the session
        if (token && !user) {
          // In a real app, you would validate the token with the server
          // For now, we'll use mock data
          const mockUser = {
            id: "1",
            email: "demo@saputoranch.com",
            name: "Nguyễn Văn A",
            phone: "0123456789",
            balance: 50000000,
          }

          dispatch(setCredentials({ user: mockUser, token }))
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("token")
        router.push("/login")
      }
    }

    checkAuth()
  }, [dispatch, router, user])

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
