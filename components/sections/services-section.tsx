"use client"

import { useReveal } from "@/hooks/use-reveal"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto md:mt-52 h-full w-full max-w-7xl overflow-y-auto py-8 md:py-12">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Capabilities
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ What we bring to the table</p>
        </div>

        <div className="grid gap-6 pb-8 sm:gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10 md:pb-12 lg:gap-x-24 lg:gap-y-12">
          {[
            {
              title: "AI & ML Solutions",
              description:
                "Conversational AI, predictive analytics, computer vision, and generative AI for automation and growth",
              direction: "top",
            },
            {
              title: "IoT & Tracking Systems",
              description: "Fleet, asset, pet, and personal tracking with real-time dashboards and geo-fencing alerts",
              direction: "right",
            },
            {
              title: "Web & Mobile Apps",
              description:
                "High-performance applications, ecommerce platforms, and enterprise solutions built with modern tech",
              direction: "left",
            },
            {
              title: "Cloud & DevOps",
              description: "Scalable cloud architectures, automation-first DevOps, and infrastructure management",
              direction: "bottom",
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-xl font-light text-foreground sm:text-2xl md:text-3xl">{service.title}</h3>
      <p className="text-sm leading-relaxed text-foreground/80 md:max-w-sm md:text-base">{service.description}</p>
    </div>
  )
}