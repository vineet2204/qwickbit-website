"use client"

import { useEffect, useState } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import { ChevronDown } from "lucide-react"

interface NavigationHeaderProps {
  currentSection: number
  scrollToSection: (index: number) => void
  isLoaded: boolean
}

const sections = [
  { name: "Home", index: 0 },
  { name: "Products", index: 1 },
  { name: "Services", index: 2, hasDropdown: true },
  // { name: "Solutions", index: 3 },
  { name: "Why Us", index: 3 },
  { name: "Contact", index: 4 },
]

const servicesMenu = [
  {
    category: "AI & ML Solutions",
    items: ["Conversational AI", "Predictive Analytics", "Computer Vision", "Generative AI"],
  },
  {
    category: "IoT & Tracking",
    items: ["Fleet Tracking", "Asset Tracking", "Real-time Dashboards", "Geo-fencing"],
  },
  {
    category: "Web & Mobile Apps",
    items: ["High-Performance Apps", "Ecommerce Platforms", "Enterprise Solutions", "Modern Tech Stack"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Cloud Architectures", "DevOps Automation", "Infrastructure Management", "Scaling Solutions"],
  },
]

export function NavigationHeader({ currentSection, scrollToSection, isLoaded }: NavigationHeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      if (target) {
        const maxScroll = target.scrollWidth - target.clientWidth
        const progress = maxScroll > 0 ? (target.scrollLeft / maxScroll) * 100 : 0
        setScrollProgress(progress)
      }
    }

    const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLDivElement
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <nav className="flex items-center justify-between border-b border-foreground/10 bg-background/40 px-6 py-6 backdrop-blur-md md:px-12">
        {/* Logo */}
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-orange-500 backdrop-blur-md transition-all duration-300 hover:scale-110">
            <span className="font-sans text-lg font-bold text-white">Q</span>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">Qwickbit</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {sections.map((section) => {
            if (section.hasDropdown) {
              return (
                <div key={section.index} className="relative group">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className={`relative px-3 py-2 font-mono text-sm transition-all duration-300 flex items-center gap-1 ${
                      currentSection === section.index || isServicesOpen
                        ? "text-foreground"
                        : "text-foreground/60 hover:text-foreground/90"
                    }`}
                  >
                    {section.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                    />
                    {(currentSection === section.index || isServicesOpen) && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500" />
                    )}
                  </button>

                  <div
                    className={`absolute top-full -ml-80 left-0 mt-2 bg-background/95 border border-foreground/10 rounded-lg backdrop-blur-md shadow-2xl transition-all duration-300 transform origin-top ${
                      isServicesOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
                    }`}
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <div className="grid grid-cols-2 gap-8 p-6 min-w-max">
                      {/* Left Column - Service Categories */}
                      <div className="border-r border-foreground/10 pr-8">
                        <h3 className="font-mono text-xs text-foreground/60 mb-4 uppercase tracking-widest">
                          Our Services
                        </h3>
                        <div className="space-y-2">
                          {servicesMenu.map((service, idx) => (
                            <button
                              key={idx}
                              className="block text-left px-3 py-2 rounded-md text-sm font-sans text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-all duration-200"
                            >
                              {service.category}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Service Items */}
                      <div>
                        <h3 className="font-mono text-xs text-foreground/60 mb-4 uppercase tracking-widest">
                          Expertise
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {servicesMenu.map((service, idx) => (
                            <div key={idx}>
                              {service.items.map((item, itemIdx) => (
                                <button
                                  key={itemIdx}
                                  className="block w-full text-left px-3 py-2 text-sm font-sans text-foreground/70 hover:text-foreground/100 hover:bg-foreground/5 rounded-md transition-all duration-200"
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="border-t border-foreground/10 px-6 py-4">
                      <button
                        onClick={() => {
                          scrollToSection(section.index)
                          setIsServicesOpen(false)
                        }}
                        className="text-sm font-sans text-blue-500 hover:text-blue-400 transition-colors duration-200"
                      >
                        View All Services →
                      </button>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <button
                key={section.index}
                onClick={() => scrollToSection(section.index)}
                className={`relative px-3 py-2 font-mono text-sm transition-all duration-300 ${
                  currentSection === section.index ? "text-foreground" : "text-foreground/60 hover:text-foreground/90"
                }`}
              >
                {section.name}
                {currentSection === section.index && (
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500" />
                )}
              </button>
            )
          })}
        </div>

        {/* CTA Button */}
        <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
          Book a Demo
        </MagneticButton>
      </nav>

      {/* Scroll Progress Bar */}
      <div
        className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Section Indicators */}
      <div
        className={`fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 md:right-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-700`}
      >
        {sections.map((section) => (
          <button
            key={section.index}
            onClick={() => scrollToSection(section.index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              currentSection === section.index ? "h-3 w-8 bg-foreground" : "bg-foreground/30 hover:bg-foreground/60"
            }`}
            title={section.name}
          />
        ))}
      </div>
    </header>
  )
}
