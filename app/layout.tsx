import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"  
import { GoodFirmsScript } from "@/components/ui/GoodFirmsWidget"
import { CustomCursor } from "@/components/custom-cursor"
import Script from "next/script"
import GoogleAnalytics from "@/components/Analytics"

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
        <head>
        {/* Google Analytics */}
      <Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
      send_page_view: false,
    });
  `}
</Script>

      </head>
      <body className="font-sans antialiased">
<GoodFirmsScript />
<CustomCursor />
<GoogleAnalytics />
        {children}

        <Analytics />
      </body>
    </html>
  )
}
