"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"

interface NavigationHeaderProps {
  currentSection: number
  scrollToSection: (index: number) => void
  isLoaded: boolean
}

const sections = [
  { name: "Home", index: 0 },
  { name: "Solutions", index: 1, hasDropdown: true },
  { name: "Services", index: 2, hasDropdown: true },
  { name: "About Us", index: 3 },
  { name: "Contact", index: 4 },
]

const solutionsMenu = [
  {
    category: "By Industry",
    items: ["Healthcare", "Finance", "Retail", "Manufacturing", "Logistics"],
  },
  {
    category: "AI & ML Solutions",
    items: ["Conversational AI", "Predictive Analytics", "Computer Vision", "NLP Solutions"],
  },
]

const servicesMenu = [
  {
    category: "Development",
    items: ["Web Development", "Software Development", "Mobile App Development", "UI/UX Design"],
  },
  {
    category: "Solutions & Support",
    items: ["Customize Solutions", "IT Solutions", "Testing and QA"],
  },
]

export function NavigationHeader({ currentSection, scrollToSection, isLoaded }: NavigationHeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

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

  // Close mobile menu when clicking on a section
  const handleMobileSectionClick = (index: number) => {
    scrollToSection(index)
    setIsMobileMenuOpen(false)
    setMobileSolutionsOpen(false)
    setMobileServicesOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <nav className="flex items-center justify-between border-b border-white/10 bg-white/30 px-6 py-6 backdrop-blur-md md:px-12">
          {/* Logo */}
          <button
            onClick={() => scrollToSection(0)}
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:scale-110">
              <img src="/logo.svg" alt="Logo" />
            </div>
            <span className="text-2xl uppercase leading-tight text-start font-montserrat">
              <span className="block font-extrabold tracking-wide text-[#4f47e5]">
                QWICKBIT
              </span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {sections.map((section) => {
              if (section.hasDropdown) {
                const isDropdownOpen = section.name === "Services" ? isServicesOpen : isSolutionsOpen
                const setDropdownOpen = section.name === "Services" ? setIsServicesOpen : setIsSolutionsOpen
                const dropdownMenu = section.name === "Services" ? servicesMenu : solutionsMenu

                return (
                  <div key={section.index} className="relative group">
                    <button
                      onClick={() => setDropdownOpen(!isDropdownOpen)}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                      className={`relative px-3 py-2 font-mono text-base transition-all duration-300 flex items-center gap-1 ${
                        currentSection === section.index || isDropdownOpen
                          ? "text-white font-semibold"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {section.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                      {(currentSection === section.index || isDropdownOpen) && (
                        <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500" />
                      )}
                    </button>

                    <div
                      className={`absolute top-full mt-6 left-1/2 -translate-x-1/2  bg-black/80 border border-white/30 rounded-lg backdrop-blur-7xl backdrop-saturate-150 shadow-2xl transition-all duration-300 transform origin-top ${
                        isDropdownOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
                      }`}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => {
                        setDropdownOpen(false)
                        setActiveCategory(0)
                      }}
                    >
                      <div className="grid grid-cols-2 gap-8 p-6 min-w-max">
                        {/* Left Column - Categories */}
                        <div className="border-r border-white/20 pr-8">
                          <h3 className="font-mono text-sm text-white/80 mb-4 uppercase tracking-widest font-semibold">
                            {section.name === "Services" ? "Our Services" : "Solutions"}
                          </h3>
                          <div className="space-y-2">
                            {dropdownMenu.map((item, idx) => (
                              <button
                                key={idx}
                                onMouseEnter={() => setActiveCategory(idx)}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-sans transition-all duration-200 ${
                                  activeCategory === idx
                                    ? "text-white bg-white/20 font-semibold"
                                    : "text-white/80 hover:text-white hover:bg-white/10"
                                }`}
                              >
                                {item.category}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right Column - Items for Active Category */}
                        <div>
                          <h3 className="font-mono text-sm text-white/80 mb-4 uppercase tracking-widest font-semibold">
                            {dropdownMenu[activeCategory].category}
                          </h3>
                          <div className="space-y-2">
                            {dropdownMenu[activeCategory].items.map((item, itemIdx) => (
                              <button
                                key={itemIdx}
                                className="block w-full text-left px-3 py-2 text-base font-sans text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom CTA */}
                      <div className="border-t border-white/20 px-6 py-4">
                        <button
                          onClick={() => {
                            scrollToSection(section.index)
                            setDropdownOpen(false)
                            setActiveCategory(0)
                          }}
                          className="text-sm font-sans text-blue-300 hover:text-blue-200 transition-colors duration-200"
                        >
                          View All {section.name} →
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
                  className={`relative px-3 py-2 font-mono text-base transition-all duration-300 ${
                    currentSection === section.index 
                      ? "text-white font-semibold" 
                      : "text-white/80 hover:text-white"
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

          {/* Desktop CTA Button */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => scrollToSection(4)}
              className="px-6 py-2.5 rounded-lg bg-black/20 border border-white/80 text-white font-mono text-sm backdrop-blur-sm hover:bg-black/30 transition-all duration-300 hover:scale-105"
            >
              Book a Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Scroll Progress Bar */}
        <div
          className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Section Indicators - Desktop Only */}
        <div
          className={`hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-4 md:right-12 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-700`}
        >
          {sections.map((section) => (
            <button
              key={section.index}
              onClick={() => scrollToSection(section.index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentSection === section.index ? "h-3 w-8 bg-gray-900" : "bg-gray-400 hover:bg-gray-600"
              }`}
              title={section.name}
            />
          ))}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-l border-white/10 shadow-2xl transform transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8">
                <img src="/logo.svg" alt="Logo" className="w-full h-full" />
              </div>
              <span className="text-xl font-bold text-white">QWICKBIT</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="h-[calc(100%-80px)] overflow-y-auto">
            <div className="p-4">
              <nav className="flex flex-col space-y-1">
                {sections.map((section) => {
                  if (section.hasDropdown) {
                    const isDropdownOpen = section.name === "Services" ? mobileServicesOpen : mobileSolutionsOpen
                    const setDropdownOpen = section.name === "Services" ? setMobileServicesOpen : setMobileSolutionsOpen
                    const dropdownMenu = section.name === "Services" ? servicesMenu : solutionsMenu

                    return (
                      <div key={section.index} className="border-b border-white/10 last:border-0">
                        <button
                          onClick={() => setDropdownOpen(!isDropdownOpen)}
                          className={`w-full flex items-center justify-between px-4 py-4 text-left transition-colors ${
                            currentSection === section.index
                              ? "text-white bg-white/10"
                              : "text-white/90 hover:bg-white/5"
                          }`}
                        >
                          <span className="font-medium text-lg">{section.name}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              isDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Mobile Dropdown Content */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isDropdownOpen ? "max-h-[500px]" : "max-h-0"
                          }`}
                        >
                          <div className="px-4 pb-4 space-y-4">
                            <div className="grid gap-4">
                              {dropdownMenu.map((category, idx) => (
                                <div key={idx} className="space-y-2">
                                  <h3 className="font-medium text-white/80 text-sm uppercase tracking-wider px-2">
                                    {category.category}
                                  </h3>
                                  <div className="space-y-1">
                                    {category.items.map((item, itemIdx) => (
                                      <button
                                        key={itemIdx}
                                        onClick={() => handleMobileSectionClick(section.index)}
                                        className="w-full text-left px-4 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                      >
                                        {item}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* View All Button for Mobile */}
                            <button
                              onClick={() => {
                                handleMobileSectionClick(section.index)
                                setDropdownOpen(false)
                              }}
                              className="w-full px-4 py-3 text-center border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
                            >
                              View All {section.name} →
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <button
                      key={section.index}
                      onClick={() => handleMobileSectionClick(section.index)}
                      className={`px-4 py-4 text-left transition-colors rounded-lg ${
                        currentSection === section.index
                          ? "text-white bg-white/10"
                          : "text-white/90 hover:bg-white/5"
                      }`}
                    >
                      <span className="font-medium text-lg">{section.name}</span>
                    </button>
                  )
                })}
              </nav>

              {/* Mobile CTA Section */}
              <div className="mt-8 p-4 border-t border-white/10 pt-6">
                <button
                  onClick={() => handleMobileSectionClick(4)}
                  className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-center hover:opacity-90 transition-opacity"
                >
                  Book a Demo
                </button>
                
                {/* Contact Info */}
                <div className="mt-6 space-y-3 text-white/80">
                  <p className="text-sm">Need help? Contact us:</p>
                  <div className="space-y-2">
                    <a href="mailto:contact@qwickbit.com" className="block text-blue-300 hover:text-blue-200">
                      contact@qwickbit.com
                    </a>
                    <a href="tel:+11234567890" className="block text-blue-300 hover:text-blue-200">
                      +1 (123) 456-7890
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}