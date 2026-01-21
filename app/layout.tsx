import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"  
import { GoodFirmsScript } from "@/components/ui/GoodFirmsWidget"
import { CustomCursor } from "@/components/custom-cursor"
import Script from "next/script"
import GoogleAnalytics from "@/components/Analytics"
import { SpeedInsights } from "@vercel/speed-insights/next"
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
         {/* Tawk.to Live Chat */}
        <Script
          strategy="afterInteractive"
          src="https://embed.tawk.to/60f19010649e0a0a5ccc8ab2/1fanplgi9"
        />
<GoodFirmsScript />
<CustomCursor />
<SpeedInsights/>
{/* <GoogleAnalytics /> */}
        {children}

       <FirebaseAnalyticsTracker />
      </body>
    </html>
  )
}
