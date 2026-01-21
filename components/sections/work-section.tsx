"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Shield, Wrench, Activity, Plane, Heart, X, ArrowRight, ExternalLink } from "lucide-react"
import { MdArrowRightAlt } from "react-icons/md"
import Image from "next/image"

interface ProductSolutionItem {
  name: string
  description: string
  icon: any
  category: string
}

interface WorkSectionProps {
  onItemClick?: (item: ProductSolutionItem, type: "service" | "product") => void
}

interface FirestoreField {
  stringValue?: string
  integerValue?: string
  doubleValue?: number
  booleanValue?: boolean
  timestampValue?: string
  arrayValue?: { values: any[] }
  mapValue?: { fields: Record<string, FirestoreField> }
}

interface FirestoreDocument {
  fields: Record<string, FirestoreField>
}

interface Project {
  name: string
  image:string
  title?: string
  description: string
  photoURL?: string
  link?: string
  platforms?: string
  tags?: string
  priority?: number
  gradient?: string
}

interface Stat {
  value: string
  unit: string
  label: string
}

type ProjectType = {
  number: string
  title: string
  category: string
  description: string
  icon: any
  image:string
  color: string
  caseStudy: {
    background: string
    problem: string
    solution: string
    approach: string[]
    result: string
    technologies: string[]
    stats: Stat[]
  }
  item: ProductSolutionItem
}

export const caseStudiesData: ProductSolutionItem[] = [
  {
    category: "Protect Me Well",
    description: "AI-powered platform that reduced customer support effort and improved decision-making.",
    icon: Shield,
    name: "Insurance AI Advisory Platform",
  },
  {
    category: "Local Tradies",
    description: "Marketplace solution that streamlined service bookings and increased user engagement.",
    icon: Wrench,
    name: "Service Booking Platform",
  },
  {
    category: "Vertex Sports",
    description: "AI object tracking for player movement, shot analysis, and coaching insights",
    icon: Activity,
    name: "Tennis Performance Analytics",
  },
  {
    category: "Flight Maintenance",
    description: "Automated inspection system reducing manual review time significantly",
    icon: Plane,
    name: "Aircraft Inspection AI Platform",
  },
  {
    category: "Connected Health",
    description: "Medical device data sync for blood pressure, glucose, temperature tracking",
    icon: Heart,
    name: "Real-time Vitals Monitoring",
  },
]

let openCaseStudyCallback: ((projectIndex: number) => void) | null = null

export const setOpenCaseStudyCallback = (callback: (projectIndex: number) => void) => {
  openCaseStudyCallback = callback
}

export const openCaseStudyByName = (category: string) => {
  const projectIndex = caseStudiesData.findIndex((study) => study.category === category)
  if (projectIndex !== -1 && openCaseStudyCallback) {
    openCaseStudyCallback(projectIndex)
  }
}

function parseFirestoreDocument(doc: FirestoreDocument): any {
  const fields = doc.fields
  const parsed: Record<string, any> = {}
  
  for (const key in fields) {
    const field = fields[key]
    
    if (field.stringValue !== undefined) {
      parsed[key] = field.stringValue
    } else if (field.integerValue !== undefined) {
      parsed[key] = parseInt(field.integerValue)
    } else if (field.doubleValue !== undefined) {
      parsed[key] = parseFloat(field.doubleValue.toString())
    } else if (field.booleanValue !== undefined) {
      parsed[key] = field.booleanValue
    } else if (field.timestampValue !== undefined) {
      parsed[key] = field.timestampValue
    } else if (field.arrayValue !== undefined) {
      parsed[key] = field.arrayValue.values || []
    } else if (field.mapValue !== undefined) {
      parsed[key] = parseFirestoreDocument({ fields: field.mapValue.fields })
    }
  }
  
  return parsed
}

function truncate(text: string, length: number): string {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

export function WorkSection({ onItemClick }: WorkSectionProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [firestoreProjects, setFirestoreProjects] = useState<Project[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const projectId = 'qwickbit-18382'
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/projects`

      try {
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`)
        }

        const json = await response.json()
        
        const fetchedProjects: Project[] = json.documents
          ?.map((doc: FirestoreDocument) => parseFirestoreDocument(doc))
          .sort((a: Project, b: Project) => (a.priority || 0) > (b.priority || 0) ? 1 : -1)
          .slice(0, 3) || []

        setFirestoreProjects(fetchedProjects)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setFirestoreProjects([])
      } finally {
        setLoadingProjects(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    setOpenCaseStudyCallback((projectIndex: number) => {
      setSelectedProject(projectIndex)
    })
  }, [])

const projects: ProjectType[] = [
  {
    number: "01",
    title: "Protect Me Well",
    category: "Insurance AI Advisory Platform",
    description: "AI-powered platform that reduced customer support effort and improved decision-making.",
    icon: Shield,
    image:"/insurance.avif",
    color: "bg-blue-900",
    caseStudy: {
      background:
        "A leading insurance company needed to modernize their customer experience and reduce operational costs.",
      problem:
        "High customer support queries, manual risk assessment processes, and slow premium calculations were affecting customer satisfaction and operational efficiency.",
      solution:
        "We developed a comprehensive AI-powered advisory system that fundamentally transforms the insurance workflow. At its core, the platform leverages advanced machine learning algorithms to automate risk assessment, analyzing over 200 data points including demographic information, historical claims data, lifestyle factors, and external risk indicators to generate accurate risk scores in real-time. The system integrates a sophisticated NLP-powered chatbot capable of understanding complex customer queries, providing instant policy recommendations, generating accurate premium quotes, and guiding users through the entire application process without human intervention. We implemented a real-time policy recommendation engine that uses collaborative filtering and content-based algorithms to match customers with the most suitable insurance products based on their unique profiles and needs. The platform includes a predictive analytics dashboard that provides insurers with actionable insights into customer behavior, claim patterns, and market trends. Additionally, we built an automated claims processing system that uses computer vision to verify claim documents and assess damage from uploaded photos, significantly reducing processing time. The solution also features a dynamic pricing engine that adjusts premiums based on real-time risk factors and market conditions, ensuring competitive pricing while maintaining profitability.",
      approach: [
        "Implemented machine learning models for risk scoring",
        "Integrated NLP-powered chatbot for customer queries",
        "Built real-time policy recommendation engine",
        "Created predictive analytics dashboard",
      ],
      result:
        "70% reduction in customer support queries, 50% faster policy issuance, and improved customer satisfaction scores by 45%.",
      technologies: ["React", "Python", "TensorFlow", "AWS", "Node.js"],
      stats: [
        { value: '70', unit: '%', label: 'Reduction in customer queries' },
        { value: '50', unit: '%', label: 'Faster policy issuance' },
        { value: '45', unit: '%', label: 'Customer satisfaction increase' },
        { value: '30', unit: '%', label: 'Reduction in operational costs' },
        { value: '2x', unit: '', label: 'Faster claim processing' },
        { value: '90', unit: '%', label: 'Accuracy in risk assessment' },
      ]
    },
    item: {
      name: "Protect Me Well",
      category: "Insurance AI Advisory Platform",
      description:
        "Smart premium calculation & risk assessment system powered by AI. Features automated risk scoring, real-time policy recommendations, and predictive analytics that reduced customer support queries by 70%. Includes intelligent chatbot for instant quotes and claim processing.",
      icon: Shield,
    },
  },
  {
    number: "02",
    image:"/case.png",
    title: "Local Tradies",
    category: "Service Booking Platform",
    description: "Marketplace solution that streamlined service bookings and increased user engagement.",
    icon: Wrench,
    color: "bg-amber-700",
    caseStudy: {
      background:
        "Local service professionals struggled to manage bookings and customers found it difficult to find reliable tradies.",
      problem:
        "Manual booking processes, lack of transparency in pricing, difficulty in finding qualified professionals, and payment disputes.",
      solution:
        "We built a sophisticated AI-powered marketplace platform that revolutionizes how customers connect with local service professionals. The platform features an intelligent matching algorithm that considers multiple factors including service professional availability, location proximity, skill ratings, pricing competitiveness, and past customer reviews to ensure optimal matches. We developed an automated booking and scheduling workflow that eliminates back-and-forth communication by allowing customers to view real-time availability, select preferred time slots, and receive instant confirmations. The system integrates a comprehensive verification process for service professionals, including background checks, license verification, insurance validation, and skills assessment to ensure quality and reliability. We implemented a transparent pricing engine that provides customers with detailed cost breakdowns, instant quotes based on job specifications, and the ability to compare multiple service providers. The platform includes secure payment processing with escrow functionality, protecting both customers and service providers by holding payments until job completion and approval. We built a sophisticated review and rating system that uses sentiment analysis to filter genuine feedback and identify top-performing professionals. Additionally, the platform features an intelligent notification system that keeps all parties informed about booking status, upcoming appointments, and payment confirmations. The solution also includes a dispute resolution mechanism and customer support integration to handle issues efficiently.",
      approach: [
        "Developed intelligent matching algorithms",
        "Automated booking and scheduling workflows",
        "Integrated secure payment processing",
        "Built review and rating system",
      ],
      result:
        "80% automation of booking process, 10,000+ active service professionals, and 95% customer satisfaction rate.",
      technologies: ["Next.js", "MongoDB", "Stripe", "Google Maps API", "Node.js"],
      stats: [
        { value: '80', unit: '%', label: 'Automation of booking process' },
        { value: '10k', unit: '+', label: 'Active service professionals' },
        { value: '95', unit: '%', label: 'Customer satisfaction rate' },
        { value: '50k', unit: '+', label: 'Bookings completed' },
        { value: '4.8', unit: '/5', label: 'Average service rating' },
        { value: '24', unit: 'hrs', label: 'Average response time' },
      ]
    },
    item: {
      name: "Local Tradies",
      category: "Service Booking Platform",
      description:
        "AI-powered marketplace connecting customers with local service professionals. Features smart matching algorithms, automated booking workflows, real-time availability tracking, and intelligent price estimation. The platform automates 80% of the booking process with integrated payment processing and review systems.",
      icon: Wrench,
    },
  },
  {
    number: "03",
    title: "Vertex Sports",
    image:"/tennis.png",
    category: "Tennis Performance Analytics",
    description: "AI object tracking for player movement, shot analysis, and coaching insights",
    icon: Activity,
    color: "bg-blue-600",
    caseStudy: {
      background:
        "Professional tennis coaches needed data-driven insights to improve player performance and training effectiveness.",
      problem:
        "Lack of objective performance metrics, difficulty tracking improvement over time, and limited tactical analysis capabilities.",
      solution:
        "We created an advanced analytics platform that leverages cutting-edge computer vision and AI to transform tennis coaching and player development. The system uses multi-camera tracking technology with deep learning models to accurately detect and track player movements, ball trajectories, and court positioning in real-time during both practice sessions and competitive matches. We implemented sophisticated shot analysis algorithms that classify shot types (forehand, backhand, serve, volley), measure shot speed, calculate spin rates, and assess accuracy relative to target zones with 98% precision. The platform generates comprehensive performance heatmaps showing player positioning patterns, court coverage efficiency, and shot placement tendencies, enabling coaches to identify strengths and weaknesses at a granular level. We built a tactical analysis engine that recognizes game patterns, identifies successful strategies, and provides insights into opponent weaknesses based on historical match data. The system includes personalized coaching recommendations powered by machine learning that analyzes individual player data against professional benchmarks and suggests specific drills and techniques for improvement. We developed an intuitive visualization dashboard that presents complex data through interactive charts, 3D ball trajectory replays, and side-by-side comparison tools for analyzing performance evolution over time. The platform also features automated highlight generation that identifies key moments in matches and creates video compilations for review and sharing.",
      approach: [
        "Implemented computer vision for player tracking",
        "Built shot trajectory analysis system",
        "Created performance heatmaps and visualizations",
        "Developed personalized coaching recommendations",
      ],
      result:
        "Used by 200+ professional coaches, improved training efficiency by 60%, and helped players improve rankings by average of 15 positions.",
      technologies: ["Python", "OpenCV", "TensorFlow", "React", "Three.js"],
      stats: [
        { value: '200', unit: '+', label: 'Professional coaches using platform' },
        { value: '60', unit: '%', label: 'Improvement in training efficiency' },
        { value: '15', unit: '', label: 'Average ranking positions improved' },
        { value: '50k', unit: '+', label: 'Matches analyzed' },
        { value: '98', unit: '%', label: 'Shot detection accuracy' },
        { value: '5x', unit: '', label: 'Faster performance analysis' },
      ]
    },
    item: {
      name: "Vertex Sports",
      category: "Tennis Performance Analytics",
      description:
        "Advanced tennis performance analytics platform using computer vision and AI. Tracks player movement, shot accuracy, speed metrics, and tactical patterns. Provides actionable coaching insights with heatmaps, trajectory analysis, and personalized improvement recommendations for professional and amateur players.",
      icon: Activity,
    },
  },
  {
    number: "04",
    title: "Flight Maintenance",
    image:"/air.jpg",
    category: "Aircraft Inspection AI Platform",
    description: "Automated inspection system reducing manual review time significantly",
    icon: Plane,
    color: "bg-slate-700",
    caseStudy: {
      background:
        "Aircraft maintenance teams spent excessive time on manual inspections, risking safety and increasing operational costs.",
      problem:
        "Time-consuming manual inspections, inconsistent defect detection, complex compliance tracking, and delayed maintenance scheduling.",
      solution:
        "We developed a comprehensive AI-powered inspection and maintenance platform that transforms aircraft safety protocols and operational efficiency. The system utilizes advanced computer vision models trained on millions of aircraft component images to automatically detect defects, corrosion, cracks, and structural anomalies with higher accuracy than manual inspections. We implemented a mobile inspection application that allows maintenance technicians to capture high-resolution images and videos of aircraft components using tablets or smartphones, with the AI system providing real-time defect detection and classification as images are captured. The platform features predictive maintenance algorithms that analyze historical maintenance data, flight hours, environmental conditions, and component wear patterns to forecast potential failures before they occur, enabling proactive maintenance scheduling and preventing costly unplanned downtime. We built a comprehensive digital inspection reporting system that automatically generates detailed inspection reports with annotated images, defect severity classifications, and recommended corrective actions, eliminating manual paperwork and ensuring consistency across all inspections. The solution integrates compliance tracking functionality that monitors regulatory requirements from aviation authorities, tracks maintenance deadlines, ensures adherence to manufacturer specifications, and automatically alerts teams about upcoming inspections or expired certifications. We implemented a centralized maintenance management system that coordinates work orders, tracks spare parts inventory, manages technician assignments, and provides real-time visibility into maintenance operations across multiple aircraft and locations.",
      approach: [
        "Built computer vision models for defect detection",
        "Implemented predictive maintenance algorithms",
        "Created digital inspection reporting system",
        "Integrated compliance tracking and alerts",
      ],
      result:
        "85% reduction in manual inspection time, 40% improvement in defect detection accuracy, and zero compliance violations.",
      technologies: ["Python", "TensorFlow", "React Native", "AWS", "PostgreSQL"],
      stats: [
        { value: '85', unit: '%', label: 'Reduction in inspection time' },
        { value: '40', unit: '%', label: 'Better defect detection' },
        { value: '0', unit: '', label: 'Compliance violations' },
        { value: '1000', unit: '+', label: 'Aircraft inspected monthly' },
        { value: '95', unit: '%', label: 'Defect classification accuracy' },
        { value: '3x', unit: '', label: 'Faster maintenance scheduling' },
      ]
    },
    item: {
      name: "Flight Maintenance",
      category: "Aircraft Inspection AI Platform",
      description:
        "AI-powered aircraft inspection and maintenance system using computer vision for automated defect detection. Features predictive maintenance scheduling, compliance tracking, digital inspection reports, and real-time anomaly detection that significantly reduces manual review time and improves safety protocols.",
      icon: Plane,
    },
  },
  {
    number: "05",
    title: "Connected Health",
    image:"/real.jpg",
    category: "Real-time Vitals Monitoring",
    description: "Medical device data sync for blood pressure, glucose, temperature tracking",
    icon: Heart,
    color: "bg-red-700",
    caseStudy: {
      background:
        "Patients and healthcare providers needed a unified platform to monitor health data from multiple medical devices.",
      problem:
        "Fragmented health data across devices, delayed response to health anomalies, medication non-compliance, and poor family engagement.",
      solution:
        "We built a comprehensive health monitoring ecosystem that seamlessly integrates data from multiple medical devices into a unified, intelligent platform. The system connects with a wide range of FDA-approved medical devices including blood pressure monitors, glucose meters, pulse oximeters, thermometers, weight scales, and fitness wearables through standardized APIs and Bluetooth connectivity, automatically syncing measurements in real-time without manual data entry. We developed sophisticated AI-powered anomaly detection algorithms that continuously analyze incoming vitals data against personalized baselines, medical history, and established clinical parameters to identify concerning patterns such as sustained blood pressure elevation, dangerous glucose fluctuations, irregular heart rhythms, or sudden weight changes. The platform features intelligent alerting mechanisms that notify patients, family members, and healthcare providers via push notifications, SMS, and email when critical thresholds are exceeded or concerning trends emerge, with severity-based escalation protocols ensuring appropriate response urgency. We implemented a comprehensive medication management system that sends timely reminders for medication intake, tracks adherence patterns, alerts users about missed doses, and provides detailed logs that patients can share with their physicians during consultations. The solution includes dedicated portal interfaces for family members and healthcare providers, allowing authorized users to monitor patient data remotely, view historical trends through interactive charts and graphs, receive health updates, and intervene when necessary while maintaining strict privacy controls and HIPAA compliance. We built intelligent trend analysis capabilities that generate insights about health patterns over time, correlate measurements with lifestyle factors like diet and exercise, and provide personalized recommendations for health improvement based on aggregated data.",
      approach: [
        "Integrated multiple medical device APIs",
        "Developed AI anomaly detection system",
        "Built medication reminder and tracking",
        "Created family member and provider portals",
      ],
      result:
        "Connected 50,000+ devices, 65% improvement in medication compliance, and early detection of health issues in 1000+ cases.",
      technologies: ["React Native", "Node.js", "MongoDB", "Python", "AWS IoT"],
      stats: [
        { value: '50k', unit: '+', label: 'Connected medical devices' },
        { value: '65', unit: '%', label: 'Better medication compliance' },
        { value: '1k', unit: '+', label: 'Early health issue detections' },
        { value: '99.9', unit: '%', label: 'Data sync uptime' },
        { value: '2min', unit: '', label: 'Average alert response time' },
        { value: '85', unit: '%', label: 'Reduction in emergency visits' },
      ]
    },
    item: {
      name: "Connected Health",
      category: "Real-time Vitals Monitoring",
      description:
        "Real-time health monitoring platform integrating multiple medical devices. Syncs blood pressure monitors, glucose meters, thermometers, and wearables into unified dashboard. Features AI-powered anomaly detection, trend analysis, medication reminders, and instant alerts for healthcare providers and family members.",
      icon: Heart,
    },
  },
]

  const handleProjectClick = (index: number) => {
    setSelectedProject(index)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  const handleProjectCardClick = (project: Project) => {
    if (project.link) {
      window.open(project.link, '_blank')
    }
  }

  const handleViewAllProjects = () => {
    window.location.href = '/projects'
  }

  return (
    <section className="flex h-screen w-screen shrink-0 snap-start items-center px-6 md:px-12 lg:px-16">
      <div data-vertically-scrollable className="h-full w-full overflow-y-auto overflow-x-hidden">
        <div className="mx-auto w-full max-w-7xl py-8">
          <div className="mb-12 mt-32 md:mb-16">
            <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Featured Case Studies
            </h2>
            {/* <p className="font-mono text-sm text-foreground/60 md:text-base">/ Recent explorations</p> */}
          </div>

          <div className="grid grid-cols-1 -mt-6 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} onClick={() => handleProjectClick(i)} />
            ))}
          </div>

          <div className="mt-24 mb-16">
            <div className="mb-12">
              <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl">
                Our Projects
              </h2>
              <p className="font-mono text-sm text-foreground/60 md:text-base">/ Some of our work</p>
            </div>

            {loadingProjects ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {firestoreProjects.map((project, i) => (
                    <FirestoreProjectCard 
                      key={i} 
                      project={project} 
                      onClick={() => handleProjectCardClick(project)}
                    />
                  ))}
                </div>

                <div className="mt-12 flex justify-center">
                  <button
                    onClick={handleViewAllProjects}
                    className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-950/30 via-purple-950/30 to-orange-950/30 backdrop-blur-xl px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-xl"
                  >
                    <span>View All Projects</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="pb-32"></div>
        </div>
      </div>

      {selectedProject !== null && <CaseStudyModal project={projects[selectedProject]} onClose={closeModal} />}
    </section>
  )
}

function ProjectCard({
  project,
  onClick,
}: {
  project: {
    image: string 
    number: string
    title: string
    category: string
    description: string
    icon: any
    color: string
  }
  onClick: () => void
}) {
  const Icon = project.icon

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left rounded-[28px] border border-white/30 bg-white/10 pl-4 pr-4 pt-4 pb-4 transition-all duration-300 hover:shadow-2xl"
    >
      <div className="overflow-hidden rounded-[24px]">
       <div className="relative h-56 w-full rounded-[20px] overflow-hidden">
  {/* Background Image */}
  <Image
    src={project?.image}
    alt="Background"
    fill
    className="object-cover"
    priority
  />

  {/* Color overlay */}
  {/* <div className="absolute inset-0 bg-indigo-700/60" /> */}

  {/* Gradient overlay */}
  {/* <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-indigo-800/30 to-transparent" /> */}

  {/* Icon */}
  {/* <Icon className="absolute right-6 top-6 h-16 w-16 text-white/90" /> */}
</div>

        <div className="px-1 py-6">
          <h3 className="mb-2 text-2xl font-bold text-white">
            {project.category}
          </h3>
          <p className="mb-6 text-base leading-relaxed text-white/80">
            {project.description}
          </p>
          <div className="flex items-center gap-2 font-medium text-white underline underline-offset-4">
            Read Full Story
            <span className="transition-transform group-hover:translate-x-1">
              <MdArrowRightAlt />
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

function FirestoreProjectCard({
  project,
  onClick,
}: {
  project: Project
  onClick: () => void
}) {
  const defaultImage = `https://picsum.photos/seed/${project.name}/400/300`
  const tags = (project.platforms || project.tags || '').split(',').filter(Boolean)

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left rounded-[28px] border border-white/30 bg-white/10 pl-4 pr-4 pt-4 pb-4 transition-all duration-300 hover:shadow-2xl h-full"
    >
      <div className="overflow-hidden rounded-[24px] flex flex-col h-full">
        <div className="relative h-56 w-full rounded-[20px] overflow-hidden flex-shrink-0">
          <Image
            src={project.photoURL || defaultImage}
            alt={project.name || project.title || 'Project'}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="px-1 py-6 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="mb-3 text-2xl font-bold text-white line-clamp-2">
              {project.name || project.title || ''}
            </h3>
            <p className="mb-3 text-base leading-relaxed text-white/80 line-clamp-2">
              {project.description}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase text-white/90"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 pt-4 ">
            <div className="flex items-center gap-2 font-medium text-white underline underline-offset-4">
              View Project
              <span className="transition-transform group-hover:translate-x-1">
                <MdArrowRightAlt />
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

function CaseStudyModal({
  project,
  onClose,
}: {
  project: {
    image: string | Blob | undefined
    title: string
    category: string
    description: string
    icon: any
    color: string
    caseStudy: {
      background: string
      problem: string
      solution: string
      approach: string[]
      result: string
      technologies: string[]
      stats: Stat[]
    }
  }
  onClose: () => void
}) {
  const Icon = project.icon
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!mounted) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="min-h-screen bg-[#0a0a0f]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Back Button */}
        <div className="sticky top-0 z-10 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Icon className="h-8 w-8 text-teal-400" />
              <div>
                <h1 className="text-lg font-semibold text-white">{project.title}</h1>
                <p className="text-sm text-gray-400">{project.category}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-2 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
            >
              <X className="h-5 w-5" />
              {/* <span className="hidden sm:inline">Close</span> */}
            </button>
          </div>
        </div>

        {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-br from-teal-600/20 via-teal-700/10 to-transparent overflow-hidden">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-20"
    style={{ backgroundImage: `url(${project.image})` }}
  />

  <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
      {project.title}
    </h1>
    <p className="text-xl md:text-2xl text-teal-300 mb-2">
      {project.category}
    </p>
    <p className="text-lg text-gray-300 max-w-3xl">
      {project.description}
    </p>
  </div>
</div>


        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
          
          {/* Customer Background */}
          <section>
            <h2 className="text-4xl font-bold text-white mb-6">Customer Background</h2>
            <p className="text-lg text-gray-300 leading-relaxed ">{project.caseStudy.background}</p>
          </section>

          {/* The Problem */}
          <section>
            <h2 className="text-4xl font-bold text-white mb-6">The Problem</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">{project.caseStudy.problem}</p>
            
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                src={project.image}
                alt="Problem visualization"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </section>

          {/* The Solution */}
          <section>
            <h2 className="text-4xl font-bold text-white mb-6">The Solution</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">{project.caseStudy.solution}</p>
            
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-900 to-blue-900">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&h=600&fit=crop"
                alt="Solution implementation"
                className="w-full h-full object-cover opacity-70"
              />
            </div>
          </section>

          {/* Our Approach */}
          <section>
            <h2 className="text-4xl font-bold text-white mb-8">Our Approach</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.caseStudy.approach.map((item, i) => (
                <div key={i} className="flex gap-4 p-6 items-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-teal-400" />
                    </div>
                  </div>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Result */}
          <section className="max-w-6xl w-full">
            <h2 className="text-4xl font-bold text-white mb-6">Results</h2>
            <div className="relative rounded-2xl overflow-hidden bg-[#1a1a1f] border border-white/10 p-8 md:p-12">
              <div className="relative">
                {/* Top Row */}
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                  {project.caseStudy.stats.slice(0, 3).map((stat, index) => (
                    <div key={index} className="flex items-center gap-6 border-r border-white/10 last:border-r-0 pr-8 last:pr-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-6xl md:text-7xl font-bold text-[#ff1654]">
                          {stat.value}
                        </span>
                        <span className="text-3xl md:text-4xl font-bold text-[#ff1654]">
                          {stat.unit}
                        </span>
                      </div>
                      <p className="text-white/80 text-lg leading-tight max-w-[160px]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                {project.caseStudy.stats.length > 3 && (
                  <>
                    <div className="h-px bg-white/10 mb-12" />
                    
                    {/* Bottom Row */}
                    <div className="grid md:grid-cols-3 gap-12">
                      {project.caseStudy.stats.slice(3).map((stat, index) => (
                        <div key={index} className="flex items-center gap-6 border-r border-white/10 last:border-r-0 pr-8 last:pr-0">
                          <div className="flex items-baseline gap-1">
                            <span className="text-6xl md:text-7xl font-bold text-[#ff1654]">
                              {stat.value}
                            </span>
                            <span className="text-3xl md:text-4xl font-bold text-[#ff1654]">
                              {stat.unit}
                            </span>
                          </div>
                          <p className="text-white/80 text-lg leading-tight max-w-[160px]">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Technologies Used */}
          <section className="">
            <h2 className="text-4xl font-bold text-white mb-8">Technologies Used</h2>
            <div className="flex flex-wrap gap-4">
              {project.caseStudy.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

           <section className="pb-20">
           <div className="  p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5">
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
  )

  return createPortal(modalContent, document.body)
}