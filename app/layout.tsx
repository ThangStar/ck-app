import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import ReduxProvider from "@/components/redux-provider"
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
        <ReduxProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  )
}
