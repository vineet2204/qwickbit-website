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
      subtitle: 'Integrated CRM with efficient process management',
      category: 'CRM Platform',
      description: 'Streamline customer relationships with comprehensive CRM featuring automation and analytics',
      image: '/details/crm.jpg',
      background: 'Businesses need centralized systems to manage customer relationships, track interactions, and drive sales growth efficiently.',
      problem: 'Fragmented customer data, manual processes, poor visibility into sales pipeline, and difficulty tracking customer interactions.',
      solution: 'Comprehensive CRM solution with lead management, sales automation, customer tracking, marketing integration, and advanced analytics.',
      approach: [
        'Implement intelligent lead scoring algorithms',
        'Automate sales pipeline workflows',
        'Integrate email marketing campaigns',
        'Build customizable analytics dashboards'
      ],
      result: 'Increased sales productivity by 65%, improved customer retention by 40%, and achieved 360° customer visibility across all touchpoints.',
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
      stats: [
        { value: '65', unit: '%', label: 'Sales productivity increase' },
        { value: '40', unit: '%', label: 'Better customer retention' },
        { value: '360', unit: '°', label: 'Customer view' },
        { value: '50', unit: '%', label: 'Faster deal closure' },
        { value: '80', unit: '%', label: 'Lead conversion improvement' },
        { value: '5x', unit: '', label: 'ROI increase' }
      ]
    },
    ' ECommerce': {
      title: 'ECommerce Solutions',
      subtitle: 'Complete online store with advanced features',
      category: 'ECommerce Platform',
      description: 'Build conversion-friendly online stores that drive sales and customer satisfaction',
      image: '/details/ecom.jpg',
      background: 'Modern consumers expect seamless online shopping experiences with fast checkout, personalized recommendations, and mobile-first design.',
      problem: 'Low conversion rates, cart abandonment, poor mobile experience, and difficulty managing inventory across multiple channels.',
      solution: 'Comprehensive eCommerce platform with advanced features including personalized recommendations, seamless checkout, inventory management, and omnichannel selling.',
      approach: [
        'Build mobile-first responsive design',
        'Implement AI-powered product recommendations',
        'Create streamlined checkout process',
        'Integrate payment gateways and shipping APIs'
      ],
      result: 'Increased conversion rates by 55%, reduced cart abandonment by 40%, improved mobile sales by 75%, and enhanced customer lifetime value by 60%.',
      features: [
        'Product Catalog Management',
        'Shopping Cart & Checkout',
        'Payment Gateway Integration',
        'Inventory Management',
        'Order Tracking System',
        'Multi-channel Selling'
      ],
      benefits: [
        'Higher conversion rates',
        'Reduced cart abandonment',
        'Better customer experience',
        'Increased revenue'
      ],
      technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal', 'Custom Solutions'],
      useCases: [
        'Retail online stores',
        'B2B marketplaces',
        'Subscription services',
        'Digital product sales'
      ],
      stats: [
        { value: '55', unit: '%', label: 'Conversion rate increase' },
        { value: '40', unit: '%', label: 'Reduced cart abandonment' },
        { value: '75', unit: '%', label: 'Mobile sales growth' },
        { value: '60', unit: '%', label: 'Customer lifetime value' },
        { value: '3x', unit: '', label: 'Revenue growth' },
        { value: '99.9', unit: '%', label: 'Payment success rate' }
      ]
    },
    'Food Ordering': {
      title: 'Food Ordering System',
      subtitle: 'Kitchen to customer management',
      category: 'Restaurant Management Platform',
      description: 'Manage orders from kitchen to customer in a simple, efficient manner',
      image: '/details/food.jpg',
      background: 'Restaurants need efficient systems to handle online orders, manage kitchen operations, and ensure timely delivery while maintaining quality.',
      problem: 'Order errors, long wait times, poor coordination between kitchen and delivery, and inability to handle peak hours efficiently.',
      solution: 'Integrated food ordering platform with real-time order tracking, kitchen display system, delivery management, and customer notifications.',
      approach: [
        'Build intuitive ordering interface with menu customization',
        'Implement real-time kitchen display system',
        'Create delivery route optimization',
        'Integrate with popular delivery platforms'
      ],
      result: 'Reduced order errors by 80%, improved delivery times by 45%, increased order capacity by 3x, and enhanced customer satisfaction by 70%.',
      features: [
        'Online Menu Management',
        'Real-time Order Tracking',
        'Kitchen Display System',
        'Delivery Management',
        'Customer Notifications',
        'Analytics Dashboard'
      ],
      benefits: [
        'Reduced order errors',
        'Faster delivery times',
        'Better kitchen efficiency',
        'Higher customer satisfaction'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Google Maps API', 'Stripe'],
      useCases: [
        'Quick service restaurants',
        'Fine dining establishments',
        'Cloud kitchens',
        'Food delivery chains'
      ],
      stats: [
        { value: '80', unit: '%', label: 'Reduction in order errors' },
        { value: '45', unit: '%', label: 'Faster delivery times' },
        { value: '3x', unit: '', label: 'Order capacity increase' },
        { value: '70', unit: '%', label: 'Customer satisfaction boost' },
        { value: '90', unit: '%', label: 'On-time delivery rate' },
        { value: '50', unit: '%', label: 'Revenue increase' }
      ]
    },
    'Insurance': {
      title: 'Insurance Management',
      subtitle: 'Comprehensive insurance solutions',
      category: 'Insurance Platform',
      description: 'Comprehensive insurance management solutions for modern insurance providers',
      image: '/details/insure.jpg',
      background: 'Insurance companies need robust systems to manage policies, claims, underwriting, and customer relationships efficiently.',
      problem: 'Manual processes, slow claim processing, poor customer communication, and difficulty managing complex policy structures.',
      solution: 'End-to-end insurance management platform with policy administration, claims processing, underwriting automation, and customer portal.',
      approach: [
        'Automate policy lifecycle management',
        'Implement intelligent claims processing',
        'Build customer self-service portals',
        'Create risk assessment algorithms'
      ],
      result: 'Reduced claims processing time by 60%, improved policy issuance speed by 70%, decreased operational costs by 45%, and enhanced customer satisfaction by 55%.',
      features: [
        'Policy Administration',
        'Claims Management',
        'Underwriting Automation',
        'Customer Portal',
        'Risk Assessment',
        'Compliance Management'
      ],
      benefits: [
        'Faster claim processing',
        'Reduced operational costs',
        'Better risk management',
        'Improved compliance'
      ],
      technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'AI/ML', 'Blockchain', 'Cloud'],
      useCases: [
        'Health insurance',
        'Life insurance',
        'Property & casualty',
        'Vehicle insurance'
      ],
      stats: [
        { value: '60', unit: '%', label: 'Faster claims processing' },
        { value: '70', unit: '%', label: 'Quicker policy issuance' },
        { value: '45', unit: '%', label: 'Cost reduction' },
        { value: '55', unit: '%', label: 'Customer satisfaction' },
        { value: '85', unit: '%', label: 'Automation rate' },
        { value: '99', unit: '%', label: 'Compliance accuracy' }
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
      subtitle: 'Modern retail and POS systems',
      category: 'Retail Platform',
      description: 'Modern retail management and POS systems for efficient store operations',
      image: '/details/retail.jpg',
      background: 'Retail businesses need integrated systems to manage inventory, sales, customer data, and multi-location operations seamlessly.',
      problem: 'Inventory discrepancies, slow checkout, poor visibility across locations, and inability to provide personalized customer experiences.',
      solution: 'Comprehensive retail management platform with POS, inventory tracking, customer loyalty programs, and omnichannel capabilities.',
      approach: [
        'Implement cloud-based POS system',
        'Build real-time inventory synchronization',
        'Create customer loyalty programs',
        'Integrate omnichannel sales tracking'
      ],
      result: 'Reduced checkout time by 50%, improved inventory accuracy to 99%, increased customer retention by 45%, and boosted sales by 35%.',
      features: [
        'Cloud-based POS',
        'Inventory Management',
        'Customer Loyalty Programs',
        'Multi-location Support',
        'Sales Analytics',
        'Employee Management'
      ],
      benefits: [
        'Faster checkout process',
        'Better inventory control',
        'Improved customer loyalty',
        'Increased sales'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Square', 'Cloud'],
      useCases: [
        'Retail stores',
        'Fashion boutiques',
        'Electronics shops',
        'Multi-brand outlets'
      ],
      stats: [
        { value: '50', unit: '%', label: 'Faster checkout' },
        { value: '99', unit: '%', label: 'Inventory accuracy' },
        { value: '45', unit: '%', label: 'Customer retention' },
        { value: '35', unit: '%', label: 'Sales increase' },
        { value: '80', unit: '%', label: 'Staff efficiency' },
        { value: '24/7', unit: '', label: 'System availability' }
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
              
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <img
                  src={content.image}
                  alt="Challenge visualization"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </section>

            {/* The Solution */}
            <section>
              <h2 className="text-4xl font-bold text-white mb-6">The Solution</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">{content.solution}</p>
              
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&h=600&fit=crop"
                  alt="Solution implementation"
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
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
                  <div key={i} className="flex gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
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


            {/* Technologies */}
            <section>
              <h2 className="text-4xl font-bold text-white mb-8">Technologies Used</h2>
              <div className="flex flex-wrap gap-4">
                {content.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
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
          <section className="px-4 pb-10 sm:px-6 md:px-0">
  <div
    className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10
               px-6 py-10 sm:px-10 sm:py-14 md:px-16 md:py-10 lg:py-16"
    style={{
      background: "linear-gradient(232.81deg, #2C60AB 25.76%, #AD7A3D 92.62%)",
    }}
  >
    <div className="relative z-10 mx-auto max-w-2xl text-center">
      <h2 className="mb-4 text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl">
        Ready To Transform
        <br className="hidden sm:block" />
        Your Business?
      </h2>

      <p className="mb-8 text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
        Schedule a personalized demo to see how our {content.title} solution can drive your success.
      </p>

      <button
        onClick={handleBookDemoClick}
        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl
                   transition-all duration-300 hover:scale-105 hover:bg-white/95
                   sm:px-7 sm:py-3.5 sm:text-base md:px-8 md:py-4"
      >
        Book A Demo
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  </div>
</section>


            {/* Back to Home Button */}
            <section className="pb-20">
             <div className="mt-6 md:mt-8 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                        <div className="text-center md:text-left">
                          <p className="text-gray-400 text-sm mb-1">
                            Have questions about this policy?
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