"use client"

import { useReveal } from "@/hooks/use-reveal"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6  md:px-12 md:pt-0 lg:px-16"
    >
      <div data-vertically-scrollable className="h-full w-full overflow-y-auto overflow-x-hidden">
        <div className="mx-auto w-full max-w-7xl py-8">
          <div
            className={`mb-12 mt-20 transition-all duration-700 md:mb-16 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Featured
            </h2>
            <p className="font-mono text-sm text-foreground/60 md:text-base">/ Recent explorations</p>
          </div>

          <div className="space-y-6 pb-32 md:space-y-8">
            {[
              {
                number: "01",
                title: "Protect Me Well",
                category: "Insurance AI Advisory",
                description: "Smart premium calculation & risk assessment reducing support queries by 70%",
                direction: "left",
              },
              {
                number: "02",
                title: "Local Tradies",
                category: "Service Booking Platform",
                description: "AI-powered marketplace automating 80% of booking process for service professionals",
                direction: "right",
              },
              {
                number: "03",
                title: "Vertex Sports",
                category: "Tennis Performance Analytics",
                description: "AI object tracking for player movement, shot analysis, and coaching insights",
                direction: "left",
              },
              {
                number: "04",
                title: "Flight Maintenance",
                category: "Aircraft Inspection AI",
                description: "Automated inspection system reducing manual review time significantly",
                direction: "right",
              },
              {
                number: "05",
                title: "Connected Health",
                category: "Real-time Vitals Monitoring",
                description: "Medical device data sync for blood pressure, glucose, temperature tracking",
                direction: "left",
              },
            ].map((project, i) => (
              <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: { number: string; title: string; category: string; description?: string; direction?: string }
  index: number
  isVisible: boolean
}) {
  const direction = index % 2 === 0 ? "left" : "right"
  const getRevealClass = () => {
    if (!isVisible) {
      return direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex flex-col gap-3 border-b border-foreground/10 py-6 transition-all duration-700 hover:border-foreground/20 md:py-8 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {project.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{project.category}</p>
          {project.description && <p className="mt-2 text-sm text-foreground/70 md:text-base">{project.description}</p>}
        </div>
      </div>
    </div>
  )
}