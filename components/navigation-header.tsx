"use client"

import type React from "react"

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
  ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface NavigationHeaderProps {
  currentSection: number
  scrollToSection: (index: number) => void
  isLoaded: boolean
  setCurrentSection: (index: number) => void
  onItemClick: (item: ProductSolutionItem, type: "service" | "product") => void
  isDetailPageOpen?: boolean
}

const sections = [
  { name: "Home", index: 0 },
  { name: "Products & Solutions", index: 1, hasDropdown: true },
  { name: "Services", index: 2, hasDropdown: true },
  { name: "About Us", index: 3, hasDropdown: true },
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
      {
        name: "Retail eCommerce",
        description: "Grow your business with conversion friendly eCommerce store.",
        icon: Store,
      },
      { name: "Food Ordering", description: "Manage orders from kitchen to customer.", icon: Utensils },
      { name: "Insurance", description: "Comprehensive insurance management solutions.", icon: Shield },
      { name: "Retail", description: "Modern retail management and POS systems.", icon: ShoppingCart },
      { name: "Mobile Apps", description: "Custom mobile applications for your business.", icon: Globe },
      { name: "Travel Agency", description: "Sell and manage your packages & ticketing system.", icon: Plane },
      { name: "B2B OMS", description: "Simplified B2B order management & payments.", icon: ShoppingCart },
      { name: "Recruitment Agency", description: "Manage end to end employee life cycle.", icon: Briefcase },
      {
        name: "Edtech Institutions",
        description: "Manage online live and f2f classes with student assessment.",
        icon: GraduationCap,
      },
      {
        name: "Hotel & Resorts",
        description: "Efficiently manage day out packages, activities and room booking.",
        icon: Building,
      },
      { name: "Job Portal", description: "Solution to connect talent with opportunity.", icon: Search },
      { name: "Travel API, CDS", description: "Integrate technology of the future in your system.", icon: Link },
      { name: "Candidate Assessments", description: "Discover the best fit with confidence.", icon: FileText },
      { name: "Diagnostic Centre", description: "Collect, manage, sell health checkup packages.", icon: Stethoscope },
      { name: "Car Rental", description: "Expand your car rental business with cab booking app.", icon: Car },
      {
        name: "Online Test Management",
        description: "Online test series, quiz simulator application.",
        icon: FileText,
      },
    ],
  },
  {
    category: "AI & ML Solutions",
    items: [
      {
        name: "Conversational AI",
        description: "Intelligent chatbots and virtual assistants for customer engagement.",
        icon: MessageSquare,
      },
      {
        name: "Predictive Analytics",
        description: "Data-driven insights and forecasting for business decisions.",
        icon: BarChart,
      },
      {
        name: "Computer Vision",
        description: "Image and video analysis for automation and quality control.",
        icon: Eye,
      },
      {
        name: "NLP Solutions",
        description: "Text analysis, sentiment analysis, and language processing.",
        icon: Brain,
      },
      { name: "Machine Learning Ops", description: "End-to-end ML pipeline management and deployment.", icon: Cpu },
      {
        name: "AI-Powered Automation",
        description: "Intelligent process automation and workflow optimization.",
        icon: Zap,
      },
      { name: "Cloud AI Services", description: "Scalable AI solutions on cloud platforms.", icon: Cloud },
      { name: "AI Security", description: "Threat detection and prevention using AI algorithms.", icon: Shield },
    ],
  },
  {
    category: "Case Studies",
    items: [
      {
        name: "Enterprise CRM Implementation",
        description: "Scalable CRM solution for Fortune 500 company reducing support tickets by 40%.",
        icon: Users,
      },
      {
        name: "Retail Automation System",
        description: "AI-powered inventory management reducing stockouts by 65%.",
        icon: ShoppingCart,
      },
      {
        name: "Healthcare Analytics Platform",
        description: "Predictive analytics for patient care optimization in hospital network.",
        icon: Stethoscope,
      },
      {
        name: "EdTech Learning Platform",
        description: "Personalized learning platform serving 50,000+ students across 5 countries.",
        icon: GraduationCap,
      },
      {
        name: "Travel Booking System",
        description: "High-performance booking engine handling 10,000+ daily transactions.",
        icon: Plane,
      },
      {
        name: "Financial Risk Assessment",
        description: "ML-based risk analysis system for banking institution reducing defaults by 25%.",
        icon: BarChart,
      },
      {
        name: "Supply Chain Optimization",
        description: "IoT and AI-driven logistics platform reducing delivery times by 30%.",
        icon: Link,
      },
      {
        name: "Customer Service AI",
        description: "Chatbot solution handling 80% of customer queries automatically.",
        icon: MessageSquare,
      },
    ],
  },
]

const servicesMenu: ServicesMenuItem[] = [
  {
    category: "Development",
    items: [
      {
        name: "Web Development",
        description: "Custom web applications built with modern frameworks and technologies.",
        icon: Code,
      },
      {
        name: "Software Development",
        description: "End-to-end software solutions tailored to your business needs.",
        icon: Cpu,
      },
      {
        name: "Mobile App Development",
        description: "Native and cross-platform mobile apps for iOS and Android.",
        icon: Globe,
      },
      {
        name: "UI/UX Design",
        description: "User-centered design that creates engaging digital experiences.",
        icon: Eye,
      },
    ],
  },
  {
    category: "Solutions & Support",
    items: [
      {
        name: "Customize Solutions",
        description: "Tailored software solutions designed for your unique requirements.",
        icon: Zap,
      },
      { name: "IT Solutions", description: "Comprehensive IT infrastructure and consulting services.", icon: Cloud },
      {
        name: "Testing and QA",
        description: "Rigorous quality assurance and testing for flawless software.",
        icon: Shield,
      },
    ],
  },
  {
    category: "Technologies",
    items: [
      {
        name: "React",
        description: "Build interactive user interfaces with component-based architecture.",
        icon: Code,
      },
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
      { name: "Redis", description: "In-memory data structure store for caching and real-time apps.", icon: Zap },
    ],
  },
]

type DropdownMenuType = ServicesMenuItem[] | ProductsSolutionsMenuItem[]

export default function GlassmorphismNavigationHeader({
  currentSection,
  scrollToSection,
  isLoaded,
  setCurrentSection,
  onItemClick,
  isDetailPageOpen = false,
}: NavigationHeaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const router = useRouter()
  const lastScrollY = useRef(0)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileAboutUsOpen, setMobileAboutUsOpen] = useState(false)
  const [viewAllStates, setViewAllStates] = useState<{ [key: string]: boolean }>({
    "By Industry": false,
    "AI & ML Solutions": false,
    "Case Studies": false,
    Technologies: false,
  })
  const [carouselIndex, setCarouselIndex] = useState<{ [key: string]: number }>({
    "By Industry": 0,
    Technologies: 0,
  })

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const solutionsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const aboutUsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const solutionsDropdownRef = useRef<HTMLDivElement>(null)
  const aboutUsDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true)
    }, 100)

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            setIsVisible(false)
          } else if (lastScrollY.current - currentScrollY > 5) {
            setIsVisible(true)
          }
        } else {
          setIsVisible(true)
        }

        lastScrollY.current = currentScrollY
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true })

      return () => {
        window.removeEventListener("scroll", controlNavbar)
        clearTimeout(timer)
      }
    }

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isDetailPageOpen) return

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      if (target) {
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

  // Handle click outside of mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
        setMobileSolutionsOpen(false)
        setMobileServicesOpen(false)
        setMobileAboutUsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const handleMobileSectionClick = (index: number) => {
    scrollToSection(index)
    setIsMobileMenuOpen(false)
    setMobileSolutionsOpen(false)
    setMobileServicesOpen(false)
    setMobileAboutUsOpen(false)
  }

  const handleViewAllClick = (categoryName: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    setViewAllStates((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }))
  }

  const handleCarouselNext = (categoryName: string, totalItems: number) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [categoryName]: Math.min((prev[categoryName] || 0) + 1, Math.ceil(totalItems / 9) - 1),
    }))
  }

  const handleCarouselPrev = (categoryName: string) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [categoryName]: Math.max((prev[categoryName] || 0) - 1, 0),
    }))
  }

  const handleItemClickInternal = (item: ProductSolutionItem, type: "service" | "product") => {
    onItemClick(item, type)
    setIsServicesOpen(false)
    setIsSolutionsOpen(false)
    setIsAboutUsOpen(false)
    setIsMobileMenuOpen(false)
    setMobileSolutionsOpen(false)
    setMobileServicesOpen(false)
    setMobileAboutUsOpen(false)
  }

  const handleSectionClick = (section: (typeof sections)[0]) => {
    // Close all dropdowns when a non-dropdown section is clicked
    if (!section.hasDropdown) {
      setIsServicesOpen(false)
      setIsSolutionsOpen(false)
      setIsAboutUsOpen(false)
    }
    scrollToSection(section.index)
  }

  const handleMouseEnter = (sectionName: string) => {
    if (sectionName === "Products & Solutions") {
      // Clear any pending close timeout for Solutions
      if (solutionsTimeoutRef.current) {
        clearTimeout(solutionsTimeoutRef.current)
        solutionsTimeoutRef.current = null
      }
      // Close other dropdowns
      setIsServicesOpen(false)
      setIsAboutUsOpen(false)
      setIsSolutionsOpen(true)
    } else if (sectionName === "Services") {
      // Clear any pending close timeout for Services
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current)
        servicesTimeoutRef.current = null
      }
      // Close other dropdowns
      setIsSolutionsOpen(false)
      setIsAboutUsOpen(false)
      setIsServicesOpen(true)
    } else if (sectionName === "About Us") {
      // Clear any pending close timeout for About Us
      if (aboutUsTimeoutRef.current) {
        clearTimeout(aboutUsTimeoutRef.current)
        aboutUsTimeoutRef.current = null
      }
      // Close other dropdowns
      setIsSolutionsOpen(false)
      setIsServicesOpen(false)
      setIsAboutUsOpen(true)
    } else {
      setIsSolutionsOpen(false)
      setIsServicesOpen(false)
      setIsAboutUsOpen(false)
    }
  }

  // Removed the handleMouseLeave from nav items - only use it on the dropdown itself
  // const handleMouseLeave = (sectionName: string) => {
  //   if (sectionName === "Products & Solutions") {
  //     if (solutionsTimeoutRef.current) {
  //       clearTimeout(solutionsTimeoutRef.current)
  //     }
  //     solutionsTimeoutRef.current = setTimeout(() => {
  //       setIsSolutionsOpen(false)
  //     }, 200)
  //   } else if (sectionName === "Services") {
  //     if (servicesTimeoutRef.current) {
  //       clearTimeout(servicesTimeoutRef.current)
  //     }
  //     servicesTimeoutRef.current = setTimeout(() => {
  //       setIsServicesOpen(false)
  //     }, 200)
  //   } else if (sectionName === "About Us") {
  //     if (aboutUsTimeoutRef.current) {
  //       clearTimeout(aboutUsTimeoutRef.current)
  //     }
  //     aboutUsTimeoutRef.current = setTimeout(() => {
  //       setIsAboutUsOpen(false)
  //     }, 200)
  //   }
  // }

  const handleDropdownMouseLeave = (sectionName: string) => {
    if (sectionName === "Products & Solutions") {
      if (solutionsTimeoutRef.current) {
        clearTimeout(solutionsTimeoutRef.current)
      }
      solutionsTimeoutRef.current = setTimeout(() => {
        setIsSolutionsOpen(false)
      }, 300)
    } else if (sectionName === "Services") {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current)
      }
      servicesTimeoutRef.current = setTimeout(() => {
        setIsServicesOpen(false)
      }, 300)
    } else if (sectionName === "About Us") {
      if (aboutUsTimeoutRef.current) {
        clearTimeout(aboutUsTimeoutRef.current)
      }
      aboutUsTimeoutRef.current = setTimeout(() => {
        setIsAboutUsOpen(false)
      }, 300)
    }
  }

  const handleNavigate = (path: string) => {
    router.push(`${path}`)
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const isProductsSolutionsMenuItem = (item: any): item is ProductsSolutionsMenuItem => {
    return (
      item && Array.isArray(item.items) && item.items[0] && typeof item.items[0] === "object" && "icon" in item.items[0]
    )
  }

  const renderDropdownContent = (dropdownMenu: DropdownMenuType, isProductsSolutions: boolean) => {
    if (isProductsSolutionsMenuItem(dropdownMenu[activeCategory])) {
      const currentCategory = dropdownMenu[activeCategory] as ProductsSolutionsMenuItem
      const totalItems = currentCategory.items.length
      const isIndustryCategory = currentCategory.category === "By Industry"
      const isTechnologiesCategory = currentCategory.category === "Technologies"

      const iconColors = [
        "text-blue-400",
        "text-emerald-400",
        "text-violet-400",
        "text-rose-400",
        "text-amber-400",
        "text-cyan-400",
        "text-pink-400",
        "text-lime-400",
        "text-orange-400",
        "text-teal-400",
        "text-indigo-400",
        "text-fuchsia-400",
        "text-yellow-400",
        "text-green-400",
        "text-red-400",
        "text-purple-400",
        "text-sky-400",
      ]

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
                      setCarouselIndex((prev) => ({ ...prev, [item.category]: 0 }))
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
                      const iconColor = iconColors[(startIdx + itemIdx) % iconColors.length]
                      return (
                        <button
                          key={startIdx + itemIdx}
                          onClick={() => handleItemClickInternal(item, isProductsSolutions ? "product" : "service")}
                          className="group relative p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:border-white/20 animate-fadeIn cursor-pointer text-left"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-200">
                              <Icon className={`w-5 h-5 ${iconColor}`} />
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
                    onClick={() => setCarouselIndex((prev) => ({ ...prev, [currentCategory.category]: idx }))}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentPage ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      } else {
        const showAllItems = viewAllStates[currentCategory.category]
        const displayItems = showAllItems ? currentCategory.items : currentCategory.items.slice(0, 9)
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
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-mono text-sm text-white/80 uppercase tracking-widest font-semibold">
                  {currentCategory.category}
                </h3>
                {hasMoreItems && (
                  <button
                    onClick={(e) => handleViewAllClick(currentCategory.category, e)}
                    className="text-white/70 hover:text-white text-sm font-medium transition-colors"
                  >
                    {showAllItems ? "Show Less" : "View All"}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 w-[700px]">
                {displayItems.map((item, itemIdx) => {
                  const Icon = item.icon
                  const iconColor = iconColors[itemIdx % iconColors.length]
                  return (
                    <button
                      key={itemIdx}
                      onClick={() => handleItemClickInternal(item, isProductsSolutions ? "product" : "service")}
                      className="group relative p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:border-white/20 cursor-pointer text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-200">
                          <Icon className={`w-5 h-5 ${iconColor}`} />
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
        )
      }
    }
    return null
  }

  // Added handler for desktop dropdowns
  const handleDropdownMouseEnter = (sectionName: string) => {
    if (sectionName === "Products & Solutions") {
      if (solutionsTimeoutRef.current) {
        clearTimeout(solutionsTimeoutRef.current)
        solutionsTimeoutRef.current = null
      }
      setIsSolutionsOpen(true)
    } else if (sectionName === "Services") {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current)
        servicesTimeoutRef.current = null
      }
      setIsServicesOpen(true)
    } else if (sectionName === "About Us") {
      if (aboutUsTimeoutRef.current) {
        clearTimeout(aboutUsTimeoutRef.current)
        aboutUsTimeoutRef.current = null
      }
      setIsAboutUsOpen(true)
    }
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          ${hasLoaded ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* Desktop Navigation */}
        <nav
          className="
            hidden md:block
            mx-auto
            mt-4
            px-6
            max-w-5xl
          "
        >
          <div
            className="
              relative
              flex items-center
              px-5 py-2.5
              rounded-2xl
              bg-gradient-to-r from-blue-950/30 via-purple-950/30 to-orange-950/30
              shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)]
              backdrop-blur-xl
            "
          >
            {/* Logo on left side - made bigger */}
            <button
              onClick={() => scrollToSection(0)}
              className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer flex-shrink-0"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="w-10 h-10 object-contain"
                  priority
                />
              </div>
            </button>

            {/* Desktop Menu Items - Centered */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-1 xl:gap-1">
                {sections.map((section) => (
                  <div
                    key={section.index}
                    className="relative group"
                    // ref={navItemRef}  // Removed as it's not used elsewhere
                    onMouseEnter={(e) => {
                      e.stopPropagation()
                      handleMouseEnter(section.name)
                    }}
                    // onMouseLeave={() => handleMouseLeave(section.name)} // Removed
                  >
                    <button
                      onClick={() => handleSectionClick(section)}
                      className={`
                        flex items-center gap-1
                        px-3 lg:px-4 py-2
                        font-medium text-sm text-white/90
                        hover:text-white
                        transition-all duration-200
                        rounded-xl
                        ${
                          currentSection === section.index
                            ? "bg-white/20 shadow-[inset_0_1px_3px_rgba(255,255,255,0.3)] text-white"
                            : "hover:bg-white/10"
                        }
                        whitespace-nowrap
                      `}
                    >
                      <span className="text-sm">{section.name}</span>
                      {section.hasDropdown && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            (section.name === "Products & Solutions" && isSolutionsOpen) ||
                            (section.name === "Services" && isServicesOpen) ||
                            (section.name === "About Us" && isAboutUsOpen)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacer for balance */}
            <div className="w-12 flex-shrink-0"></div>

            {/* Mobile Menu Button for desktop view (hidden) */}
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:scale-110 transition-transform duration-200 cursor-pointer"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="block md:hidden mx-3 mt-3">
          <div
            className="
              relative
              flex items-center justify-between
              px-4 py-3
              rounded-2xl
              bg-gradient-to-r from-blue-950/30 via-purple-950/30 to-orange-950/30
              border border-white/20
              shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)]
              backdrop-blur-xl
              z-50
            "
          >
            {/* Mobile Logo - Made bigger */}
            <button
              onClick={() => {
                scrollToSection(0)
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <div className="w-14 h-14 rounded-lg flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={56}
                  height={56}
                  className="w-12 h-12 object-contain"
                  priority
                />
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Desktop Dropdowns - Placed outside header to prevent clipping */}
      {isSolutionsOpen && (
        <div
          ref={solutionsDropdownRef}
          className="hidden md:block dropdown-container fixed top-20 left-1/2 -translate-x-1/2 z-[9999]"
          onMouseEnter={() => handleDropdownMouseEnter("Products & Solutions")}
          onMouseLeave={() => handleDropdownMouseLeave("Products & Solutions")}
          style={{
            pointerEvents: "auto",
          }}
        >
          <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            {renderDropdownContent(productsSolutionsMenu, true)}
          </div>
        </div>
      )}

      {isServicesOpen && (
        <div
          ref={servicesDropdownRef}
          className="hidden md:block dropdown-container fixed top-20 left-1/2 -translate-x-1/2 z-[9999]"
          onMouseEnter={() => handleDropdownMouseEnter("Services")}
          onMouseLeave={() => handleDropdownMouseLeave("Services")}
          style={{
            pointerEvents: "auto",
          }}
        >
          <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            {renderDropdownContent(servicesMenu, false)}
          </div>
        </div>
      )}

      {isAboutUsOpen && (
        <div
          ref={aboutUsDropdownRef}
          className="hidden md:block dropdown-container fixed top-20 left-1/2 -translate-x-1/2 z-[9999]"
          onMouseEnter={() => handleDropdownMouseEnter("About Us")}
          onMouseLeave={() => handleDropdownMouseLeave("About Us")}
          style={{
            pointerEvents: "auto",
          }}
        >
          <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-8 min-w-[400px]">
            <h3 className="font-mono text-sm text-white/80 mb-5 uppercase tracking-widest font-semibold">Company</h3>
            <button
              onClick={() => {
                setIsAboutUsOpen(false)
                handleNavigate("/projects")
              }}
              className="group relative w-full p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:border-white/20 cursor-pointer text-left mb-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-orange-500/20 group-hover:from-blue-500/30 group-hover:to-orange-500/30 transition-all duration-200">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm mb-1">Our Projects</h4>
                  <p className="text-white/70 text-xs leading-relaxed">
                    Explore our portfolio of successful projects and case studies.
                  </p>
                </div>
              </div>
            </button>
            <button
              onClick={() => {
                setIsAboutUsOpen(false)
                handleNavigate("/blogs")
              }}
              className="group relative w-full p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:border-white/20 cursor-pointer text-left"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-orange-500/20 group-hover:from-blue-500/30 group-hover:to-orange-500/30 transition-all duration-200">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm mb-1">Blogs</h4>
                  <p className="text-white/70 text-xs leading-relaxed">
                    Read our latest insights, articles, and industry updates.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay and Content - Placed outside header */}
      <div className="md:hidden">
        {/* Mobile Menu Overlay */}
        <div
          className={`
            fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300
            ${isMobileMenuOpen ? "opacity-100 z-[9998]" : "opacity-0 pointer-events-none -z-10"}
          `}
          onClick={() => {
            setIsMobileMenuOpen(false)
            setMobileSolutionsOpen(false)
            setMobileServicesOpen(false)
            setMobileAboutUsOpen(false)
          }}
        />

        {/* Mobile Menu Content - Slides from right */}
        <div
          ref={mobileMenuRef}
          className={`
            fixed right-0 top-0 bottom-0 w-[85vw] max-w-md
            bg-gradient-to-b from-blue-950/95 via-purple-950/95 to-orange-950/95
            border-l border-white/20
            shadow-2xl
            backdrop-blur-xl
            transition-all duration-300 ease-out
            overflow-y-auto
            ${isMobileMenuOpen ? "translate-x-0 opacity-100 z-[9999]" : "translate-x-full opacity-0 -z-10"}
          `}
        >
          {/* Mobile Menu Header with logo */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                scrollToSection(0)
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <Image src="/logo.svg" alt="Logo" width={40} height={40} className="w-8 h-8 object-contain" />
              </div>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="p-4 space-y-2">
            {sections.map((section) => (
              <div key={section.index}>
                {!section.hasDropdown ? (
                  <button
                    onClick={() => handleMobileSectionClick(section.index)}
                    className={`
                      w-full text-left px-4 py-3.5
                      font-medium text-sm text-white
                      rounded-xl
                      transition-all duration-200
                      ${
                        currentSection === section.index
                          ? "bg-white/20 shadow-lg"
                          : "bg-white/5 hover:bg-white/10 active:bg-white/15"
                      }
                    `}
                  >
                    {section.name}
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        if (section.name === "Products & Solutions") {
                          setMobileSolutionsOpen(!mobileSolutionsOpen)
                          setMobileServicesOpen(false)
                          setMobileAboutUsOpen(false)
                        } else if (section.name === "Services") {
                          setMobileServicesOpen(!mobileServicesOpen)
                          setMobileSolutionsOpen(false)
                          setMobileAboutUsOpen(false)
                        } else if (section.name === "About Us") {
                          setMobileAboutUsOpen(!mobileAboutUsOpen)
                          setMobileSolutionsOpen(false)
                          setMobileServicesOpen(false)
                        }
                      }}
                      className={`
                        w-full flex items-center justify-between px-4 py-3.5
                        font-medium text-sm text-white
                        rounded-xl
                        transition-all duration-200
                        ${
                          (section.name === "Products & Solutions" && mobileSolutionsOpen) ||
                          (section.name === "Services" && mobileServicesOpen) ||
                          (section.name === "About Us" && mobileAboutUsOpen)
                            ? "bg-white/20 shadow-lg"
                            : "bg-white/5 hover:bg-white/10 active:bg-white/15"
                        }
                      `}
                    >
                      <span>{section.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          (section.name === "Products & Solutions" && mobileSolutionsOpen) ||
                          (section.name === "Services" && mobileServicesOpen) ||
                          (section.name === "About Us" && mobileAboutUsOpen)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {/* Mobile Submenu */}
                    <div
                      className={`
                        overflow-hidden transition-all duration-300 ease-in-out
                        ${
                          (section.name === "Products & Solutions" && mobileSolutionsOpen) ||
                          (section.name === "Services" && mobileServicesOpen) ||
                          (section.name === "About Us" && mobileAboutUsOpen)
                            ? "max-h-[2000px] opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >
                      <div className="space-y-3 px-2">
                        {section.name === "Products & Solutions" &&
                          productsSolutionsMenu.map((category, idx) => (
                            <div key={idx} className="bg-white/5 rounded-lg p-3">
                              <button
                                onClick={(e) => handleViewAllClick(category.category, e)}
                                className="w-full flex items-center justify-between mb-2 px-2 py-2 hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <h4 className="font-semibold text-xs text-white/90">{category.category}</h4>
                                <ChevronDown
                                  className={`w-3 h-3 text-white/70 transition-transform duration-300 ${
                                    viewAllStates[category.category] ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              <div
                                className={`
                                  space-y-2 overflow-hidden transition-all duration-300
                                  ${viewAllStates[category.category] ? "max-h-[2000px]" : "max-h-0"}
                                `}
                              >
                                {category.items.map((item, itemIdx) => {
                                  const Icon = item.icon
                                  return (
                                    <button
                                      key={itemIdx}
                                      onClick={() => handleItemClickInternal(item, "product")}
                                      className="w-full text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all duration-200"
                                    >
                                      <div className="flex items-start gap-2">
                                        <div className="flex-shrink-0 p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-orange-500/20">
                                          <Icon className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-semibold text-white text-xs mb-1">{item.name}</h5>
                                          <p className="text-white/70 text-xs line-clamp-2">{item.description}</p>
                                        </div>
                                      </div>
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          ))}

                        {section.name === "Services" &&
                          servicesMenu.map((category, idx) => (
                            <div key={idx} className="bg-white/5 rounded-lg p-3">
                              <button
                                onClick={(e) => handleViewAllClick(category.category, e)}
                                className="w-full flex items-center justify-between mb-2 px-2 py-2 hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <h4 className="font-semibold text-xs text-white/90">{category.category}</h4>
                                <ChevronDown
                                  className={`w-3 h-3 text-white/70 transition-transform duration-300 ${
                                    viewAllStates[category.category] ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              <div
                                className={`
                                  space-y-2 overflow-hidden transition-all duration-300
                                  ${viewAllStates[category.category] ? "max-h-[2000px]" : "max-h-0"}
                                `}
                              >
                                {category.items.map((item, itemIdx) => {
                                  const Icon = item.icon
                                  return (
                                    <button
                                      key={itemIdx}
                                      onClick={() => handleItemClickInternal(item, "service")}
                                      className="w-full text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all duration-200"
                                    >
                                      <div className="flex items-start gap-2">
                                        <div className="flex-shrink-0 p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-orange-500/20">
                                          <Icon className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-semibold text-white text-xs mb-1">{item.name}</h5>
                                          <p className="text-white/70 text-xs line-clamp-2">{item.description}</p>
                                        </div>
                                      </div>
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          ))}

                        {section.name === "About Us" && (
                          <div className="space-y-2 px-2">
                            <button
                              onClick={() => {
                                handleNavigate("/projects")
                                setIsMobileMenuOpen(false)
                              }}
                              className="w-full text-left px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all duration-200"
                            >
                              <div className="flex items-center gap-2">
                                <Users className="w-3.5 h-3.5 text-white/70" />
                                <span className="text-white text-xs font-medium">Our projects</span>
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                handleNavigate("/blogs")
                                setIsMobileMenuOpen(false)
                              }}
                              className="w-full text-left px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all duration-200"
                            >
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-3.5 h-3.5 text-white/70" />
                                <span className="text-white text-xs font-medium">Blogs</span>
                              </div>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Click outside handler for desktop dropdowns */}
      {(isServicesOpen || isSolutionsOpen || isAboutUsOpen) && (
        <div
          className="hidden md:block fixed inset-0 z-[9997]"
          onClick={() => {
            setIsServicesOpen(false)
            setIsSolutionsOpen(false)
            setIsAboutUsOpen(false)
          }}
        />
      )}
    </>
  )
}
