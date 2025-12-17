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
    Technologies: false,
  })
  const [carouselIndex, setCarouselIndex] = useState<{ [key: string]: number }>({
    "By Industry": 0,
    Technologies: 0,
  })

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

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
    setIsServicesOpen(false)
    setIsSolutionsOpen(false)
    setIsAboutUsOpen(false)

    scrollToSection(section.index)
  }

  const handleMouseEnter = (sectionName: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    hoverTimeoutRef.current = setTimeout(() => {
      if (sectionName === "Products & Solutions") {
        setIsSolutionsOpen(true)
        setIsServicesOpen(false)
        setIsAboutUsOpen(false)
      } else if (sectionName === "Services") {
        setIsServicesOpen(true)
        setIsSolutionsOpen(false)
        setIsAboutUsOpen(false)
      } else if (sectionName === "About Us") {
        setIsAboutUsOpen(true)
        setIsServicesOpen(false)
        setIsSolutionsOpen(false)
      }
    }, 100)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
      setIsSolutionsOpen(false)
      setIsAboutUsOpen(false)
    }, 200)
  }

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }

  const handleDropdownMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
      setIsSolutionsOpen(false)
      setIsAboutUsOpen(false)
    }, 200)
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
                      return (
                        <button
                          key={startIdx + itemIdx}
                          onClick={() => handleItemClickInternal(item, isProductsSolutions ? "product" : "service")}
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
                  return (
                    <button
                      key={itemIdx}
                      onClick={() => handleItemClickInternal(item, isProductsSolutions ? "product" : "service")}
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
            </div>
          </div>
        )
      }
    }
    return null
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
            max-w-7xl
          "
        >
          <div
            className="
              relative
              flex items-center justify-between
              px-6 py-3
              rounded-3xl
              bg-gradient-to-r from-blue-950/30 via-purple-950/30 to-orange-950/30
            
              shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)]
              backdrop-blur-xl
            "
          >
            <button
              onClick={() => scrollToSection(0)}
              className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 ml-10 gap-3 flex items-center justify-center">
                {/* <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                     <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                    className="w-8 h-8 object-contain"
                  />
                </div> */}
                <span className="relative flex items-center gap-2 z-10 text-xl uppercase leading-tight font-montserrat">
                     <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="block font-extrabold tracking-wide text-white">QWICKBIT</span>
                </span>
              </div>
            </button>

            {/* Desktop Menu Items */}
            <div className="hidden md:flex items-center gap-1 xl:gap-2">
              {sections.map((section) => (
                <div
                  key={section.index}
                  className="relative group"
                  onMouseEnter={() => section.hasDropdown && handleMouseEnter(section.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleSectionClick(section)}
                    className={`
                      flex items-center gap-1.5
                      px-4 lg:px-5 py-2.5
                      font-medium text-sm lg:text-base text-white/90
                      hover:text-white
                      transition-all duration-200
                      rounded-2xl
                      ${
                        currentSection === section.index
                          ? "bg-white/20 shadow-[inset_0_1px_3px_rgba(255,255,255,0.3)] text-white"
                          : "hover:bg-white/10"
                      }
                      whitespace-nowrap
                    `}
                  >
                    <span>{section.name}</span>
                    {section.hasDropdown && (
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Desktop Right Side Actions */}
            <div className="hidden md:flex items-center gap-3"></div>

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
            "
          >
            {/* Mobile Logo - Updated to match desktop */}
            <button
              onClick={() => {
                scrollToSection(0)
                setIsMobileMenuOpen(false)
              }}
              className="flex items-center gap-2 flex-shrink-0"
            >
              <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                       <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={20}
                    height={20}
                    className="w-8 h-8 object-contain"
                  />
              </div>
              <span className="font-bold text-white text-base">QWICKBIT</span>
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

        {/* Mobile Menu Overlay */}
        <div
          className={`
            fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden
            transition-opacity duration-300
            ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          onClick={() => {
            setIsMobileMenuOpen(false)
            setMobileSolutionsOpen(false)
            setMobileServicesOpen(false)
            setMobileAboutUsOpen(false)
          }}
        />

        {/* Mobile Menu Content */}
        <div
          ref={mobileMenuRef}
          className={`
            fixed left-0 right-0 top-[68px] z-50 md:hidden
            mx-3
            rounded-2xl
            bg-gradient-to-br from-blue-950/95 via-purple-950/95 to-orange-950/95
            border border-white/20
            shadow-2xl
            backdrop-blur-xl
            transition-all duration-300 ease-out
            ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}
            max-h-[calc(100vh-88px)]
            overflow-y-auto
          `}
        >
          <div className="p-4 space-y-2">
            {sections.map((section) => (
              <div key={section.index}>
                {!section.hasDropdown ? (
                  <button
                    onClick={() => handleMobileSectionClick(section.index)}
                    className={`
                      w-full text-left px-4 py-3.5
                      font-medium text-base text-white
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
                        font-medium text-base text-white
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
                        className={`w-5 h-5 transition-transform duration-300 ${
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
                                <h4 className="font-semibold text-sm text-white/90">{category.category}</h4>
                                <ChevronDown
                                  className={`w-4 h-4 text-white/70 transition-transform duration-300 ${
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
                                      className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all duration-200"
                                    >
                                      <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-orange-500/20">
                                          <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-semibold text-white text-sm mb-1">{item.name}</h5>
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
                                <h4 className="font-semibold text-sm text-white/90">{category.category}</h4>
                                <ChevronDown
                                  className={`w-4 h-4 text-white/70 transition-transform duration-300 ${
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
                                      className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all duration-200"
                                    >
                                      <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-orange-500/20">
                                          <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-semibold text-white text-sm mb-1">{item.name}</h5>
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
                              className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all duration-200"
                            >
                              <div className="flex items-center gap-3">
                                <Users className="w-4 h-4 text-white/70" />
                                <span className="text-white text-sm font-medium">Our projects</span>
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                handleNavigate("/blogs")
                                setIsMobileMenuOpen(false)
                              }}
                              className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all duration-200"
                            >
                              <div className="flex items-center gap-3">
                                <Briefcase className="w-4 h-4 text-white/70" />
                                <span className="text-white text-sm font-medium">Blogs</span>
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

        {isSolutionsOpen && (
          <div
            className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
              {renderDropdownContent(productsSolutionsMenu, true)}
            </div>
          </div>
        )}

        {isServicesOpen && (
          <div
            className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
              {renderDropdownContent(servicesMenu, false)}
            </div>
          </div>
        )}

        {isAboutUsOpen && (
          <div
            className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
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
      </header>

      {(isServicesOpen || isSolutionsOpen || isAboutUsOpen) && (
        <div
          className="fixed inset-0 z-40"
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