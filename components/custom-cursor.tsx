"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const isPointerRef = useRef(false)

  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Detect touch / mobile devices
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768

    setIsMobile(isTouchDevice)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isMobile) return // ❌ Disable cursor on mobile

    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const updateCursor = () => {
      positionRef.current.x = lerp(
        positionRef.current.x,
        targetPositionRef.current.x,
        0.15
      )
      positionRef.current.y = lerp(
        positionRef.current.y,
        targetPositionRef.current.y,
        0.15
      )

      if (outerRef.current && innerRef.current) {
        const scale = isPointerRef.current ? 1.5 : 1
        const innerScale = isPointerRef.current ? 0.5 : 1

        outerRef.current.style.transform = `
          translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)
          translate(-50%, -50%)
          scale(${scale})
        `

        innerRef.current.style.transform = `
          translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)
          translate(-50%, -50%)
          scale(${innerScale})
        `
      }

      animationFrameId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      isPointerRef.current =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    animationFrameId = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  // ❌ Don't render anything on mobile or before mount
  if (isMobile || !mounted) return null

  const cursorElements = (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[999999] mix-blend-difference will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        <div className="h-4 w-4 rounded-full border-2 border-white" />
      </div>

      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[999999] mix-blend-difference will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        <div className="h-2 w-2 rounded-full bg-white" />
      </div>
    </>
  )

  return createPortal(cursorElements, document.body)
}

// Demo component to show the cursor in action
export default function CustomCursorDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <CustomCursor />
      
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl font-bold text-white mb-4">
          Custom Cursor with React Portal
        </h1>
        
        <p className="text-xl text-white/80">
          Move your mouse around to see the custom cursor in action. 
          Hover over buttons and links to see the interactive effect.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-6 rounded-xl transition-all duration-300 border border-white/20">
            Hover Me
          </button>
          
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-6 rounded-xl transition-all duration-300 border border-white/20">
            Click Me
          </button>
          
          <a 
            href="#" 
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-6 rounded-xl transition-all duration-300 border border-white/20 block text-center"
          >
            I'm a Link
          </a>
          
          <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-xl border border-white/20">
            Regular Div
          </div>
        </div>

        <div className="mt-12 bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
          <ul className="text-white/80 space-y-2">
            <li>✨ Smooth lerp animation for fluid movement</li>
            <li>🎯 Interactive hover states on clickable elements</li>
            <li>📱 Automatically disabled on mobile/touch devices</li>
            <li>🌀 Uses React Portal for proper DOM positioning</li>
            <li>⚡ Optimized with requestAnimationFrame</li>
          </ul>
        </div>
      </div>
    </div>
  )
}