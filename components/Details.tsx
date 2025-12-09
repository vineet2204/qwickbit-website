"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { X, ChevronLeft, ChevronRight, CheckCircle, ArrowRight, ExternalLink, Clock, DollarSign, Users, Zap, Globe, Shield } from 'lucide-react'
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"

interface DetailPageProps {
  isOpen: boolean
  onClose: () => void
  item: {
    name: string
    description: string
    icon: any
  } | null
  type: 'service' | 'product'
}

const getDetailedContent = (name: string, type: string) => {
  const content: any = {
    'Web Development': {
      title: 'Web Development',
      subtitle: 'Custom web applications built with modern frameworks',
      overview: 'We create scalable, high-performance web applications that drive business growth. Our solutions combine cutting-edge technologies with best practices in UX design and security.',
      features: [
        'Responsive & Mobile-First Design',
        'Progressive Web Apps (PWA)',
        'API Integration & Development',
        'Cloud-Native Architecture',
        'Performance Optimization',
        'Security & Compliance'
      ],
      benefits: [
        'Faster time to market',
        'Scalable infrastructure',
        'Enhanced user experience',
        'Reduced maintenance costs'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      useCases: [
        'E-commerce platforms',
        'SaaS applications',
        'Enterprise portals',
        'Customer dashboards'
      ],
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w-800&q=80',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80'
      ],
      process: [
        'Discovery & Planning',
        'UI/UX Design',
        'Development',
        'Testing & QA',
        'Deployment',
        'Maintenance'
      ],
      timeline: '6-12 weeks',
      pricing: 'Custom quote based on scope'
    },
    'Software Development': {
      title: 'Software Development',
      subtitle: 'End-to-end software solutions tailored to your business',
      overview: 'Transform your business processes with custom software solutions. We deliver enterprise-grade applications that streamline operations and drive digital transformation.',
      features: [
        'Custom Software Architecture',
        'Microservices Development',
        'Database Design & Optimization',
        'Third-party Integrations',
        'Automated Testing & CI/CD',
        'Technical Documentation'
      ],
      benefits: [
        'Improved operational efficiency',
        'Better data management',
        'Seamless integrations',
        'Future-proof technology stack'
      ],
      technologies: ['Java', 'Python', '.NET', 'Kubernetes', 'PostgreSQL', 'Redis'],
      useCases: [
        'Business process automation',
        'Legacy system modernization',
        'Data management systems',
        'Workflow automation'
      ],
      images: [
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80'
      ],
      process: [
        'Requirements Analysis',
        'System Design',
        'Implementation',
        'Testing',
        'Deployment',
        'Support'
      ],
      timeline: '3-6 months',
      pricing: 'From $50,000'
    },
    'Mobile App Development': {
      title: 'Mobile App Development',
      subtitle: 'Native and cross-platform mobile solutions',
      overview: 'Build engaging mobile experiences that users love. Our mobile apps combine beautiful design with powerful functionality across iOS and Android platforms.',
      features: [
        'Native iOS & Android Development',
        'Cross-platform Solutions (React Native)',
        'Offline Functionality',
        'Push Notifications',
        'In-app Purchases',
        'Analytics Integration'
      ],
      benefits: [
        'Reach mobile-first audience',
        'Enhanced customer engagement',
        'New revenue streams',
        'Brand visibility'
      ],
      technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase', 'App Store APIs'],
      useCases: [
        'Consumer mobile apps',
        'Enterprise mobile solutions',
        'On-demand services',
        'Fitness & health apps'
      ],
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
        'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80'
      ],
      process: [
        'Market Research',
        'Wireframing',
        'Development',
        'Testing',
        'App Store Submission',
        'Updates'
      ],
      timeline: '8-16 weeks',
      pricing: 'From $30,000'
    },
    'UI/UX Design': {
      title: 'UI/UX Design',
      subtitle: 'User-centered design that creates engaging experiences',
      overview: 'Create memorable digital experiences with our user-centered design approach. We combine research, creativity, and best practices to deliver interfaces that users love.',
      features: [
        'User Research & Testing',
        'Wireframing & Prototyping',
        'Visual Design Systems',
        'Interaction Design',
        'Accessibility Standards',
        'Design System Development'
      ],
      benefits: [
        'Higher user satisfaction',
        'Increased conversion rates',
        'Reduced support costs',
        'Stronger brand identity'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer', 'Principle'],
      useCases: [
        'Website redesigns',
        'Mobile app interfaces',
        'Dashboard design',
        'Design system creation'
      ],
      images: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
        'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80'
      ],
      process: [
        'Discovery',
        'User Research',
        'Wireframing',
        'Visual Design',
        'Prototyping',
        'Handoff'
      ],
      timeline: '4-8 weeks',
      pricing: 'From $15,000'
    },
    'CRM': {
      title: 'CRM Solution',
      subtitle: 'Integrated CRM with efficient process management',
      overview: 'Streamline your customer relationships with our comprehensive CRM solution. Manage leads, track interactions, and drive sales growth with powerful automation and analytics.',
      features: [
        'Lead Management & Scoring',
        'Sales Pipeline Automation',
        'Customer Interaction Tracking',
        'Email Marketing Integration',
        'Advanced Analytics & Reports',
        'Mobile CRM Access'
      ],
      benefits: [
        '360° customer view',
        'Improved sales productivity',
        'Better customer retention',
        'Data-driven decisions'
      ],
      technologies: ['Salesforce', 'HubSpot', 'Custom CRM', 'AI/ML', 'APIs', 'Cloud'],
      useCases: [
        'B2B sales teams',
        'Customer support',
        'Marketing automation',
        'Account management'
      ],
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80'
      ],
      process: [
        'Needs Assessment',
        'Customization',
        'Data Migration',
        'Training',
        'Go Live',
        'Ongoing Support'
      ],
      timeline: '4-10 weeks',
      pricing: 'From $25,000'
    },
    'B2B OMS': {
      title: 'B2B Order Management System',
      subtitle: 'Simplified B2B order management & payments',
      overview: 'Optimize your B2B operations with our intelligent order management system. Handle complex pricing, bulk orders, and multi-channel sales with ease.',
      features: [
        'Multi-channel Order Processing',
        'Inventory Management',
        'Custom Pricing & Discounts',
        'Payment Gateway Integration',
        'Order Tracking & Fulfillment',
        'Automated Invoicing'
      ],
      benefits: [
        'Reduced order processing time',
        'Better inventory control',
        'Improved customer satisfaction',
        'Streamlined operations'
      ],
      technologies: ['ERP Integration', 'Payment APIs', 'Cloud', 'Microservices', 'Analytics'],
      useCases: [
        'Wholesale distributors',
        'Manufacturing companies',
        'B2B marketplaces',
        'Supply chain management'
      ],
      images: [
        'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&q=80',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
      ],
      process: [
        'Workflow Analysis',
        'System Design',
        'Integration Setup',
        'Testing',
        'Training',
        'Support'
      ],
      timeline: '8-16 weeks',
      pricing: 'From $35,000'
    },
    'Conversational AI': {
      title: 'Conversational AI',
      subtitle: 'Intelligent chatbots and virtual assistants',
      overview: 'Transform customer engagement with AI-powered conversational interfaces. Our solutions understand natural language and provide intelligent, context-aware responses 24/7.',
      features: [
        'Natural Language Processing',
        'Multi-language Support',
        'Intent Recognition',
        'Context Management',
        'Human Handoff',
        'Analytics Dashboard'
      ],
      benefits: [
        '24/7 customer support',
        'Reduced support costs',
        'Faster response times',
        'Improved customer satisfaction'
      ],
      technologies: ['GPT-4', 'BERT', 'Dialogflow', 'Rasa', 'TensorFlow', 'PyTorch'],
      useCases: [
        'Customer service automation',
        'Sales assistance',
        'IT helpdesk',
        'Virtual shopping assistants'
      ],
      images: [
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=800&q=80'
      ],
      process: [
        'Use Case Definition',
        'Model Training',
        'Integration',
        'Testing',
        'Deployment',
        'Optimization'
      ],
      timeline: '6-12 weeks',
      pricing: 'From $20,000'
    }
  }

  return content[name] || {
    title: name,
    subtitle: 'Innovative solutions for modern businesses',
    overview: `Discover how our ${name} solution can transform your business operations and drive growth.`,
    features: [
      'Industry-leading technology',
      'Scalable architecture',
      'Expert support',
      'Continuous innovation'
    ],
    benefits: [
      'Increased efficiency',
      'Cost reduction',
      'Better insights',
      'Competitive advantage'
    ],
    technologies: ['Modern Stack', 'Cloud Native', 'AI/ML', 'APIs'],
    useCases: [
      'Enterprise solutions',
      'Growing businesses',
      'Digital transformation',
      'Process automation'
    ],
    images: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80'
    ],
    process: [
      'Discovery',
      'Planning',
      'Development',
      'Testing',
      'Deployment',
      'Support'
    ],
    timeline: 'Custom',
    pricing: 'Contact for quote'
  }
}

export function DetailPage({ isOpen, onClose, item, type }: DetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (item) {
      setCurrentImageIndex(0)
      setIsVisible(true)
    }
  }, [item])

  useEffect(() => {
    if (isOpen && item) {
      document.body.style.overflow = 'hidden'
      setIsLoaded(true)
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = 'unset'
      }, 300)
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, item])

  const nextImage = () => {
    if (!item) return
    const content = getDetailedContent(item.name, type)
    setCurrentImageIndex((prev) => 
      prev === content.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    if (!item) return
    const content = getDetailedContent(item.name, type)
    setCurrentImageIndex((prev) => 
      prev === 0 ? content.images.length - 1 : prev - 1
    )
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isOpen || !item) return null

  const content = getDetailedContent(item.name, type)
  const Icon = item.icon

  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <CustomCursor />
      <GrainOverlay />

      {/* Fluid Effect Background */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.5}
            detail={0.6}
            blend={40}
            coarseX={20}
            coarseY={20}
            mediumX={20}
            mediumY={20}
            fineX={20}
            fineY={20}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.7}
            radius={1.5}
            momentum={20}
            maskType="alpha"
            opacity={0.95}
          />
        </Shader>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Main Container - Fits within screen */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 z-40">
        <div 
          ref={contentRef}
          className="relative w-full max-w-[1600px] h-full max-h-[95vh] bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 md:p-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md z-50"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Main Content Area with Scroll */}
          <div className="h-full overflow-y-auto overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative p-6 md:p-8 lg:p-12">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
                  <div className="lg:w-2/3">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-orange-500/20 backdrop-blur-md border border-white/20">
                        <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md mb-2">
                          <span className="text-xs md:text-sm font-mono text-white/80 uppercase tracking-wider">
                            {type === 'service' ? 'Service' : 'Product Solution'}
                          </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                          {content.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80">
                          {content.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-lg text-white/90 leading-relaxed max-w-3xl mb-8">
                      {content.overview}
                    </p>

              
                  </div>

                  {/* Image Gallery */}
                  <div className="lg:w-1/3">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 bg-black/20 backdrop-blur-md">
                      <img
                        src={content.images[currentImageIndex]}
                        alt={`${content.title} showcase ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all backdrop-blur-md z-10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all backdrop-blur-md z-10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {content.images.map((_: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 backdrop-blur-md ${
                              idx === currentImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {content.images.slice(0, 3).map((img: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative aspect-square rounded-lg overflow-hidden border transition-all duration-300 ${
                            idx === currentImageIndex 
                              ? 'border-white ring-2 ring-white/30' 
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex overflow-x-auto py-4 mb-8 border-b border-white/10">
                  <div className="flex gap-2">
                    {['overview', 'features', 'benefits', 'technologies', 'usecases'].map((section) => (
                      <button
                        key={section}
                        onClick={() => {
                          setActiveSection(section)
                          const element = document.getElementById(section)
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }
                        }}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                          activeSection === section
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scrollable Content Sections */}
              <div className="space-y-16 pb-20">
                {/* Features Section */}
                <section id="features" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Key Features</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {content.features.map((feature: string, idx: number) => (
                      <div
                        key={idx}
                        className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-white font-semibold text-lg">{feature}</h3>
                        </div>
                        <p className="text-white/70 text-sm">
                          Professional implementation with industry best practices and comprehensive support.
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <Shield className="w-8 h-8 text-green-400" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Business Benefits</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {content.benefits.map((benefit: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 rounded-lg ${
                            idx % 3 === 0 ? 'bg-blue-500/20' : 
                            idx % 3 === 1 ? 'bg-purple-500/20' : 
                            'bg-green-500/20'
                          }`}>
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-white font-semibold text-xl">{benefit}</h3>
                        </div>
                        <p className="text-white/70">
                          Achieve measurable results with our proven implementation approach and continuous support.
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Technologies Section - Horizontal Scroll */}
                <section id="technologies" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <Globe className="w-8 h-8 text-blue-400" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Technology Stack</h2>
                  </div>
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-4 min-w-max">
                      {content.technologies.map((tech: string, idx: number) => (
                        <div
                          key={idx}
                          className="group flex-shrink-0 w-64 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${
                              idx % 4 === 0 ? 'bg-blue-500/20' : 
                              idx % 4 === 1 ? 'bg-purple-500/20' : 
                              idx % 4 === 2 ? 'bg-green-500/20' : 
                              'bg-orange-500/20'
                            }`}>
                              <ExternalLink className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm text-white/60 font-mono">Expert Level</span>
                          </div>
                          <h3 className="text-white font-bold text-xl mb-3">{tech}</h3>
                          <p className="text-white/70 text-sm mb-4">
                            Professional implementation with best practices and optimization.
                          </p>
                          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                idx % 4 === 0 ? 'bg-blue-500' : 
                                idx % 4 === 1 ? 'bg-purple-500' : 
                                idx % 4 === 2 ? 'bg-green-500' : 
                                'bg-orange-500'
                              }`}
                              style={{ width: `${85 + Math.random() * 15}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

            

                {/* Use Cases */}
                <section id="usecases" className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-8">
                    <Users className="w-8 h-8 text-purple-400" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Industry Use Cases</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {content.useCases.map((useCase: string, idx: number) => (
                      <div
                        key={idx}
                        className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className={`p-3 rounded-lg mb-4 ${
                          idx % 4 === 0 ? 'bg-blue-500/20' : 
                          idx % 4 === 1 ? 'bg-purple-500/20' : 
                          idx % 4 === 2 ? 'bg-green-500/20' : 
                          'bg-orange-500/20'
                        }`}>
                          <div className="w-6 h-6 flex items-center justify-center">
                            <span className="text-white font-bold">{idx + 1}</span>
                          </div>
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-3">{useCase}</h3>
                        <p className="text-white/70 text-sm">
                          Perfect solution for businesses looking to streamline operations and drive growth.
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* CTA Section */}
                <section className="scroll-mt-24">
                  <div className="p-8 md:p-12 rounded-3xl border border-white/20 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-orange-500/10 backdrop-blur-md">
                    <div className="text-center max-w-3xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Business?
                      </h2>
                      <p className="text-xl text-white/80 mb-8">
                        Schedule a personalized demo to see how our {content.title} solution can drive your success.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={handleClose}
                          className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 duration-300"
                        >
                          Book a Demo
                        </button>
                    
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
            <div className="w-2 h-2 animate-pulse rounded-full bg-white/60" />
            <span className="text-xs text-white/60 font-mono">Scroll to explore</span>
          </div>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 transition-all duration-300"
              style={{ 
                width: contentRef.current 
                  ? `${(contentRef.current.scrollTop / (contentRef.current.scrollHeight - contentRef.current.clientHeight)) * 100}%` 
                  : '0%' 
              }}
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-y-auto::-webkit-scrollbar,
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-y-auto,
        .overflow-x-auto {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for main container */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.2) transparent;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.2);
          border-radius: 3px;
        }
      `}</style>
    </div>
  )
}