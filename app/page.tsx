"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { WorkSection } from "@/components/sections/work-section"
import { Footer } from "@/components/Footer"
import { useRef, useEffect, useState } from "react"
import { DetailPage } from "@/components/Details"
import ContactSection from "@/components/sections/contact-section"
import AboutSection from "@/components/sections/about-section"
import GlassmorphismNavigationHeader from "@/components/navigation-header"
import { ServicesSection } from "@/components/sections/services-section"

// Define the item type
interface ProductSolutionItem {
  name: string
  description: string
  icon: any
}

// Keypad Component
interface KeyConfig {
  id: string
  text: string
  travel: number
  hue: number
  saturation: number
  brightness: number
  key: string
  position: "single-left" | "single-right" | "double"
}

function KeypadComponent() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const keys: KeyConfig[] = [
    {
      id: "one",
      text: "ok",
      travel: 26,
      hue: 0,
      saturation: 0,
      brightness: 1.4,
      key: "o",
      position: "single-left",
    },
    {
      id: "two",
      text: "go",
      travel: 26,
      hue: 0,
      saturation: 0,
      brightness: 1.4,
      key: "g",
      position: "single-right",
    },
    {
      id: "three",
      text: "create.",
      travel: 18,
      hue: 0,
      saturation: 0,
      brightness: 0.4,
      key: "Enter",
      position: "double",
    },
  ]

  useEffect(() => {
    audioRef.current = new Audio("https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3")
    audioRef.current.volume = 0.3
  }, [])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  const handleKeyDown = (keyId: string) => {
    setPressedKeys((prev) => new Set(prev).add(keyId))
    playSound()
  }

  const handleKeyUp = (keyId: string) => {
    setPressedKeys((prev) => {
      const newSet = new Set(prev)
      newSet.delete(keyId)
      return newSet
    })
  }

  useEffect(() => {
    const handleKeyboardDown = (e: KeyboardEvent) => {
      const key = keys.find((k) => k.key === e.key)
      if (key && !pressedKeys.has(key.id)) {
        handleKeyDown(key.id)
      }
    }

    const handleKeyboardUp = (e: KeyboardEvent) => {
      const key = keys.find((k) => k.key === e.key)
      if (key) {
        handleKeyUp(key.id)
      }
    }

    window.addEventListener("keydown", handleKeyboardDown)
    window.addEventListener("keyup", handleKeyboardUp)

    return () => {
      window.removeEventListener("keydown", handleKeyboardDown)
      window.removeEventListener("keyup", handleKeyboardUp)
    }
  }, [pressedKeys])

  return (
    <div className="flex items-center justify-center w-full h-full py-16">
      <div className="relative w-full max-w-[500px] aspect-[400/310]">
        {/* Base */}
        <div className="absolute bottom-0 w-full opacity-30">
          <img
            src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86"
            alt=""
            className="w-full"
          />
        </div>

        {/* Keys */}
        {keys.map((keyConfig) => (
          <button
            key={keyConfig.id}
            className={`
              absolute cursor-pointer border-0 bg-transparent p-0 outline-none
              ${keyConfig.position === "single-left" ? "w-[40.5%] h-[46%] left-[29.3%] bottom-[54.2%]" : ""}
              ${keyConfig.position === "single-right" ? "w-[40.5%] h-[46%] left-[54%] bottom-[36%]" : ""}
              ${keyConfig.position === "double" ? "w-[64%] h-[65%] left-[6%] bottom-[17.85%]" : ""}
            `}
            style={{
              clipPath:
                keyConfig.position === "double"
                  ? "polygon(34% 0, 93% 44%, 101% 78%, 71% 100%, 66% 100%, 0 52%, 0 44%, 7% 17%, 30% 0)"
                  : "polygon(0 0, 54% 0, 89% 24%, 100% 70%, 54% 100%, 46% 100%, 0 69%, 12% 23%, 47% 0%)",
            }}
            onPointerDown={() => handleKeyDown(keyConfig.id)}
            onPointerUp={() => handleKeyUp(keyConfig.id)}
            onPointerLeave={() => handleKeyUp(keyConfig.id)}
          >
            <span className="inline-block w-full h-full">
              <span
                className="inline-block w-full h-full transition-transform duration-150 ease-out relative"
                style={{
                  transform: pressedKeys.has(keyConfig.id) ? `translateY(${keyConfig.travel}%)` : "translateY(0)",
                }}
              >
                {/* White border outline */}
                <div
                  className="absolute inset-0 border-2 border-white/40 pointer-events-none transition-colors duration-150"
                  style={{
                    clipPath:
                      keyConfig.position === "double"
                        ? "polygon(34% 0, 93% 44%, 101% 78%, 71% 100%, 66% 100%, 0 52%, 0 44%, 7% 17%, 30% 0)"
                        : "polygon(0 0, 54% 0, 89% 24%, 100% 70%, 54% 100%, 46% 100%, 0 69%, 12% 23%, 47% 0%)",
                  }}
                />

                {/* Colored Key Image */}
                <img
                  src={
                    keyConfig.position === "double"
                      ? "https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86"
                      : "https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86"
                  }
                  alt=""
                  className="w-full h-full object-contain opacity-70 transition-all duration-150"
                  style={{
                    filter: `hue-rotate(${keyConfig.hue}deg) saturate(${keyConfig.saturation}) brightness(${keyConfig.brightness})`,
                    transform: pressedKeys.has(keyConfig.id) ? "scale(0.98)" : "scale(1)",
                  }}
                />

                {/* Text - positioned on top surface of the key */}
                <span
                  className={`
                    absolute flex items-center justify-center
                    text-white font-semibold pointer-events-none
                    ${keyConfig.position === "double" ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl lg:text-3xl"}
                  `}
                  style={{
                    top: keyConfig.position === "double" ? "15%" : "10%",
                    left: keyConfig.position === "double" ? "5%" : "15%",
                    width: keyConfig.position === "double" ? "90%" : "70%",
                    height: keyConfig.position === "double" ? "30%" : "35%",
                    transform:
                      keyConfig.position === "double"
                        ? "perspective(600px) rotateX(50deg) rotateY(0deg) rotateZ(-8deg)"
                        : "perspective(600px) rotateX(45deg) rotateZ(0deg)",
                    transformStyle: "preserve-3d",
                    textShadow: `
                      1px 1px 2px rgba(0,0,0,0.6),
                      -0.5px -0.5px 1px rgba(255,255,255,0.3)
                    `,
                  }}
                >
                  {keyConfig.text}
                </span>
              </span>
            </span>
          </button>
        ))}

        {/* Keyboard hints */}
        <div className="absolute -bottom-16 left-0 right-0 text-center">
          <p className="text-sm text-foreground/70 font-mono">Press O, G, or Enter</p>
        </div>
      </div>
    </div>
  )
}

// Main Home Component
export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  // Detail Page States
  const [detailPageOpen, setDetailPageOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ProductSolutionItem | null>(null)
  const [selectedType, setSelectedType] = useState<"service" | "product">("product")

  // Handler for opening detail pages
  const handleItemClick = (item: ProductSolutionItem, type: "service" | "product") => {
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
    <main
      className="relative h-screen w-full overflow-hidden bg-background cursor-default"
      style={{ cursor: "default" }}
    >
      <GrainOverlay />

      {/* Fluid Effect Background */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict", pointerEvents: "none" }}
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

      <GlassmorphismNavigationHeader
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
        {/* Home Section with Keypad */}
        <section className="flex min-h-screen w-screen shrink-0 px-6 pb-16 pt-24 md:px-12 md:pb-24">
          <div className="flex w-full items-center gap-8 lg:gap-12">
            {/* Left Side - Hero Content */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="max-w-3xl">
                <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
                  <p className="font-mono text-xs text-foreground/90">AI-Powered Digital Transformation</p>
                </div>
                <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-6xl lg:text-7xl">
                  <span className="text-balance">
                    QWICKBIT Intelligent products
                    <br />
                    for real impact
                  </span>
                </h1>
                <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-lg">
                  <span className="text-pretty">
                    We build intelligent products that help enterprises automate operations, enhance decision-making,
                    and scale faster through AI, IoT, Cloud, and advanced software engineering.
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
            </div>

            {/* Right Side - Keypad */}
            <div className="hidden lg:flex flex-1 items-center justify-center animate-in fade-in duration-1000 delay-400">
              <KeypadComponent />
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

        {/* Work Section - NOW WITH onItemClick PROP */}
        <WorkSection onItemClick={handleItemClick} />

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