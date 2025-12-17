"use client"

import Script from "next/script"

export function GoodFirmsScript() {
  return (
    <Script
      src="https://assets.goodfirms.co/assets/js/widget.min.js"
      strategy="afterInteractive"
    />
  )
}
