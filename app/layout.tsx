import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"  
import { GoodFirmsScript } from "@/components/ui/GoodFirmsWidget"
import { CustomCursor } from "@/components/custom-cursor"
import Script from "next/script"
import GoogleAnalytics from "@/components/Analytics"
import FirebaseAnalyticsTracker from "@/components/FirebaseAnalyticsTracker"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Qwickbit Technologies",
  description: "AI driven company",
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
        <head>
        {/* Google Analytics */}
  


      </head>
      <body className="font-sans antialiased">
<GoodFirmsScript />
<CustomCursor />
{/* <GoogleAnalytics /> */}
        {children}

       <FirebaseAnalyticsTracker />
      </body>
    </html>
  )
}
