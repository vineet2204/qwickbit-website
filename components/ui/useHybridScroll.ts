"use client"

import { useEffect, RefObject } from "react"

export function useHybridScroll(containerRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const sections = Array.from(container.querySelectorAll("[data-section]"))

    const onWheel = (e: WheelEvent) => {
      let shouldScrollHorizontal = true

      for (const section of sections) {
        const verticalArea = section.querySelector("[data-vertically-scrollable]") as HTMLElement | null
        if (!verticalArea) continue

        const canScrollDown =
          verticalArea.scrollTop + verticalArea.clientHeight < verticalArea.scrollHeight
        const canScrollUp = verticalArea.scrollTop > 0

        // If vertical scroll is possible, do NOT scroll horizontal
        if (
          (e.deltaY > 0 && canScrollDown) ||
          (e.deltaY < 0 && canScrollUp)
        ) {
          shouldScrollHorizontal = false
          return
        }
      }

      // horizontal scroll only when vertical stops
      if (shouldScrollHorizontal) {
        e.preventDefault()
        container.scrollLeft += e.deltaY
      }
    }

    container.addEventListener("wheel", onWheel, { passive: false })

    return () => container.removeEventListener("wheel", onWheel)
  }, [containerRef])
}
