"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { useReveal } from "@/components/ui/use-reveal"
import { useState } from "react"

interface BlogPost {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  date: string
}

interface Review {
  id: string
  rating: number
  title: string
  text: string
  author: string
  company: string
  date: string
}

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
}

interface ClientLogo {
  name: string
  logo: string
}

export default function AboutSection({
  blogs = [],
  reviews = [],
  projects = [],
  clients = [],
  scrollToSection,
}: {
  blogs?: BlogPost[]
  reviews?: Review[]
  projects?: Project[]
  clients?: ClientLogo[]
  scrollToSection?: (index: number) => void
}) {
  const { ref, isVisible } = useReveal(0.3)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const defaultBlogs: BlogPost[] = [
    {
      id: "1",
      title: "Introducing Qwickbit Technologies",
      description: "Discover how our cutting-edge platform transforms your business with innovative solutions.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      tags: ["IOT", "WEB", "MOBILE"],
      date: "28th Jul 2021",
    },
    {
      id: "2",
      title: "How we can help track your pets",
      description: "Real-time tracking solutions for your beloved companions using advanced IoT technology.",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop",
      tags: ["WEB", "IOT"],
      date: "22nd Jul 2021",
    },
  ]

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

  const defaultProjects: Project[] = [
    {
      id: "1",
      title: "micasa.ai",
      description: "Cloud-based platform helping you throughout the property management lifecycle with AI-powered insights.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      tags: ["WEB", "MOBILE", "DESIGN"],
    },
    {
      id: "2",
      title: "InfoTrak Fleet",
      description: "Fleet management application with real-time tracking and analytics for optimal route planning.",
      image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop",
      tags: ["WEB", "IOT"],
    },
    {
      id: "3",
      title: "Pintrac",
      description: "Pet and package tracking application from Franklin Wireless with precise location services.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tags: ["WEB", "MOBILE", "IOT"],
    },
    {
      id: "4",
      title: "Protectmewell",
      description: "All your insurance needs taken care of in one comprehensive digital platform.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      tags: ["WEB", "MOBILE"],
    },
  ]

  const defaultClients: ClientLogo[] = [
    { name: "NaviRisk", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop" },
    { name: "Franklin Wireless", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop" },
    { name: "MobileForce", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop" },
    { name: "Integrow", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop" },
  ]

  const blogPosts = blogs.length > 0 ? blogs : defaultBlogs
  const reviewList = reviews.length > 0 ? reviews : defaultReviews
  const projectList = projects.length > 0 ? projects : defaultProjects
  const clientLogos = clients.length > 0 ? clients : defaultClients

  return (
    <section className="w-screen min-h-scree mt-20 shrink-0 overflow-y-auto overflow-x-hidden ">
      {/* Why Choose Section */}
      <div className="h-screen w-full shrink-0 snap-start flex items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16">
        <div ref={ref} className="mx-auto w-full max-w-7xl">
          <div className="grid gap-8 mt-10 md:grid-cols-2 md:gap-16 lg:gap-24">
            {/* Left side - Story */}
            <div>
              <div
                className={`mb-6 transition-all duration-700 md:mb-12 ${
                  isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
                }`}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Why Choose Us</span>
                </div>
                <h2 className="mb-3 font-sans text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                  Excellence in
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Digital Innovation
                  </span>
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
                      Proven track record across insurance, healthcare, ecommerce, transportation, real estate, sports, and aviation sectors.
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
                { value: "50+", label: "Clients", sublabel: "Worldwide partnerships", direction: "right",  },
                { value: "200+", label: "Projects", sublabel: "Delivered successfully", direction: "left" },
                { value: "10+", label: "Years", sublabel: "In innovation", direction: "right"},
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
                    className={`group relative flex items-center gap-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 transition-all duration-700 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 md:gap-8 ${getRevealClass()}`}
                    style={{
                      transitionDelay: `${300 + i * 150}ms`,
                    }}
                  >
                    {/* <div className="text-4xl">{stat.icon}</div> */}
                    <div className="flex-1">
                      <div className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">{stat.value}</div>
                      <div className="mt-1 font-sans text-lg font-semibold text-foreground md:text-xl">{stat.label}</div>
                      <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className={` flex mt-8 flex-wrap gap-3 transition-all duration-700  md:gap-4 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "750ms" }}
          >
           <button
  onClick={() => scrollToSection?.(4)}
  className="
    flex items-center gap-2.5 px-4 py-2.5
    rounded-xl
    bg-white/10
    border border-white/30
    backdrop-blur-xl
    shadow-[inset_0_0_0_0_rgba(255,255,255,0.25),0_6px_20px_rgba(0,0,0,0.18)]
    transition-all duration-300
    hover:bg-white/20
    hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_8px_28px_rgba(0,0,0,0.22)]
    hover:scale-[1.03]
    active:scale-[0.97]
    relative overflow-hidden
    text-white font-montserrat font-semibold
    before:absolute before:inset-0
    before:bg-gradient-to-b before:from-white/40 before:to-transparent
    before:opacity-60 before:pointer-events-none
  "
>
  <span className="relative z-10 flex items-center">
    Start a Project <ArrowRight className="w-4 h-4 ml-1" />
  </span>
</button>

<button
  onClick={() => scrollToSection?.(1)}
  className="
    flex items-center gap-2.5 px-4 py-2.5
    rounded-xl
    bg-white/10
    border border-white/30
    backdrop-blur-xl
    shadow-[inset_0_0_0_0_rgba(255,255,255,0.25),0_6px_20px_rgba(0,0,0,0.18)]
    transition-all duration-300
    hover:bg-white/20
    hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_8px_28px_rgba(0,0,0,0.22)]
    hover:scale-[1.03]
    active:scale-[0.97]
    relative overflow-hidden
    text-white font-montserrat font-semibold
    before:absolute before:inset-0
    before:bg-gradient-to-b before:from-white/40 before:to-transparent
    before:opacity-60 before:pointer-events-none
  "
>
  <span className="relative z-10 flex items-center">
    View Our Work
  </span>
</button>

          </div>
        </div>
      </div>

      <div className="w-full bg-transparent">
        {/* Blog Section */}
        <section className="w-full mt-24 px-4 py-20 md:px-12 md:py-32 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
                <span className="text-sm font-medium text-white">Latest Insights</span>
              </div>
              <h2 className="font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
                From Our
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Blog
                </span>
              </h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                Insights, tutorials, and thought leadership on technology and innovation.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
              {blogPosts.map((post, idx) => (
                <Card key={post.id} className="group overflow-hidden border  shadow-lg transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                  <div className="relative h-64 w-full overflow-hidden bg-muted">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>
                  <CardHeader className="pb-4">
                    <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm leading-relaxed text-white">{post.description}</p>
                  </CardContent>
                  <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-medium bg-primary/10 text-white border-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-white">{post.date}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href="#" className="group inline-flex items-center gap-2 font-sans text-base font-semibold text-white hover:gap-3 transition-all">
                View all articles
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        {/* Clients & Reviews Section */}
        <section className="w-full  px-4 py-20 md:px-12 md:py-32 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
                <Star className="w-4 h-4 text-white fill-yellow-300" />
                <span className="text-sm font-medium text-white">Client Success</span>
              </div>
              <h2 className="font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
                Trusted by
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Industry Leaders
                </span>
              </h2>
            </div>

            {/* Client Logos */}
            <div className="mb-20 grid gap-6 grid-cols-2 md:grid-cols-4 lg:gap-8">
              {clientLogos.map((client, idx) => (
                <div
                  key={client.name}
                  className="group relative flex items-center justify-center rounded-2xl bg-background/50 backdrop-blur-sm p-8 transition-all hover:bg-background hover:shadow-lg border border-border/50 hover:border-primary/30"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground/70 group-hover:text-white transition-colors">
                      {client.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div className="rounded-3xl bg-gradient-to-br from-background to-background/50 backdrop-blur-sm p-8 md:p-12 border border-border/50 shadow-xl">
              <div className="mb-12 flex flex-wrap items-center gap-6">
                <div className="flex-1">
                  <div className="font-sans text-3xl font-bold text-foreground mb-2">EXCELLENT</div>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                    ))}
                    <span className="ml-2 font-sans text-lg font-semibold text-foreground">4.9 out of 5</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-primary/10 px-6 py-4 border border-primary/20">
                  <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2L15.09 10.26H24L17.55 15.73L20.64 24L12 18.54L3.36 24L6.45 15.73L0 10.26H8.91L12 2Z"
                      className="text-yellow-500"
                    />
                  </svg>
                  <span className="font-sans text-lg font-bold text-foreground">Goodfirms</span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
                {reviewList.map((review) => (
                  <div key={review.id} className="group rounded-2xl bg-card/50 p-6 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 transition-all ${
                            i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="font-sans text-base font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {review.title}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-white mb-4">{review.text}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold">{review.author.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-sans text-sm font-semibold text-white">{review.author}</p>
                        <p className="text-xs text-muted-white">{review.company} • {review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="w-full px-4 py-20 md:px-12 md:py-32 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
                <span className="text-sm font-medium text-white">Our Work</span>
              </div>
              <h2 className="font-sans text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
                Recent
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="mt-4 text-lg text-foreground/70 max-w-2xl">
                A showcase of our most impactful digital solutions and innovations.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
              {projectList.map((project) => (
                <Card 
                  key={project.id} 
                  className="group overflow-hidden border shadow-lg transition-all hover:shadow-2xl hover:shadow-primary/10"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative h-72 w-full overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-90' : 'opacity-70'
                    }`}>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <h3 className="font-sans text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-white/90 leading-relaxed">{project.description}</p>
                      </div>
                    </div>
                  </div>
                  <CardFooter className="flex flex-wrap gap-2 border-t border-border/50 pt-6 pb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-medium bg-primary/10 text-white border-0 px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href="#" className="group inline-flex items-center gap-2 font-sans text-base font-semibold text-white hover:gap-3 transition-all">
                View all projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}