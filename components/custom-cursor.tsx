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
      // 🚀 Increased from 0.15 to 0.35 for faster response
      positionRef.current.x = lerp(
        positionRef.current.x,
        targetPositionRef.current.x,
        0.95
      )
      positionRef.current.y = lerp(
        positionRef.current.y,
        targetPositionRef.current.y,
        0.95
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