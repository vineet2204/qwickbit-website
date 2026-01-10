import React, { useState, useEffect, useRef } from 'react'
import {
  Close, ChevronLeft, ChevronRight, CheckCircle, Bolt, Security, Public, People,
  // Tech icons
  Code, Storage, Cloud, Terminal, DataObject, Api, Coffee, Adb, DesktopWindows,
  Apps, Settings, Smartphone, Apple, Android, LocalFireDepartment, Brush,
  Palette as PaletteIcon, Gesture, Visibility, PanTool, Store, Hub,
  Business, Psychology, Link, CloudQueue, PsychologyAlt, MenuBook, Chat,
  Android as Robot, ShowChart, Whatshot, AccountTree, CreditCard, PieChart,
  // General icons
  BusinessCenter, ShoppingCart, ChatBubble, Dashboard, Description, PhoneAndroid,
  AutoAwesome, TrackChanges, FlashOn, VerifiedUser, Language, Group,
  DeviceHub, Inventory, SmartToy, DataArray
} from '@mui/icons-material'

interface DetailPageProps {
  isOpen: boolean
  onClose: () => void
  item: {
    name: string
    description: string
    icon: React.ComponentType<{ className?: string }>
  } | null
  type: 'service' | 'product'
}

const getDetailedContent = (name: string) => {
  const content: Record<string, {
    title: string
    subtitle: string
    overview: string
    features: string[]
    benefits: string[]
    technologies: string[]
    useCases: string[]
    image: string
  }> = {
    'Web Development': {
      title: 'Web Development',
      subtitle: 'Professional implementation with best practices',
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
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
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
      technologies: ['ERP Integration', 'Payment APIs', 'Cloud', 'Microservices', 'Analytics', 'React'],
      useCases: [
        'Wholesale distributors',
        'Manufacturing companies',
        'B2B marketplaces',
        'Supply chain management'
      ],
      image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&q=80'
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
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80'
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
      'Continuous innovation',
      'Custom integrations',
      'Comprehensive training'
    ],
    benefits: [
      'Increased efficiency',
      'Cost reduction',
      'Better insights',
      'Competitive advantage'
    ],
    technologies: ['Modern Stack', 'Cloud Native', 'AI/ML', 'APIs', 'Docker', 'React'],
    useCases: [
      'Enterprise solutions',
      'Growing businesses',
      'Digital transformation',
      'Process automation'
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
  }
}

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'React': Code,
  'Next.js': Storage,
  'Node.js': Terminal,
  'TypeScript': DataObject,
  'AWS': Cloud,
  'Docker': Api,
  'Java': Coffee,
  'Python': Adb,
  '.NET': DesktopWindows,
  'Kubernetes': Apps,
  'PostgreSQL': Storage,
  'Redis': Settings,
  'React Native': Smartphone,
  'Swift': Apple,
  'Kotlin': Android,
  'Flutter': PhoneAndroid,
  'Firebase': LocalFireDepartment,
  'Figma': Brush,
  'Adobe XD': PaletteIcon,
  'Sketch': Gesture,
  'InVision': Visibility,
  'Framer': FlashOn,
  'Principle': AutoAwesome,
  'Salesforce': Store,
  'HubSpot': Hub,
  'Custom CRM': BusinessCenter,
  'AI/ML': Psychology,
  'APIs': Link,
  'Cloud': CloudQueue,
  'GPT-4': PsychologyAlt,
  'BERT': MenuBook,
  'Dialogflow': Chat,
  'Rasa': Robot,
  'TensorFlow': ShowChart,
  'PyTorch': Whatshot,
  'ERP Integration': DeviceHub,
  'Payment APIs': CreditCard,
  'Microservices': AccountTree,
  'Analytics': PieChart,
  'Modern Stack': Code,
  'Cloud Native': Cloud,
  'App Store APIs': Smartphone
}

// Fallback icon for unknown technologies
const FallbackIcon = DataArray

export function DetailPage({ isOpen, onClose, item, type }: DetailPageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const techScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && item) {
      document.body.style.overflow = 'hidden'
      setIsVisible(true)
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => {
        document.body.style.overflow = 'unset'
      }, 300)
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, item])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const scrollTech = (direction: 'left' | 'right') => {
    if (techScrollRef.current) {
      const scrollAmount = 200
      techScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (!isOpen || !item) return null

  const content = getDetailedContent(item.name)
  const Icon = item.icon

  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Dark overlay background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-black" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-black" />

      {/* Main Container */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div 
          ref={contentRef}
          className="relative w-full max-w-6xl h-full max-h-[95vh] bg-black backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs  text-white/80 bg-white/10 rounded-full uppercase tracking-wider">
                {type === 'service' ? 'Service' : 'Product'}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-white ">{content.title}</span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Close className="w-5 h-5 text-white/80" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="h-[calc(100%-65px)] overflow-y-auto px-6 md:px-12 py-8 space-y-12">
            {/* Hero Section - Centered */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-300/20 to-orange-300/20 border border-white/10 mb-6">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl  text-white mb-4">
                {content.title}
              </h1>
              <p className="text-xl text-white/70 mb-6">
                 {content.subtitle}
              </p>
              <p className="text-white/60 leading-relaxed">
                {content.overview}
              </p>
            </div>

            {/* Featured Image */}
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={content.image}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Key Features */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Bolt className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl  text-white">Key Features</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white  mb-1">{feature}</h3>
                        <p className="text-white/50 text-sm">Professional implementation with best practices.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Business Benefits */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Security className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl  text-white">Business Benefits</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {content.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        idx === 0 ? 'bg-blue-500/20' : 
                        idx === 1 ? 'bg-purple-500/20' : 
                        idx === 2 ? 'bg-green-500/20' : 
                        'bg-orange-500/20'
                      }`}>
                        <CheckCircle className={`w-6 h-6 ${
                          idx === 0 ? 'text-blue-400' : 
                          idx === 1 ? 'text-purple-400' : 
                          idx === 2 ? 'text-green-400' : 
                          'text-orange-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-white  text-lg">{benefit}</h3>
                        <p className="text-white/50 text-sm mt-1">Achieve measurable results with our proven approach.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Technology Stack - Horizontal Scroll */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Public className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl  text-white">Technology Stack</h2>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => scrollTech('left')}
                    className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white/80" />
                  </button>
                  <button 
                    onClick={() => scrollTech('right')}
                    className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white/80" />
                  </button>
                </div>
              </div>
              <div 
                ref={techScrollRef}
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {content.technologies.map((tech, idx) => {
                  const TechIcon = techIcons[tech] || FallbackIcon
                  return (
                    <div key={idx} className="flex-shrink-0 flex flex-col items-center gap-3">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center border border-white/10 ${
                        idx % 4 === 0 ? 'bg-blue-500/20' : 
                        idx % 4 === 1 ? 'bg-purple-500/20' : 
                        idx % 4 === 2 ? 'bg-green-500/20' : 
                        'bg-orange-500/20'
                      }`}>
                        <TechIcon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-white/80 text-sm  whitespace-nowrap">{tech}</span>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Industry Use Cases */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <People className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl  text-white">Industry Use Cases</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {content.useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center  text-white ${
                        idx === 0 ? 'bg-blue-500/30' : 
                        idx === 1 ? 'bg-purple-500/30' : 
                        idx === 2 ? 'bg-green-500/30' : 
                        'bg-orange-500/30'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-white  mb-1">{useCase}</h3>
                        <p className="text-white/50 text-sm">Perfect solution for streamlined operations and growth.</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
         <section className="pb-4">
  <div
    className="p-6 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden"
    style={{
      background:
        "linear-gradient(232.81deg, #2C60AB 25.76%, #AD7A3D 92.62%)",
    }}
  >
    <div className="text-center max-w-2xl mx-auto relative z-10">
      <h2 className="text-3xl md:text-4xl text-white mb-4 leading-tight">
        Ready To Transform<br />Your Business?
      </h2>

      <p className="text-lg text-white/80 mb-6 leading-relaxed">
        Schedule a personalized demo to see how our {content.title} solution can drive your success.
      </p>

      <button
        onClick={handleClose}
        className="px-8 py-3 rounded-full bg-white text-slate-900 text-base hover:bg-white/95 hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Book A Demo
      </button>
    </div>
  </div>
</section>

          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default DetailPage