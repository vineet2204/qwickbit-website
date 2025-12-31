"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowRight, Sparkles, TrendingUp, Users, Code, Lightbulb, Target, Zap, Shield, Globe } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useEffect, useRef } from "react"
import TrustedClients from "../TrustedClientsSection"
import { MagneticButton } from "../magnetic-button"

interface Review {
  id: string
  rating: number
  title: string
  text: string
  author: string
  company: string
  date: string
}

interface ClientLogo {
  name: string
  logo: string
}

interface Service {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features: string[]
}

// Extend Window interface for GoodFirms widget
declare global {
  interface Window {
    goodfirms_init?: () => void
  }
}

export default function AboutSection({
  reviews = [],
  clients = [],
  scrollToSection,
}: {
  reviews?: Review[]
  clients?: ClientLogo[]
  scrollToSection?: (index: number) => void
}) {
  const { ref, isVisible } = useReveal(0.3)
  const widgetRef = useRef(null)

  const defaultReviews: Review[] = [
    {
      id: "1",
      rating: 5,
      title: "Highly Reliable offshore development & support",
      text: "The Qwickbit team, true to its name provided valuable support and met all milestones as planned with exceptional quality and professionalism.",
      author: "Franklin Wireless",
      company: "Franklin Wireless",
      date: "29/7/21",
    },
    {
      id: "2",
      rating: 5,
      title: "Qwickbits our reliable partner",
      text: "We have been working with Qwickbit over three years on multiple projects. They have developed, deployed and supported complex solutions consistently.",
      author: "Integrow",
      company: "Integrow",
      date: "22/7/21",
    },
    {
      id: "3",
      rating: 4,
      title: "Qwickbit- capable and creative",
      text: "Sridhar Raghuram is a professional website developer. I'd recommend him to anyone who would like to build innovative digital solutions.",
      author: "Mobile Force",
      company: "Mobile Force",
      date: "19/7/21",
    },
  ]

  const defaultClients: ClientLogo[] = [
    { name: "NaviRisk", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop" },
    {
      name: "Franklin Wireless",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop",
    },
    { name: "MobileForce", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop" },
    { name: "Integrow", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop" },
  ]

  const services: Service[] = [
    {
      id: "1",
      icon: Zap,
      title: "AI & Machine Learning",
      description:
        "Harness the power of artificial intelligence to transform your business operations and decision-making.",
      features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Deep Learning Models"],
    },
    {
      id: "2",
      icon: Globe,
      title: "IoT Solutions",
      description:
        "Connect and manage your devices with cutting-edge Internet of Things technology for real-time insights.",
      features: ["Device Management", "Real-time Monitoring", "Fleet Tracking", "Smart Automation"],
    },
    {
      id: "3",
      icon: Code,
      title: "Custom Software Development",
      description: "Tailored software solutions built to address your unique business challenges and drive growth.",
      features: ["Web Applications", "Mobile Apps", "Enterprise Software", "API Integration"],
    },
    {
      id: "4",
      icon: Shield,
      title: "Cloud & DevOps",
      description: "Scalable cloud infrastructure and streamlined deployment processes for maximum efficiency.",
      features: ["Cloud Migration", "CI/CD Pipelines", "Infrastructure as Code", "Performance Optimization"],
    },
  ]

  const reviewList = reviews.length > 0 ? reviews : defaultReviews
  const clientLogos = clients.length > 0 ? clients : defaultClients

  const processSteps = [
    {
      name: "Requirement gathering",
      icon: "📋",
    },
    {
      name: "Wire Framing & Prototyping",
      icon: "📐",
    },
    {
      name: "UI/UX Designing",
      icon: "💻",
    },
    {
      name: "Development Process",
      icon: "⚙️",
    },
    {
      name: "Launch & Improvise",
      icon: "🚀",
    },
  ]

  useEffect(() => {
    // Load GoodFirms widget script
    const script = document.createElement("script")
    script.src = "https://assets.goodfirms.co/assets/js/widget.min.js"
    script.type = "text/javascript"
    script.async = true

    script.onload = () => {
      console.log("GoodFirms widget script loaded")
      // Force widget initialization if needed
      if (window.goodfirms_init) {
        window.goodfirms_init()
      }
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <section className="w-screen min-h-screen md:mt-20 shrink-0 snap-start overflow-y-auto overflow-x-hidden">
      {/* Why Choose Section */}
      <div className="h-screen w-full md:-mt-14 mt-24 shrink-0 snap-start flex items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16">
        <div ref={ref as React.RefObject<HTMLDivElement>} className="mx-auto w-full max-w-7xl">
          <div className="grid gap-8 mt-10 md:grid-cols-2 md:gap-16 lg:gap-24">
            {/* Left side - Story */}
            <div>
              <div
                className={`mb-6 transition-all duration-700 md:mb-12 ${
                  isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
                }`}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6 mt-20 md:mt-0">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Why Choose Us</span>
                </div>

            <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
                  Excellence in
                  <br />
                  <span className="bg-white bg-clip-text text-transparent">Digital Innovation</span>
                </h2>
              </div>

              <div
                className={`space-y-4 transition-all duration-700 md:space-y-6 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <TrendingUp className="w-6 h-6 text-white shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Deep Domain Expertise</h3>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      Proven track record across insurance, healthcare, ecommerce, transportation, real estate, sports,
                      and aviation sectors.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <Users className="w-6 h-6 text-white shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Enterprise-Grade Solutions</h3>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      Delivering AI, IoT, and cloud solutions that drive measurable business impact and ROI.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Stats Cards */}
            <div className="flex flex-col justify-center space-y-6 md:space-y-10">
              {[
                { value: "50+", label: "Clients", sublabel: "Worldwide partnerships", direction: "right" },
                { value: "200+", label: "Projects", sublabel: "Delivered successfully", direction: "left" },
                { value: "10+", label: "Years", sublabel: "In innovation", direction: "right" },
              ].map((stat, i) => {
                const getRevealClass = () => {
                  if (!isVisible) {
                    return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                  }
                  return "translate-x-0 opacity-100"
                }

                return (
                  <div
                    key={i}
                    className={`group relative flex items-center gap-6 rounded-2xl   p-6 transition-all duration-700 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 md:gap-8 ${getRevealClass()}`}
                    style={{
                      transitionDelay: `${300 + i * 150}ms`,
                    }}
                  >
                    <div className="flex-1">
                      <div className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">{stat.value}</div>
                      <div className="mt-1 font-sans text-lg font-semibold text-foreground md:text-xl">
                        {stat.label}
                      </div>
                      <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className={`flex mt-8 flex-wrap gap-3 transition-all duration-700 md:gap-4 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "750ms" }}
          >
            <MagneticButton
              onClick={() => scrollToSection?.(4)}
              
            >
              <span className="relative z-10 flex items-center">
                Start a Project <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection?.(1)}
            
            >
              <span className="relative z-10 flex items-center">View Our Work</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="w-full bg-transparent">
        {/* About Qwickbit Section */}
<section className="w-full mt-56 md:mt-0 px-4 py-20 md:px-12 md:py-32 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
                <Lightbulb className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">About Us</span>
              </div>
              <h2 className="font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
                Transforming Ideas into
                <br />
                <span className="bg-white bg-clip-text text-transparent">Digital Reality</span>
              </h2>
              <p className="mt-6 text-lg text-foreground/70 max-w-3xl leading-relaxed">
                Qwickbit Technologies is a leading IT, AI, and technology solutions provider committed to empowering
                businesses through innovation. With over a decade of experience, we specialize in delivering
                cutting-edge solutions that drive digital transformation and create lasting value for our clients
                worldwide.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 mb-16">
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8">
                <Target className="w-12 h-12 text-white mb-4" />
                <h3 className="font-sans text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-foreground/80 leading-relaxed">
                  To deliver innovative, scalable, and reliable technology solutions that empower businesses to achieve
                  their goals. We believe in building long-term partnerships by understanding our clients' unique
                  challenges and crafting solutions that exceed expectations.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8">
                <Sparkles className="w-12 h-12 text-white mb-4" />
                <h3 className="font-sans text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-foreground/80 leading-relaxed">
                  To be the most trusted technology partner globally, recognized for excellence in AI, IoT, and custom
                  software development. We strive to continuously innovate and push the boundaries of what's possible,
                  helping businesses thrive in the digital age.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full md:-mt-40 -mt-24 px-4 py-20 md:px-12 md:py-32 lg:px-16 bg-gradient-to-b from-transparent to-primary/5">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
                <Code className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">What We Offer</span>
              </div>
              <h2 className="font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
                Our Core
                <br />
                <span className="bg-white bg-clip-text text-transparent">Solutions</span>
              </h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                Comprehensive technology services designed to accelerate your digital transformation journey.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
              {services.map((service, idx) => {
                const Icon = service.icon
                return (
                  <Card
                    key={service.id}
                    className="group overflow-hidden border border-primary/20 shadow-lg transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-sans text-2xl font-bold text-foreground group-hover:text-white transition-colors mb-2">
                            {service.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-foreground/80">{service.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 ml-18">
                        {service.features.map((feature, featureIdx) => (
                          <div key={featureIdx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            <span className="text-sm text-foreground/70">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Clients & Reviews Section */}

        {/* Process Model Section */}
        <section className="w-full px-4 py-20 md:px-12 md:py-32 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
                <Target className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Our Approach</span>
              </div>
              <h2 className="font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl mb-6">
                <span className="bg-white bg-clip-text text-transparent">Process</span>
                <br />
                Model
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl leading-relaxed">
                With Agile first mindset, We enable our clients to get to see important features within a hand full of
                days instead of waiting for the development cycle to end. This gives them enough time to use the
                products & give valuable feedback to ensure that we are heading towards the same goal.
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-5 grid-cols-1 gap-8 md:gap-4 my-12 md:my-20">
              {processSteps.map((step, i) => {
                const isLast = i === processSteps.length - 1
                const isEven = i % 2 === 0

                return (
                  <div key={i} className="flex flex-col items-center relative">
                    {/* Step Number and Name */}
                    <div className="flex flex-col items-center mb-6">
                      <p className="text-4xl font-bold text-white mb-2">{i + 1}</p>
                      <p className="text-sm text-center text-foreground/70 font-medium">{step.name}</p>
                    </div>

                    {/* Progress Line */}
                    <div className="hidden md:flex w-full items-center justify-center mb-6">
                      <div className={`flex-1 h-1 bg-primary/20 ${i === 0 ? "rounded-l-full" : ""}`} />
                      <div className="w-4 h-4 rounded-full bg-primary z-10 flex-shrink-0" />
                      <div className={`flex-1 h-1 bg-primary/20 relative ${isLast ? "rounded-r-full" : ""}`}>
                        {!isLast && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-primary">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Icon Circle */}
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 w-28 h-28 rounded-full flex items-center justify-center border border-primary/30 hover:border-primary/50 transition-all hover:scale-110 group">
                      <div className="text-5xl group-hover:scale-110 transition-transform">{step.icon}</div>
                    </div>

                    {/* Mobile Progress Line */}
                    {!isLast && (
                      <div className="md:hidden flex flex-col items-center my-6">
                        <div className="w-1 h-16 bg-primary/20" />
                        <div className="text-primary">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="rotate-90"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <TrustedClients />

            {/* CTA Button */}
            <div className="flex justify-center mt-16">
              <MagneticButton
                onClick={() => scrollToSection?.(4)}
                
              >
                <span className="relative z-10 flex items-center">
                  Let's Start Your Project <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
