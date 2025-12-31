"use client"

import { useState, useEffect } from "react"
import { Shield, Wrench, Activity, Plane, Heart, X, ArrowRight, ExternalLink } from "lucide-react"
import { MdArrowRightAlt } from "react-icons/md";


interface ProductSolutionItem {
  name: string
  description: string
  icon: any
}

interface WorkSectionProps {
  onItemClick?: (item: ProductSolutionItem, type: "service" | "product") => void
}

// Firestore types
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
  title?: string
  description: string
  photoURL?: string
  link?: string
  platforms?: string
  tags?: string
  priority?: number
  gradient?: string
}

type ProjectType = {
  number: string
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
  }
  item: ProductSolutionItem
}

export const caseStudiesData: ProductSolutionItem[] = [
  {
    name: "Protect Me Well",
    description: "Smart premium calculation & risk assessment reducing support queries by 70%",
    icon: Shield,
  },
  {
    name: "Local Tradies",
    description: "AI-powered marketplace automating 80% of booking process for service professionals",
    icon: Wrench,
  },
  {
    name: "Vertex Sports",
    description: "AI object tracking for player movement, shot analysis, and coaching insights",
    icon: Activity,
  },
  {
    name: "Flight Maintenance",
    description: "Automated inspection system reducing manual review time significantly",
    icon: Plane,
  },
  {
    name: "Connected Health",
    description: "Medical device data sync for blood pressure, glucose, temperature tracking",
    icon: Heart,
  },
]

let openCaseStudyCallback: ((projectIndex: number) => void) | null = null

export const setOpenCaseStudyCallback = (callback: (projectIndex: number) => void) => {
  openCaseStudyCallback = callback
}

export const openCaseStudyByName = (name: string) => {
  const projectIndex = caseStudiesData.findIndex((study) => study.name === name)
  if (projectIndex !== -1 && openCaseStudyCallback) {
    openCaseStudyCallback(projectIndex)
  }
}

// Firestore parser
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

  // Fetch projects from Firestore
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

  useState(() => {
    setOpenCaseStudyCallback((projectIndex: number) => {
      setSelectedProject(projectIndex)
    })
  })

  const projects: ProjectType[] = [
    {
      number: "01",
      title: "Protect Me Well",
      category: "Insurance AI Advisory",
      description: "Smart premium calculation & risk assessment reducing support queries by 70%",
      icon: Shield,
      color: "bg-blue-900",
      caseStudy: {
        background:
          "A leading insurance company needed to modernize their customer experience and reduce operational costs.",
        problem:
          "High customer support queries, manual risk assessment processes, and slow premium calculations were affecting customer satisfaction and operational efficiency.",
        solution:
          "We developed an AI-powered advisory system that automates risk assessment and premium calculation while providing instant customer support through an intelligent chatbot.",
        approach: [
          "Implemented machine learning models for risk scoring",
          "Integrated NLP-powered chatbot for customer queries",
          "Built real-time policy recommendation engine",
          "Created predictive analytics dashboard",
        ],
        result:
          "70% reduction in customer support queries, 50% faster policy issuance, and improved customer satisfaction scores by 45%.",
        technologies: ["React", "Python", "TensorFlow", "AWS", "Node.js"],
      },
      item: {
        name: "Protect Me Well",
        description:
          "Smart premium calculation & risk assessment system powered by AI. Features automated risk scoring, real-time policy recommendations, and predictive analytics that reduced customer support queries by 70%. Includes intelligent chatbot for instant quotes and claim processing.",
        icon: Shield,
      },
    },
    {
      number: "02",
      title: "Local Tradies",
      category: "Service Booking Platform",
      description: "AI-powered marketplace automating 80% of booking process for service professionals",
      icon: Wrench,
      color: "bg-amber-700",
      caseStudy: {
        background:
          "Local service professionals struggled to manage bookings and customers found it difficult to find reliable tradies.",
        problem:
          "Manual booking processes, lack of transparency in pricing, difficulty in finding qualified professionals, and payment disputes.",
        solution:
          "Built an AI-powered marketplace that connects customers with verified service professionals through smart matching and automated workflows.",
        approach: [
          "Developed intelligent matching algorithms",
          "Automated booking and scheduling workflows",
          "Integrated secure payment processing",
          "Built review and rating system",
        ],
        result:
          "80% automation of booking process, 10,000+ active service professionals, and 95% customer satisfaction rate.",
        technologies: ["Next.js", "MongoDB", "Stripe", "Google Maps API", "Node.js"],
      },
      item: {
        name: "Local Tradies",
        description:
          "AI-powered marketplace connecting customers with local service professionals. Features smart matching algorithms, automated booking workflows, real-time availability tracking, and intelligent price estimation. The platform automates 80% of the booking process with integrated payment processing and review systems.",
        icon: Wrench,
      },
    },
    {
      number: "03",
      title: "Vertex Sports",
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
          "Created an advanced analytics platform using computer vision to track player movement, shot accuracy, and tactical patterns in real-time.",
        approach: [
          "Implemented computer vision for player tracking",
          "Built shot trajectory analysis system",
          "Created performance heatmaps and visualizations",
          "Developed personalized coaching recommendations",
        ],
        result:
          "Used by 200+ professional coaches, improved training efficiency by 60%, and helped players improve rankings by average of 15 positions.",
        technologies: ["Python", "OpenCV", "TensorFlow", "React", "Three.js"],
      },
      item: {
        name: "Vertex Sports",
        description:
          "Advanced tennis performance analytics platform using computer vision and AI. Tracks player movement, shot accuracy, speed metrics, and tactical patterns. Provides actionable coaching insights with heatmaps, trajectory analysis, and personalized improvement recommendations for professional and amateur players.",
        icon: Activity,
      },
    },
    {
      number: "04",
      title: "Flight Maintenance",
      category: "Aircraft Inspection AI",
      description: "Automated inspection system reducing manual review time significantly",
      icon: Plane,
      color: "bg-slate-700",
      caseStudy: {
        background:
          "Aircraft maintenance teams spent excessive time on manual inspections, risking safety and increasing operational costs.",
        problem:
          "Time-consuming manual inspections, inconsistent defect detection, complex compliance tracking, and delayed maintenance scheduling.",
        solution:
          "Developed an AI-powered inspection system using computer vision for automated defect detection and predictive maintenance scheduling.",
        approach: [
          "Built computer vision models for defect detection",
          "Implemented predictive maintenance algorithms",
          "Created digital inspection reporting system",
          "Integrated compliance tracking and alerts",
        ],
        result:
          "85% reduction in manual inspection time, 40% improvement in defect detection accuracy, and zero compliance violations.",
        technologies: ["Python", "TensorFlow", "React Native", "AWS", "PostgreSQL"],
      },
      item: {
        name: "Flight Maintenance",
        description:
          "AI-powered aircraft inspection and maintenance system using computer vision for automated defect detection. Features predictive maintenance scheduling, compliance tracking, digital inspection reports, and real-time anomaly detection that significantly reduces manual review time and improves safety protocols.",
        icon: Plane,
      },
    },
    {
      number: "05",
      title: "Connected Health",
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
          "Built a comprehensive health monitoring platform that integrates multiple medical devices into a unified dashboard with AI-powered insights.",
        approach: [
          "Integrated multiple medical device APIs",
          "Developed AI anomaly detection system",
          "Built medication reminder and tracking",
          "Created family member and provider portals",
        ],
        result:
          "Connected 50,000+ devices, 65% improvement in medication compliance, and early detection of health issues in 1000+ cases.",
        technologies: ["React Native", "Node.js", "MongoDB", "Python", "AWS IoT"],
      },
      item: {
        name: "Connected Health",
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
          <div className="mb-12 mt-20 md:mb-16">
            <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Featured Case Studies
            </h2>
            <p className="font-mono text-sm text-foreground/60 md:text-base">/ Recent explorations</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} onClick={() => handleProjectClick(i)} />
            ))}
          </div>

          {/* Projects Section */}
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

                {/* View All Projects Button */}
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={handleViewAllProjects}
                    className="group flex items-center gap-3 rounded-full  bg-gradient-to-r from-blue-950/30 via-purple-950/30 to-orange-950/30
    backdrop-blur-xl px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-xl"
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
      className="
        group relative w-full text-left
        rounded-[28px]
        border border-white/30
        bg-white/10
        p-4
        transition-all duration-300
        hover:shadow-2xl
      "
    >
      {/* INNER BORDER */}
      <div className="overflow-hidden rounded-[24px] ">
        
        {/* HERO SECTION */}
        <div className="relative h-56 w-full rounded-[20px] overflow-hidden">
          {/* BLUE PANEL */}
          <div className="absolute inset-0 bg-indigo-700/90" />

          {/* SOFT GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-indigo-800/30 to-transparent" />

          {/* ICON */}
          <Icon className="absolute right-6 top-6 h-16 w-16 text-white/90" />

          {/* CATEGORY PILL */}
          <span
            className="
              absolute bottom-4 left-4
              rounded-xl
              border border-white/40
              bg-white/10
              px-4 py-2
              text-sm
              font-medium
              text-white
              backdrop-blur
            "
          >
            {project.category}
          </span>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-6">
         

          <h3 className="mb-3 text-3xl font-bold text-white">
            {project.title}
          </h3>

          <p className="mb-6 text-base leading-relaxed text-white/80">
            {project.description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 font-medium text-white underline underline-offset-4">
            Read Case Study
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
      className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:shadow-xl text-left"
    >
      <div 
        className="relative h-48 w-full flex items-end overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.8)), url(${project.photoURL || defaultImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/50 to-transparent" />
        <h3 className="relative z-10 p-6 text-2xl font-bold text-white">
          {truncate(project.name || project.title || '', 40)}
        </h3>
      </div>

      <div className="flex flex-col gap-3 p-6">
        <p className="text-sm leading-relaxed text-foreground/70">
          {truncate(project.description, 100)}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium uppercase text-white"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center gap-2 text-white transition-colors group-hover:text-gray-100">
          <span className="text-sm  font-medium">View Project</span>
          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
    }
  }
  onClose: () => void
}) {
  const Icon = project.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="relative max-h-[90vh] w-full mt-18 max-w-5xl overflow-y-auto rounded-2xl bg-background shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="sticky top-4 right-4 z-10 float-right m-4 rounded-full bg-foreground/10 p-2 transition-colors hover:bg-foreground/20"
        >
          <X className="h-6 w-6 text-foreground" />
        </button>

        <div className={`relative h-96 w-full ${project.color} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative z-10 text-center text-white">
            <Icon className="mx-auto mb-6 h-32 w-32" />
            <h1 className="mb-4 text-5xl font-bold">{project.title}</h1>
            <p className="text-xl opacity-90">{project.category}</p>
          </div>
        </div>

        <div className="space-y-12 p-8 md:p-12">
          <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Case Study Outline</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {["Customer Background", "The Problem", "The Solution", "Our Approach", "Results", "Technologies"].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-foreground/70">{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground/30">01</span>
              <h2 className="text-3xl font-bold text-foreground">Customer Background</h2>
            </div>
            <p className="text-lg leading-relaxed text-foreground/70">{project.caseStudy.background}</p>
          </div>

          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop"
              alt="Project showcase"
              className="h-80 w-full object-cover"
            />
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground/30">02</span>
              <h2 className="text-3xl font-bold text-foreground">The Problem</h2>
            </div>
            <p className="text-lg leading-relaxed text-foreground/70">{project.caseStudy.problem}</p>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground/30">03</span>
              <h2 className="text-3xl font-bold text-foreground">The Solution</h2>
            </div>
            <p className="text-lg leading-relaxed text-foreground/70">{project.caseStudy.solution}</p>
          </div>

          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop"
              alt="Solution visualization"
              className="h-80 w-full object-cover"
            />
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground/30">04</span>
              <h2 className="text-3xl font-bold text-foreground">Our Approach</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {project.caseStudy.approach.map((item, i) => (
                <div key={i} className="flex gap-3 rounded-lg border border-foreground/10 bg-foreground/5 p-4">
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-foreground/50" />
                  <p className="text-foreground/70">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground/30">05</span>
              <h2 className="text-3xl font-bold text-foreground">Result</h2>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 p-8">
              <p className="text-lg leading-relaxed text-foreground">{project.caseStudy.result}</p>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground/30">06</span>
              <h2 className="text-3xl font-bold text-foreground">Technologies Used</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.caseStudy.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-full border border-foreground/20 bg-foreground/5 px-6 py-2 font-mono text-sm text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop"
              alt="Team collaboration"
              className="h-80 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}