import React, { useState, useEffect } from 'react'
import { X, CheckCircle, ArrowRight } from 'lucide-react'
import DynamicForm from './ContactForm'
import { createPortal } from 'react-dom'

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

interface Stat {
  value: string
  unit: string
  label: string
}

const getDetailedContent = (name: string) => {
  const content: Record<string, {
    title: string
    subtitle: string
    category: string
    description: string
    image: string
    background: string
    problem: string
    solution: string
    approach: string[]
    result: string
    features: string[]
    benefits: string[]
    technologies: string[]
    useCases: string[]
    stats: Stat[]
  }> = {
    'Web Development': {
      title: 'Web Development',
      subtitle: 'Professional implementation with best practices',
      category: 'Web Development Services',
      description: 'Professional web development services that create scalable, high-performance applications',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=600&fit=crop',
      background: 'Modern businesses need web applications that can scale, perform well, and provide exceptional user experiences across all devices.',
      problem: 'Many businesses struggle with slow websites, poor mobile experiences, security vulnerabilities, and applications that can\'t scale with growth.',
      solution: 'We create scalable, high-performance web applications using cutting-edge technologies and best practices in UX design, security, and performance optimization.',
      approach: [
        'Implement responsive & mobile-first design principles',
        'Build progressive web apps with offline capabilities',
        'Create cloud-native architecture for scalability',
        'Optimize performance with advanced caching strategies'
      ],
      result: 'Faster time to market with 50% improvement in load times, scalable infrastructure that handles 10x traffic growth, and enhanced user experience leading to 45% increase in conversion rates.',
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
      stats: [
        { value: '50', unit: '%', label: 'Improvement in load times' },
        { value: '10x', unit: '', label: 'Traffic growth capacity' },
        { value: '45', unit: '%', label: 'Increase in conversions' },
        { value: '99.9', unit: '%', label: 'Uptime guarantee' },
        { value: '60', unit: '%', label: 'Faster development' },
        { value: '40', unit: '%', label: 'Cost reduction' }
      ]
    },
    'Mobile App Development': {
      title: 'Mobile App Development',
      subtitle: 'Native and cross-platform mobile solutions',
      category: 'Mobile Development Services',
      description: 'Build engaging mobile experiences that users love across iOS and Android platforms',
      image: '/details/mob.jpg',
      background: 'Mobile-first consumers expect seamless, intuitive experiences. Businesses need apps that work flawlessly across all devices.',
      problem: 'Developing for multiple platforms is expensive and time-consuming. Many apps suffer from poor performance, crashes, and low user retention.',
      solution: 'We build engaging mobile experiences using React Native for cross-platform efficiency or native development for maximum performance, combined with beautiful design.',
      approach: [
        'Develop cross-platform solutions with React Native',
        'Implement offline functionality for better UX',
        'Integrate push notifications and analytics',
        'Build secure in-app purchase systems'
      ],
      result: 'Reduced development costs by 40%, achieved 4.8+ star ratings, and increased user retention by 65% with smooth, engaging experiences.',
      features: [
        'Native iOS & Android Development',
        'Cross-platform Solutions',
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
      stats: [
        { value: '40', unit: '%', label: 'Development cost reduction' },
        { value: '4.8', unit: '/5', label: 'Average app rating' },
        { value: '65', unit: '%', label: 'Increase in user retention' },
        { value: '2M', unit: '+', label: 'Active users' },
        { value: '50', unit: '%', label: 'Cross-platform efficiency' },
        { value: '99', unit: '%', label: 'Crash-free sessions' }
      ]
    },
    'UI/UX Design': {
      title: 'UI/UX Design',
      subtitle: 'User-centered design that creates engaging experiences',
      category: 'Design Services',
      description: 'Create memorable digital experiences with research-driven, user-centered design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&h=600&fit=crop',
      background: 'Great products need great design. Users expect intuitive, beautiful interfaces that make complex tasks simple.',
      problem: 'Poor design leads to confused users, low conversion rates, high support costs, and weak brand perception.',
      solution: 'We create memorable digital experiences combining user research, creativity, and best practices to deliver interfaces that users love and businesses benefit from.',
      approach: [
        'Conduct comprehensive user research and testing',
        'Create interactive wireframes and prototypes',
        'Develop comprehensive visual design systems',
        'Ensure WCAG accessibility compliance'
      ],
      result: 'Achieved 80% increase in user satisfaction, 55% improvement in conversion rates, and 45% reduction in support costs through intuitive design.',
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
      stats: [
        { value: '80', unit: '%', label: 'Increase in user satisfaction' },
        { value: '55', unit: '%', label: 'Improvement in conversions' },
        { value: '45', unit: '%', label: 'Reduction in support costs' },
        { value: '100', unit: '+', label: 'Projects completed' },
        { value: '3x', unit: '', label: 'Faster design iteration' },
        { value: '95', unit: '%', label: 'Client satisfaction rate' }
      ]
    },
    'CRM': {
      title: 'CRM Solution',
      subtitle: 'Centralized system for customer relationship optimization',
      category: 'CRM Platform',
      description: 'A centralized system designed to manage and optimize interactions with customers across sales, marketing, and support',
      image: '/details/crm.jpg',
      background: 'A CRM (Customer Relationship Management) platform is a centralized system designed to manage and optimize interactions with customers across sales, marketing, and support. It helps businesses store customer data, track communication, automate workflows, and gain actionable insights to improve customer relationships and retention.',
      problem: 'CRM platforms face challenges such as fragmented and poor-quality member data, legacy systems with limited integration, and low digital adoption among staff and members. Strong requirements for data privacy, transparency, and member trust complicate CRM usage, while budget constraints and lack of technical expertise limit customization and effective implementation.',
      solution: 'Start with data standardization and centralization by integrating all member records into a single, secure CRM system. Co-operatives should adopt a modular, cost-effective CRM that works with legacy systems and supports gradual digitization. Implement clear data governance and consent policies to build member trust, and provide staff training and change management to improve adoption.',
      approach: [
        'Integrate all member records into a single, secure CRM system',
        'Adopt modular, cost-effective CRM compatible with legacy systems',
        'Implement clear data governance and consent policies',
        'Provide staff training and change management programs'
      ],
      result: 'Using phased implementation with measurable outcomes helps control costs while demonstrating value early, improving customer relationships and retention.',
      features: [
        'Data Standardization & Centralization',
        'Legacy System Integration',
        'Modular Architecture',
        'Data Governance & Compliance',
        'Staff Training & Change Management',
        'Phased Implementation Support'
      ],
      benefits: [
        'Improved data quality',
        'Better digital adoption',
        'Enhanced member trust',
        'Cost-effective implementation'
      ],
      technologies: ['Salesforce', 'HubSpot', 'Custom CRM', 'API Integration', 'Cloud', 'Data Governance Tools'],
      useCases: [
        'Co-operatives',
        'Member-based organizations',
        'B2B sales teams',
        'Customer support operations'
      ],
      stats: [
        { value: '100', unit: '%', label: 'Data centralization' },
        { value: '60', unit: '%', label: 'Improved adoption' },
        { value: '50', unit: '%', label: 'Cost control' },
        { value: '75', unit: '%', label: 'Better member trust' },
        { value: '80', unit: '%', label: 'Data quality improvement' },
        { value: '3x', unit: '', label: 'Faster implementation' }
      ]
    },
    ' ECommerce': {
      title: 'ECommerce Solutions',
      subtitle: 'Digital solution for seamless online selling',
      category: 'ECommerce Platform',
      description: 'A digital solution that enables businesses to sell products or services online through web and mobile channels',
      image: '/details/ecom.jpg',
      background: 'An E-commerce platform is a digital solution that enables businesses to sell products or services online through web and mobile channels. It supports product catalog management, payments, orders, inventory, and logistics, while providing a secure and seamless shopping experience for customers.',
      problem: 'E-commerce platforms face challenges such as scalability under high traffic, seamless integration with payment gateways, logistics, and ERP systems, and maintaining data security and user trust. Additionally, managing real-time inventory, ensuring consistent user experience across devices, and handling rapid feature updates are critical challenges for businesses operating in competitive digital markets.',
      solution: 'Develop a scalable, cloud-ready e-commerce architecture with robust system integrations for payments, logistics, and enterprise platforms. Implementing strong security standards, performance optimization, and real-time inventory management ensures reliability and trust. A user-centric design approach combined with continuous monitoring and iterative enhancements helps deliver consistent experiences while enabling rapid, future-ready growth.',
      approach: [
        'Build scalable, cloud-ready e-commerce architecture',
        'Integrate payment gateways, logistics, and ERP systems',
        'Implement strong security and performance optimization',
        'Deploy real-time inventory management and monitoring'
      ],
      result: 'Consistent user experiences across devices with rapid feature deployment, ensuring reliability, trust, and future-ready growth for competitive digital markets.',
      features: [
        'Product Catalog Management',
        'Payment Gateway Integration',
        'Real-time Inventory Management',
        'Logistics Integration',
        'ERP System Integration',
        'Performance Optimization'
      ],
      benefits: [
        'Scalable architecture',
        'Enhanced data security',
        'Consistent user experience',
        'Future-ready growth'
      ],
      technologies: ['Cloud Infrastructure', 'Payment APIs', 'ERP Integration', 'Security Standards', 'Real-time Systems', 'Monitoring Tools'],
      useCases: [
        'Retail online stores',
        'B2B marketplaces',
        'Digital product sales',
        'Multi-channel commerce'
      ],
      stats: [
        { value: '99.9', unit: '%', label: 'Platform uptime' },
        { value: '100', unit: '%', label: 'Real-time inventory' },
        { value: '85', unit: '%', label: 'Faster checkout' },
        { value: '70', unit: '%', label: 'Traffic scalability' },
        { value: '95', unit: '%', label: 'Security compliance' },
        { value: '3x', unit: '', label: 'Feature deployment speed' }
      ]
    },
    'Food Ordering': {
      title: 'Food Ordering Platform',
      subtitle: 'Seamless order processing and delivery management',
      category: 'Restaurant Management Platform',
      description: 'A platform that allows customers to explore menus and place orders online with seamless order processing, payments, and delivery tracking',
      image: '/details/food.jpg',
      background: 'A Food Ordering Platform allows customers to explore menus and place orders online. It manages order processing, payments, and delivery tracking seamlessly. The platform connects customers, restaurants, and delivery partners in real time and helps food businesses improve efficiency and customer satisfaction.',
      problem: 'Food ordering platforms face challenges such as handling peak-time traffic, real-time menu and availability management, and seamless coordination between customers, restaurants, and delivery partners. Ensuring fast order processing, accurate delivery tracking, secure payments, and consistent user experience, while managing high competition and customer retention, remains a key operational challenge.',
      solution: 'Build a scalable, high-performance platform that supports peak loads and real-time menu updates. Integrating smart order routing, reliable delivery tracking, and secure payment systems ensures smooth coordination across all stakeholders. Continuous UX optimization, data-driven insights, and proactive partner support help improve customer satisfaction and long-term retention.',
      approach: [
        'Build scalable, high-performance platform for peak loads',
        'Implement real-time menu updates and availability management',
        'Integrate smart order routing and delivery tracking',
        'Deploy secure payment systems and UX optimization'
      ],
      result: 'Smooth coordination across customers, restaurants, and delivery partners with improved customer satisfaction and long-term retention through data-driven insights.',
      features: [
        'Real-time Menu Management',
        'Smart Order Routing',
        'Delivery Tracking System',
        'Secure Payment Integration',
        'Peak Load Management',
        'Partner Coordination Tools'
      ],
      benefits: [
        'Scalable performance',
        'Seamless coordination',
        'Enhanced customer satisfaction',
        'Improved retention'
      ],
      technologies: ['Real-time Systems', 'Payment APIs', 'Routing Algorithms', 'Cloud Infrastructure', 'Analytics', 'Mobile Apps'],
      useCases: [
        'Quick service restaurants',
        'Cloud kitchens',
        'Food delivery chains',
        'Multi-restaurant platforms'
      ],
      stats: [
        { value: '100', unit: '%', label: 'Real-time updates' },
        { value: '95', unit: '%', label: 'Order accuracy' },
        { value: '80', unit: '%', label: 'Customer satisfaction' },
        { value: '3x', unit: '', label: 'Peak capacity' },
        { value: '90', unit: '%', label: 'On-time delivery' },
        { value: '99.9', unit: '%', label: 'Payment success rate' }
      ]
    },
    'Insurance': {
      title: 'Insurance Management',
      subtitle: 'End-to-end insurance operations administration',
      category: 'Insurance Platform',
      description: 'End-to-end administration of insurance operations, including policy management, underwriting, claims processing, renewals, and compliance',
      image: '/details/insure.jpg',
      background: 'Insurance Management is the end-to-end administration of insurance operations, including policy management, underwriting, claims processing, renewals, and compliance. It focuses on risk evaluation, customer data management, and premium handling.',
      problem: 'Insurance platforms face challenges such as complex policy management, integration with legacy core systems, and accurate risk assessment using diverse data sources. Ensuring regulatory compliance, data security, seamless claims processing, and a smooth digital customer experience, while adapting to frequent policy and market changes, remains a key challenge.',
      solution: 'Implement a modular, API-driven insurance platform that integrates smoothly with legacy systems and supports flexible policy management. Strong data governance, security, and compliance frameworks ensure trust and regulatory adherence. Automating underwriting and claims workflows, combined with a customer-centric digital experience and continuous system updates, enables efficiency, scalability, and faster time-to-market.',
      approach: [
        'Deploy modular, API-driven platform with legacy integration',
        'Implement strong data governance and compliance frameworks',
        'Automate underwriting and claims workflows',
        'Build customer-centric digital experience with updates'
      ],
      result: 'Enhanced efficiency, scalability, and faster time-to-market with automated workflows, ensuring trust through compliance and delivering seamless digital customer experiences.',
      features: [
        'Modular Policy Management',
        'Legacy System Integration',
        'Automated Underwriting',
        'Claims Processing Automation',
        'Data Governance & Security',
        'Compliance Management'
      ],
      benefits: [
        'Flexible policy management',
        'Enhanced compliance',
        'Faster processing',
        'Improved customer experience'
      ],
      technologies: ['API Architecture', 'Legacy Integration', 'Automation Tools', 'Compliance Systems', 'Security Frameworks', 'Cloud'],
      useCases: [
        'Health insurance',
        'Life insurance',
        'Property & casualty',
        'Vehicle insurance'
      ],
      stats: [
        { value: '70', unit: '%', label: 'Faster underwriting' },
        { value: '60', unit: '%', label: 'Claims automation' },
        { value: '100', unit: '%', label: 'Compliance adherence' },
        { value: '50', unit: '%', label: 'Time-to-market reduction' },
        { value: '80', unit: '%', label: 'Process efficiency' },
        { value: '99.9', unit: '%', label: 'Data security' }
      ]
    },
    'Conversational AI': {
      title: 'Conversational AI',
      subtitle: 'Intelligent chatbots and virtual assistants',
      category: 'AI Platform',
      description: 'Transform customer engagement with AI-powered conversational interfaces available 24/7',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1400&h=600&fit=crop',
      background: 'Customers expect instant, intelligent support around the clock. Businesses need scalable solutions to handle growing support demands.',
      problem: 'High customer support costs, long wait times, inconsistent responses, and inability to scale support operations efficiently.',
      solution: 'AI-powered conversational interfaces that understand natural language, provide intelligent responses, and seamlessly hand off to humans when needed.',
      approach: [
        'Implement advanced NLP for intent recognition',
        'Build multi-language support capabilities',
        'Create intelligent context management',
        'Develop seamless human handoff workflows'
      ],
      result: 'Reduced customer support costs by 70%, achieved 24/7 availability, improved response times by 90%, and increased customer satisfaction by 60%.',
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
      stats: [
        { value: '70', unit: '%', label: 'Support cost reduction' },
        { value: '24/7', unit: '', label: 'Availability' },
        { value: '90', unit: '%', label: 'Faster response times' },
        { value: '60', unit: '%', label: 'Satisfaction improvement' },
        { value: '85', unit: '%', label: 'Queries resolved automatically' },
        { value: '50k', unit: '+', label: 'Conversations handled monthly' }
      ]
    },
    'Retail': {
      title: 'Retail Management',
      subtitle: 'Omnichannel retail operations platform',
      category: 'Retail Platform',
      description: 'Business of selling goods or services directly to consumers through physical stores, online channels, or both with modern technology and data',
      image: '/details/retail.jpg',
      background: 'Retail refers to the business of selling goods or services directly to consumers through physical stores, online channels, or both. It involves product sourcing, inventory management, pricing, sales, and customer engagement. Modern retail leverages technology, data, and omnichannel strategies to personalize experiences.',
      problem: 'Retail platforms face challenges such as managing omnichannel operations, real-time inventory visibility, and integrating POS, supply chain, and customer data systems. Delivering personalized customer experiences, handling peak-season demand, ensuring data security, and adapting quickly to changing consumer behavior are ongoing challenges in a highly competitive market.',
      solution: 'Build a unified omnichannel retail platform that centralizes inventory, customer, and sales data across all touchpoints. Leveraging real-time analytics, automation, and AI-driven personalization improves demand forecasting and customer engagement. Integrating scalable cloud infrastructure, secure data practices, and flexible system architecture enables retailers to adapt quickly, scale efficiently, and deliver consistent shopping experiences.',
      approach: [
        'Build unified omnichannel platform with centralized data',
        'Leverage real-time analytics and AI-driven personalization',
        'Integrate POS, supply chain, and customer data systems',
        'Deploy scalable cloud infrastructure with security'
      ],
      result: 'Quick adaptation to consumer behavior with efficient scaling, delivering consistent shopping experiences and improved demand forecasting through real-time analytics and personalization.',
      features: [
        'Omnichannel Operations',
        'Real-time Inventory Management',
        'POS Integration',
        'AI-driven Personalization',
        'Supply Chain Integration',
        'Customer Data Management'
      ],
      benefits: [
        'Centralized operations',
        'Better demand forecasting',
        'Enhanced personalization',
        'Scalable infrastructure'
      ],
      technologies: ['Cloud Infrastructure', 'AI/ML', 'POS Systems', 'Analytics', 'Omnichannel Tools', 'Security Systems'],
      useCases: [
        'Retail chains',
        'Fashion boutiques',
        'Electronics stores',
        'Multi-brand outlets'
      ],
      stats: [
        { value: '100', unit: '%', label: 'Inventory visibility' },
        { value: '80', unit: '%', label: 'Better forecasting' },
        { value: '65', unit: '%', label: 'Customer engagement' },
        { value: '3x', unit: '', label: 'Faster adaptation' },
        { value: '99.9', unit: '%', label: 'System uptime' },
        { value: '70', unit: '%', label: 'Operational efficiency' }
      ]
    }
  }

  return content[name] || {
    title: name,
    subtitle: 'Innovative solutions for modern businesses',
    category: name,
    description: `Discover how our ${name} solution can transform your business operations and drive growth.`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=600&fit=crop',
    background: `Modern businesses need ${name.toLowerCase()} solutions that drive growth and operational efficiency.`,
    problem: 'Traditional approaches are slow, inefficient, and fail to meet modern business demands.',
    solution: `Our ${name} solution provides comprehensive features that streamline operations and deliver measurable results.`,
    approach: [
      'Industry-leading technology implementation',
      'Scalable architecture design',
      'Expert consultation and support',
      'Continuous innovation and updates'
    ],
    result: 'Significant improvements in efficiency, cost reduction, better insights, and competitive advantage.',
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
    stats: [
      { value: '75', unit: '%', label: 'Efficiency improvement' },
      { value: '60', unit: '%', label: 'Cost reduction' },
      { value: '80', unit: '%', label: 'User satisfaction' },
      { value: '3x', unit: '', label: 'ROI increase' },
      { value: '99.9', unit: '%', label: 'Uptime' },
      { value: '24/7', unit: '', label: 'Support availability' }
    ]
  }
}

export function DetailPage({ isOpen, onClose, item, type }: DetailPageProps) {
  const [mounted, setMounted] = useState(false)
  const [showDemoForm, setShowDemoForm] = useState(false)


   const handleBookDemoClick = () => {
    setShowDemoForm(true)
  }

  useEffect(() => {
    if (isOpen && item) {
      setMounted(true)
      document.body.style.overflow = 'hidden'
    } else {
      const timer = setTimeout(() => {
        setMounted(false)
        document.body.style.overflow = 'unset'
      }, 300)
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, item])

  if (!mounted || !item) return null

  const content = getDetailedContent(item.name)
  const Icon = item.icon

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm overflow-y-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      >
        <div 
          className="min-h-screen bg-[#0a0a0f]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Icon className="h-8 w-8 text-blue-400" />
                <div>
                  <h1 className="text-lg font-semibold text-white">{content.title}</h1>
                  <p className="text-sm text-gray-400">{content.category}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-2 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative h-[50vh] bg-gradient-to-br from-blue-600/20 via-blue-700/10 to-transparent overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${content.image})` }}
            />
            <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                {content.title}
              </h1>
              <p className="text-xl md:text-2xl text-blue-300 mb-2">
                {content.category}
              </p>
              <p className="text-lg text-gray-300 max-w-3xl">
                {content.description}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
            
            {/* Overview */}
            <section>
              <h2 className="text-4xl font-bold text-white mb-6">Overview</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{content.background}</p>
            </section>

            {/* The Challenge */}
            <section>
              <h2 className="text-4xl font-bold text-white mb-6">The Challenge</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">{content.problem}</p>
            </section>

            {/* The Solution */}
            <section>
              <h2 className="text-4xl font-bold text-white mb-6">The Solution</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">{content.solution}</p>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-4xl font-bold text-white mb-8">Key Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.features.map((feature, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white mb-1">{feature}</h3>
                      <p className="text-gray-400 text-sm">Professional implementation with best practices</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Our Approach */}
            <section>
              <h2 className="text-4xl font-bold text-white mb-8">Our Approach</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {content.approach.map((item, i) => (
                  <div key={i} className="flex gap-4 text-center items-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                        {i + 1}
                      </div>
                    </div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Use Cases */}
            <section>
              <h2 className="text-4xl font-bold text-white mb-8">Industry Use Cases</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {content.useCases.map((useCase, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-white mb-1">{useCase}</h3>
                      <p className="text-gray-400 text-sm">Perfect solution for streamlined operations and growth</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
          <section className="px-4 sm:px-6 md:px-0">
  <div
    className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10
               px-4 py-5 sm:px-12 md:px-16 lg:px-20"
    style={{
      background: "linear-gradient(90deg, #8B7355 0%, #4A7BA7 50%, #7BA3C5 100%)",
    }}
  >
    <div className="relative z-10 flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-4 sm:gap-6">
      <div className="sm:-ml-13 flex-1">
        <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
          Ready To Transform Your Business?
        </h2>
        <p className="text-sm leading-relaxed text-white/90 sm:text-base">
          Schedule a personalized demo to see how our {content.title} solution can drive your success.
        </p>
      </div>
      <button
        onClick={handleBookDemoClick}
        className="flex-shrink-0 w-full sm:w-auto sm:-mr-15 rounded-full bg-white px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 text-sm font-bold text-black shadow-xl
                   transition-all duration-300 hover:scale-105 hover:bg-gray-100
                   whitespace-nowrap"
      >
        Book A Demo
      </button>
    </div>
  </div>
</section>
            {/* Back to Home Button */}
            <section className="pb-20">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-gray-400 text-sm mb-1">
                      Have questions about {content.category}?
                    </p>
                    <p className="text-white font-medium">
                      Contact us at{' '}
                      <a 
                        href="mailto:contact@qwickbit.com" 
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        contact@qwickbit.com
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      {/* Render form outside using Portal */}
      {showDemoForm && createPortal(
        <DynamicForm
          isOpen={showDemoForm}
          onClose={() => setShowDemoForm(false)}
        />,
        document.body
      )}
    </>
  )
}