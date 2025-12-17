import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"   // ← IMPORTANT
import { GoodFirmsScript } from "@/components/ui/GoodFirmsWidget"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Qwickbit Technologies",
  description: "Next.js app",
  icons: {
    icon: "/logo.svg",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      
      <body className="font-sans antialiased">
<GoodFirmsScript />
        {children}

        <Analytics />
      </body>
    </html>
  )
}
