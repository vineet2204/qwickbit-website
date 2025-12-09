"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { AboutSection } from "@/components/sections/about-section"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ContactSection } from "@/components/sections/contact-section"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/Footer"
import { useRef, useEffect, useState } from "react"

// Import DetailPage component
import { DetailPage } from "@/components/Details"

// Define the item type
interface ProductSolutionItem {
  name: string
  description: string
  icon: any
}

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  // Detail Page States
  const [detailPageOpen, setDetailPageOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ProductSolutionItem | null>(null)
  const [selectedType, setSelectedType] = useState<'service' | 'product'>('product')

  // Handler for opening detail pages
  const handleItemClick = (item: ProductSolutionItem, type: 'service' | 'product') => {
    console.log("Opening detail page for:", item.name, type)
    
    // Set the new item and type
    setSelectedItem(item)
    setSelectedType(type)
    
    // Open detail page
    setDetailPageOpen(true)
  }

  // Handler for closing detail page
  const handleCloseDetailPage = () => {
    console.log("Closing detail page")
    setDetailPageOpen(false)
    // Clear selected item after animation
    setTimeout(() => {
      setSelectedItem(null)
    }, 300)
  }

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Fluid Effect Background */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <NavigationHeader 
        currentSection={currentSection} 
        scrollToSection={scrollToSection} 
        isLoaded={isLoaded}
        setCurrentSection={setCurrentSection}
        onItemClick={handleItemClick}
        isDetailPageOpen={detailPageOpen}
      />

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded && !detailPageOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Home Section */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-foreground/90">AI-Powered Digital Transformation</p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                Intelligent products
                <br />
                for real impact
              </span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                We build intelligent products that help enterprises automate operations, enhance decision-making, and
                scale faster through AI, IoT, Cloud, and advanced software engineering.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(4)}>
                Book a Demo
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(1)}>
                Explore Case Studies
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Scroll horizontally to explore</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <WorkSection />

        {/* Services Section */}
        <ServicesSection />

        {/* About Section */}
        <AboutSection scrollToSection={scrollToSection} />

        {/* Contact Section */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex-1">
            <ContactSection />
          </div>
          <Footer />
        </section>
      </div>

      {/* Detail Page Component */}
      {selectedItem && (
        <DetailPage
          key={`${selectedItem.name}-${selectedType}`}
          isOpen={detailPageOpen}
          onClose={handleCloseDetailPage}
          item={selectedItem}
          type={selectedType}
        />
      )}

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}