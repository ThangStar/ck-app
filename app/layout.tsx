import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import ReduxProvider from "@/components/redux-provider"
import ClientOnly from "@/components/client-only"
import "./globals.css"

export const metadata: Metadata = {
  title: "Saputo Ranch",
  description: "Vietnamese Cattle Ranch Investment App",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400 min-h-screen`}
      >
        <ClientOnly
          fallback={
            <div className="min-h-screen bg-gradient-to-b from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-white font-medium">Đang tải...</p>
              </div>
            </div>
          }
        >
          <ReduxProvider>{children}</ReduxProvider>
        </ClientOnly>
        <Analytics />
      </body>
    </html>
  )
}
