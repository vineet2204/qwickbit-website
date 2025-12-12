"use client"

import { useRef, useEffect, useState } from "react"
import { 
  ChevronDown, 
  Menu, 
  X,
  Users,
  ShoppingCart,
  Utensils,
  Briefcase,
  GraduationCap,
  Building,
  Plane,
  Search,
  Mail,
  Store,
  Link,
  Stethoscope,
  Car,
  FileText,
  Brain,
  BarChart,
  Eye,
  MessageSquare,
  Cpu,
  Cloud,
  Shield,
  Zap,
  Globe,
  Code,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface NavigationHeaderProps {
  currentSection: number
  scrollToSection: (index: number) => void
  isLoaded: boolean
  setCurrentSection: (index: number) => void
  onItemClick: (item: ProductSolutionItem, type: 'service' | 'product') => void
  isDetailPageOpen?: boolean
}

const sections = [
  { name: "Home", index: 0 },
  { name: "Products & Solutions", index: 1, hasDropdown: true },
  { name: "Services", index: 2, hasDropdown: true },
  { name: "About Us", index: 3 },
  { name: "Contact", index: 4 },
]

interface ProductSolutionItem {
  name: string
  description: string
  icon: any
}

interface ServicesMenuItem {
  category: string
  items: ProductSolutionItem[]
}

interface ProductsSolutionsMenuItem {
  category: string
  items: ProductSolutionItem[]
}

const productsSolutionsMenu: ProductsSolutionsMenuItem[] = [
  {
    category: "By Industry",
    items: [
      { name: "CRM", description: "Integrated CRM with efficient process management.", icon: Users },
      { name: "B2B OMS", description: "Simplified B2B order management & payments.", icon: ShoppingCart },
      { name: "Food Ordering", description: "Manage orders from kitchen to customer.", icon: Utensils },
      { name: "Recruitment Agency", description: "Manage end to end employee life cycle.", icon: Briefcase },
      { name: "Edtech Institutions", description: "Manage online live and f2f classes with student assessment.", icon: GraduationCap },
      { name: "Hotel & Resorts", description: "Efficiently manage day out packages, activities and room booking.", icon: Building },
      { name: "Travel Agency", description: "Sell and manage your packages & ticketing system.", icon: Plane },
      { name: "Job Portal", description: "Solution to connect talent with opportunity.", icon: Search },
      { name: "Email Marketing", description: "Transform emails into opportunities with inbox delivery.", icon: Mail },
      { name: "Retail eCommerce", description: "Grow your business with conversion friendly eCommerce store.", icon: Store },
      { name: "Travel API, CDS", description: "Integrate technology of the future in your system.", icon: Link },
      { name: "Candidate Assessments", description: "Discover the best fit with confidence.", icon: FileText },
      { name: "Affiliate Marketing", description: "Boost profits, reward customers with smart affiliations.", icon: Globe },
      { name: "Diagnostic Centre", description: "Collect, manage, sell health checkup packages.", icon: Stethoscope },
      { name: "Car Rental", description: "Expand your car rental business with cab booking app.", icon: Car },
      { name: "Online Test Management", description: "Online test series, quiz simulator application.", icon: FileText }
    ]
  },
  {
    category: "AI & ML Solutions",
    items: [
      { name: "Conversational AI", description: "Intelligent chatbots and virtual assistants for customer engagement.", icon: MessageSquare },
      { name: "Predictive Analytics", description: "Data-driven insights and forecasting for business decisions.", icon: BarChart },
      { name: "Computer Vision", description: "Image and video analysis for automation and quality control.", icon: Eye },
      { name: "NLP Solutions", description: "Text analysis, sentiment analysis, and language processing.", icon: Brain },
      { name: "Machine Learning Ops", description: "End-to-end ML pipeline management and deployment.", icon: Cpu },
      { name: "AI-Powered Automation", description: "Intelligent process automation and workflow optimization.", icon: Zap },
      { name: "Cloud AI Services", description: "Scalable AI solutions on cloud platforms.", icon: Cloud },
      { name: "AI Security", description: "Threat detection and prevention using AI algorithms.", icon: Shield }
    ]
  }
]

const servicesMenu: ServicesMenuItem[] = [
  {
    category: "Development",
    items: [
      { name: "Web Development", description: "Custom web applications built with modern frameworks and technologies.", icon: Code },
      { name: "Software Development", description: "End-to-end software solutions tailored to your business needs.", icon: Cpu },
      { name: "Mobile App Development", description: "Native and cross-platform mobile apps for iOS and Android.", icon: Globe },
      { name: "UI/UX Design", description: "User-centered design that creates engaging digital experiences.", icon: Eye }
    ]
  },
  {
    category: "Technologies",
    items: [
      { name: "React", description: "Build interactive user interfaces with component-based architecture.", icon: Code },
      { name: "Next.js", description: "Production-ready React framework with SSR and static generation.", icon: Globe },
      { name: "TypeScript", description: "Type-safe JavaScript for scalable application development.", icon: FileText },
      { name: "Node.js", description: "Server-side JavaScript runtime for building scalable applications.", icon: Cpu },
      { name: "Python", description: "Versatile programming language for web, AI, and data science.", icon: Brain },
      { name: "PostgreSQL", description: "Advanced open-source relational database management system.", icon: Shield },
      { name: "MongoDB", description: "NoSQL database for flexible, scalable data storage.", icon: Cloud },
      { name: "GraphQL", description: "Modern API query language for efficient data fetching.", icon: Link },
      { name: "Docker", description: "Containerization platform for consistent deployment environments.", icon: Cpu },
      { name: "AWS", description: "Cloud computing services for scalable infrastructure.", icon: Cloud },
      { name: "Firebase", description: "Backend-as-a-Service platform for rapid app development.", icon: Zap },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development.", icon: Eye },
      { name: "Vue.js", description: "Progressive JavaScript framework for building user interfaces.", icon: Code },
      { name: "Angular", description: "Enterprise-grade framework for building web applications.", icon: Globe },
      { name: "Redis", description: "In-memory data structure store for caching and real-time apps.", icon: Zap }
    ]
  },
  {
    category: "Solutions & Support",
    items: [
      { name: "Customize Solutions", description: "Tailored software solutions designed for your unique requirements.", icon: Zap },
      { name: "IT Solutions", description: "Comprehensive IT infrastructure and consulting services.", icon: Cloud },
      { name: "Testing and QA", description: "Rigorous quality assurance and testing for flawless software.", icon: Shield }
    ]
  }
]

type DropdownMenuType = ServicesMenuItem[] | ProductsSolutionsMenuItem[]

export function NavigationHeader({ 
  currentSection, 
  scrollToSection, 
  isLoaded, 
  setCurrentSection, 
  onItemClick,
  isDetailPageOpen = false 
}: NavigationHeaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [viewAllStates, setViewAllStates] = useState<{[key: string]: boolean}>({
    "By Industry": false,
    "AI & ML Solutions": false,
    "Technologies": false
  })
  const [carouselIndex, setCarouselIndex] = useState<{[key: string]: number}>({
    "By Industry": 0,
    "Technologies": 0
  })

  useEffect(() => {
    if (isDetailPageOpen) return

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      if (target) {
        const maxScroll = target.scrollWidth - target.clientWidth
        const progress = maxScroll > 0 ? (target.scrollLeft / maxScroll) * 100 : 0
        setScrollProgress(progress)
        
        const sectionWidth = target.offsetWidth
        const scrollLeft = target.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)
        
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLDivElement
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [currentSection, setCurrentSection, isDetailPageOpen])

  const handleMobileSectionClick = (index: number) => {
    scrollToSection(index)
    setIsMobileMenuOpen(false)
    setMobileSolutionsOpen(false)
    setMobileServicesOpen(false)
  }

  const handleViewAllClick = (categoryName: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    setViewAllStates(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }))
  }

  const handleCarouselNext = (categoryName: string, totalItems: number) => {
    setCarouselIndex(prev => ({
      ...prev,
      [categoryName]: Math.min((prev[categoryName] || 0) + 1, Math.ceil(totalItems / 9) - 1)
    }))
  }

  const handleCarouselPrev = (categoryName: string) => {
    setCarouselIndex(prev => ({
      ...prev,
      [categoryName]: Math.max((prev[categoryName] || 0) - 1, 0)
    }))
  }

  const handleItemClickInternal = (item: ProductSolutionItem, type: 'service' | 'product') => {
    onItemClick(item, type)
    setIsServicesOpen(false)
    setIsSolutionsOpen(false)
    setIsMobileMenuOpen(false)
    setMobileSolutionsOpen(false)
    setMobileServicesOpen(false)
  }

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

  const isProductsSolutionsMenuItem = (item: any): item is ProductsSolutionsMenuItem => {
    return item && Array.isArray(item.items) && item.items[0] && typeof item.items[0] === 'object' && 'icon' in item.items[0]
  }

  const renderDropdownContent = (dropdownMenu: DropdownMenuType, isProductsSolutions: boolean) => {
    if (isProductsSolutionsMenuItem(dropdownMenu[activeCategory])) {
      const currentCategory = dropdownMenu[activeCategory] as ProductsSolutionsMenuItem
      const totalItems = currentCategory.items.length
      const isIndustryCategory = currentCategory.category === "By Industry"
      const isTechnologiesCategory = currentCategory.category === "Technologies"
      
      if (isIndustryCategory || isTechnologiesCategory) {
        const itemsPerPage = 9
        const totalPages = Math.ceil(totalItems / itemsPerPage)
        const currentPage = carouselIndex[currentCategory.category] || 0
        const startIdx = currentPage * itemsPerPage
        const endIdx = Math.min(startIdx + itemsPerPage, totalItems)
        const displayItems = currentCategory.items.slice(startIdx, endIdx)

        return (
          <div className="grid grid-cols-2 gap-5 p-8 min-w-[1200px]">
            <div className="border-r border-white/20 w-[300px] pr-10">
              <h3 className="font-mono text-sm text-white/80 mb-5 uppercase tracking-widest font-semibold">
                {isProductsSolutions ? "Solutions Categories" : "Our Services"}
              </h3>
              <div className="space-y-3">
                {dropdownMenu.map((item, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => {
                      setActiveCategory(idx)
                      setCarouselIndex(prev => ({ ...prev, [item.category]: 0 }))
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-md text-base font-sans transition-all duration-200 ${
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

            <div className="-ml-48 relative">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-mono text-sm text-white/80 uppercase tracking-widest font-semibold">
                  {currentCategory.category}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm font-mono">
                    {currentPage + 1} / {totalPages}
                  </span>
                  <button
                    onClick={() => handleCarouselPrev(currentCategory.category)}
                    disabled={currentPage === 0}
                    className={`p-2 rounded-lg border transition-all duration-200 ${
                      currentPage === 0
                        ? "border-white/10 text-white/30 cursor-not-allowed"
                        : "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCarouselNext(currentCategory.category, totalItems)}
                    disabled={currentPage === totalPages - 1}
                    className={`p-2 rounded-lg border transition-all duration-200 ${
                      currentPage === totalPages - 1
                        ? "border-white/10 text-white/30 cursor-not-allowed"
                        : "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="transition-transform duration-500 ease-in-out">
                  <div className="grid grid-cols-3 gap-4 w-[700px]">
                    {displayItems.map((item, itemIdx) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={startIdx + itemIdx}
                          onClick={() => handleItemClickInternal(item, isProductsSolutions ? 'product' : 'service')}
                          className="group relative p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:border-white/20 animate-fadeIn cursor-pointer text-left"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-orange-500/20 group-hover:from-blue-500/30 group-hover:to-orange-500/30 transition-all duration-200">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white text-sm mb-1">{item.name}</h4>
                              <p className="text-white/70 text-xs leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(prev => ({ ...prev, [currentCategory.category]: idx }))}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentPage
                        ? "w-8 bg-white"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      } else {
        const showAllItems = viewAllStates[currentCategory.category]
        const displayItems = showAllItems 
          ? currentCategory.items 
          : currentCategory.items.slice(0, 9)
        const hasMoreItems = totalItems > 9

        return (
          <div className="grid grid-cols-2 gap-5 p-8 min-w-[1200px]">
            <div className="border-r border-white/20 w-[300px] pr-10">
              <h3 className="font-mono text-sm text-white/80 mb-5 uppercase tracking-widest font-semibold">
                {isProductsSolutions ? "Solutions Categories" : "Our Services"}
              </h3>
              <div className="space-y-3">
                {dropdownMenu.map((item, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActiveCategory(idx)}
                    className={`block w-full text-left px-4 py-3 rounded-md text-base font-sans transition-all duration-200 ${
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

            <div className="-ml-48">
              <h3 className="font-mono w-[700px] text-sm text-white/80 mb-5 uppercase tracking-widest font-semibold">
                {currentCategory.category}
              </h3>
              <div className="grid grid-cols-3 gap-4 w-[700px]">
                {displayItems.map((item, itemIdx) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={itemIdx}
                      onClick={() => handleItemClickInternal(item, isProductsSolutions ? 'product' : 'service')}
                      className="group relative p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:border-white/20 cursor-pointer text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-orange-500/20 group-hover:from-blue-500/30 group-hover:to-orange-500/30 transition-all duration-200">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm mb-1">{item.name}</h4>
                          <p className="text-white/70 text-xs leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {hasMoreItems && (
                <div className="mt-6 pt-5 border-t border-white/20">
                  <button
                    onClick={(e) => handleViewAllClick(currentCategory.category, e)}
                    className="px-5 py-2.5 rounded-lg border border-white/30 text-white font-mono text-sm backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    {showAllItems ? (
                      <>
                        <span>Show Less</span>
                        <ChevronDown className="w-4 h-4 rotate-180" />
                      </>
                    ) : (
                      <>
                        <span>View All ({totalItems})</span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      }
    }
  }

  const renderNavigationDots = () => {
    if (isDetailPageOpen) {
      return (
        <div className="flex flex-col gap-3 rounded-full border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              className="group relative flex items-center justify-center"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-white/40 hover:bg-white/60 hover:scale-110 transition-all" />
              <div className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-xl backdrop-blur-2xl transition-opacity duration-200 group-hover:opacity-100">
                Slide {index + 1}
              </div>
            </button>
          ))}
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-3 rounded-full border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl">
        {sections.map((section) => (
          <button
            key={section.index}
            onClick={() => scrollToSection(section.index)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to ${section.name}`}
          >
            <div
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                currentSection === section.index
                  ? 'scale-125 bg-white shadow-lg shadow-white/50'
                  : 'bg-white/40 hover:bg-white/60 hover:scale-110'
              }`}
            />
            
            <div className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-xl backdrop-blur-2xl transition-opacity duration-200 group-hover:opacity-100">
              {section.name}
            </div>

            {currentSection === section.index && (
              <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-white/20 blur-md" />
            )}
          </button>
        ))}
      </div>
    )
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${isDetailPageOpen ? "bg-black/50 backdrop-blur-md" : ""}`}
      >
        <nav className="flex items-center justify-between px-6 py-6 backdrop-blur-md md:px-12">
          <button
            onClick={() => scrollToSection(0)}
            className="
              flex items-center gap-2.5 px-3.5 py-2
              rounded-xl
              bg-white/10
              border border-white/30
              backdrop-blur-xl
              shadow-[inset_0_0_0_0_rgba(255,255,255,0.25),0_6px_20px_rgba(0,0,0,0.18)]
              transition-all duration-300
              hover:bg-white/20
              hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_8px_28px_rgba(0,0,0,0.22)]
              hover:scale-[1.03]
              active:scale-[0.97]
              relative overflow-hidden
              before:absolute before:inset-0
              before:bg-gradient-to-b before:from-white/40 before:to-transparent
              before:opacity-60 before:pointer-events-none
            "
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg relative z-10">
              <img src="/logo.svg" alt="Logo" className="h-7 w-7" />
            </div>

            <span className="relative -ml-2 z-10 text-xl uppercase leading-tight text-start font-montserrat">
              <span className="block font-extrabold tracking-wide text-white">
                QWICKBIT
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {sections.map((section) => {
              if (section.hasDropdown) {
                const isDropdownOpen = section.name === "Services" ? isServicesOpen : isSolutionsOpen
                const setDropdownOpen = section.name === "Services" ? setIsServicesOpen : setIsSolutionsOpen
                const dropdownMenu: DropdownMenuType = section.name === "Services" ? servicesMenu : productsSolutionsMenu
                const isProductsSolutions = section.name === "Products & Solutions"

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
                      className={`fixed top-24 left-1/2 -translate-x-1/2 bg-black/90 border border-white/30 rounded-lg backdrop-blur-7xl backdrop-saturate-150 shadow-2xl transition-all duration-300 transform origin-top ${
                        isDropdownOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
                      }`}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => {
                        setDropdownOpen(false)
                        setActiveCategory(0)
                      }}
                    >
                      {renderDropdownContent(dropdownMenu, isProductsSolutions)}

                      <div className="border-t border-white/20 px-8 py-5">
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

          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => scrollToSection(4)}
              className="
                px-6 py-2.5 rounded-3xl
                font-mono text-sm text-white
                bg-white/10
                border border-white/30
                shadow-[inset_0_0_0_0_rgba(255,255,255,0.3)]
                backdrop-blur-xl
                transition-all duration-300
                hover:bg-white/20
                hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.4)]
                hover:scale-[1.04]
                active:scale-[0.98]
              "
            >
              Book a Demo
            </button>
          </div>

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

        {!isDetailPageOpen && (
          <div
            className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
            style={{ width: `${scrollProgress}%` }}
          />
        )}

        <div
          className={`hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-3 md:right-8 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-700`}
        >
          {renderNavigationDots()}
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-l border-white/10 shadow-2xl transform transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
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

          <div className="h-[calc(100%-80px)] overflow-y-auto">
            <div className="p-4">
              <nav className="flex flex-col space-y-1">
                {sections.map((section) => {
                  if (section.hasDropdown) {
                    const isDropdownOpen = section.name === "Services" ? mobileServicesOpen : mobileSolutionsOpen
                    const setDropdownOpen = section.name === "Services" ? setMobileServicesOpen : setMobileSolutionsOpen
                    const dropdownMenu: DropdownMenuType = section.name === "Services" ? servicesMenu : productsSolutionsMenu
                    const isProductsSolutions = section.name === "Products & Solutions"

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

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isDropdownOpen ? "max-h-[800px]" : "max-h-0"
                          }`}
                        >
                          <div className="px-4 pb-4 space-y-4">
                            <div className="grid gap-4">
                              {dropdownMenu.map((category, idx) => {
                                if (isProductsSolutionsMenuItem(category)) {
                                  const currentCategory = category as ProductsSolutionsMenuItem
                                  const isMobileTechnologiesCategory = currentCategory.category === "Technologies"
                                  const isMobileIndustryCategory = currentCategory.category === "By Industry"
                                  const shouldShowCarousel = isMobileTechnologiesCategory || isMobileIndustryCategory

                                  if (shouldShowCarousel) {
                                    const itemsPerPage = 9
                                    const totalPages = Math.ceil(currentCategory.items.length / itemsPerPage)
                                    const currentPage = carouselIndex[currentCategory.category] || 0
                                    const startIdx = currentPage * itemsPerPage
                                    const endIdx = Math.min(startIdx + itemsPerPage, currentCategory.items.length)
                                    const displayItems = currentCategory.items.slice(startIdx, endIdx)

                                    return (
                                      <div key={idx} className="space-y-2">
                                        <div className="flex items-center justify-between px-2">
                                          <h3 className="font-medium text-white/80 text-sm uppercase tracking-wider">
                                            {currentCategory.category}
                                          </h3>
                                          <div className="flex items-center gap-2">
                                            <span className="text-white/60 text-xs font-mono">
                                              {currentPage + 1}/{totalPages}
                                            </span>
                                            <button
                                              onClick={() => {
                                                setCarouselIndex(prev => ({
                                                  ...prev,
                                                  [currentCategory.category]: Math.max((prev[currentCategory.category] || 0) - 1, 0)
                                                }))
                                              }}
                                              disabled={currentPage === 0}
                                              className={`p-1 rounded border ${
                                                currentPage === 0
                                                  ? "border-white/10 text-white/30"
                                                  : "border-white/30 text-white"
                                              }`}
                                            >
                                              <ChevronLeft className="w-3 h-3" />
                                            </button>
                                            <button
                                              onClick={() => {
                                                setCarouselIndex(prev => ({
                                                  ...prev,
                                                  [currentCategory.category]: Math.min((prev[currentCategory.category] || 0) + 1, totalPages - 1)
                                                }))
                                              }}
                                              disabled={currentPage === totalPages - 1}
                                              className={`p-1 rounded border ${
                                                currentPage === totalPages - 1
                                                  ? "border-white/10 text-white/30"
                                                  : "border-white/30 text-white"
                                              }`}
                                            >
                                              <ChevronRight className="w-3 h-3" />
                                            </button>
                                          </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                          {displayItems.map((item, itemIdx) => {
                                            const Icon = item.icon
                                            return (
                                              <button
                                                key={startIdx + itemIdx}
                                                onClick={() => handleItemClickInternal(item, isProductsSolutions ? 'product' : 'service')}
                                                className="w-full text-left p-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex flex-col items-center gap-2"
                                              >
                                                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-orange-500/20">
                                                  <Icon className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="text-center">
                                                  <div className="font-medium text-xs">{item.name}</div>
                                                  <div className="text-white/70 text-[10px] mt-1 line-clamp-2">
                                                    {item.description}
                                                  </div>
                                                </div>
                                              </button>
                                            )
                                          })}
                                        </div>
                                        <div className="flex justify-center gap-1 mt-3">
                                          {Array.from({ length: totalPages }).map((_, pageIdx) => (
                                            <button
                                              key={pageIdx}
                                              onClick={() => setCarouselIndex(prev => ({ ...prev, [currentCategory.category]: pageIdx }))}
                                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                                pageIdx === currentPage
                                                  ? "w-6 bg-white"
                                                  : "w-1.5 bg-white/30"
                                              }`}
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    )
                                  }

                                  return (
                                    <div key={idx} className="space-y-2">
                                      <h3 className="font-medium text-white/80 text-sm uppercase tracking-wider px-2">
                                        {currentCategory.category}
                                      </h3>
                                      <div className="grid grid-cols-3 gap-2">
                                        {currentCategory.items.slice(0, 9).map((item, itemIdx) => {
                                          const Icon = item.icon
                                          return (
                                            <button
                                              key={itemIdx}
                                              onClick={() => handleItemClickInternal(item, isProductsSolutions ? 'product' : 'service')}
                                              className="w-full text-left p-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex flex-col items-center gap-2"
                                            >
                                              <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-orange-500/20">
                                                <Icon className="w-4 h-4 text-white" />
                                              </div>
                                              <div className="text-center">
                                                <div className="font-medium text-xs">{item.name}</div>
                                                <div className="text-white/70 text-[10px] mt-1 line-clamp-2">
                                                  {item.description}
                                                </div>
                                              </div>
                                            </button>
                                          )
                                        })}
                                      </div>
                                    </div>
                                  )
                                }
                              })}
                            </div>
                            
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

              <div className="mt-8 p-4 border-t border-white/10 pt-6">
                <button
                  onClick={() => handleMobileSectionClick(4)}
                  className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-center hover:opacity-90 transition-opacity"
                >
                  Book a Demo
                </button>
                
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

export default NavigationHeader