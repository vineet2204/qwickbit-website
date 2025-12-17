"use client"

import {
  Mail,
  MapPin,
  Linkedin,
  Phone,
  Instagram,
  Youtube,
} from "lucide-react"
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6"
import { useState, useEffect, useRef } from "react"

interface MagneticButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "sm" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
}

function MagneticButton({ children, variant, size, className, onClick, disabled }: MagneticButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden rounded-full font-mono text-sm transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
        variant === "primary"
          ? "bg-foreground text-background hover:bg-foreground/90"
          : "border border-foreground/30 bg-transparent text-foreground hover:border-foreground"
      } ${
        size === "lg" ? "px-8 py-3 md:px-12 md:py-4" : "px-6 py-2"
      } ${className}`}
    >
      {children}
    </button>
  )
}

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  inquiryType: string
  companyName: string
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
    companyName: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (formRef.current) {
      observer.observe(formRef.current)
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current)
      }
    }
  }, [])

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.inquiryType) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(false)

    try {
      const response = await fetch("https://formspree.io/f/xzznngvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          inquiryType: formData.inquiryType,
          companyName: formData.companyName
        })
      })

      if (response.ok) {
        setIsSubmitting(false)
        setSubmitSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          inquiryType: "",
          companyName: ""
        })
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      setIsSubmitting(false)
      setSubmitError(true)
      setTimeout(() => setSubmitError(false), 5000)
    }
  }

const socialLinks = [
  {
    name: "Call",
    icon: Phone,
    href: "tel:+919591622608",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:contact@qwickbit.com",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    href: "https://wa.me/919591622608",
    external: true,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://in.linkedin.com/company/qwickbit-technologies-pvt.-ltd",
    external: true,
  },
  {
    name: "X",
    icon: FaXTwitter,
    href: "https://x.com/qwickbit1",
    external: true,
  },

]


  return (
    <section className="relative min-h-screen w-full px-4 py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Left side - Contact Info */}
          <div className="flex mt-18 flex-col justify-start space-y-8 md:space-y-12">
            <div className="space-y-4">
              <h2 className="font-sans text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
                Ready to
                <br />
                transform?
              </h2>
              <p className="font-mono text-sm text-white md:text-base lg:text-lg">
                / Let's build something intelligent together
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {/* Email */}
              <a
                href="mailto:contact@qwickbit.com"
                className="group block transition-all duration-300"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white">Email</span>
                </div>
                <p className="text-xl text-foreground transition-colors group-hover:text-white md:text-2xl lg:text-3xl">
                  contact@qwickbit.com
                </p>
              </a>

              {/* Location */}
              <div className="transition-all duration-300">
                <div className="mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white">Location</span>
                </div>
                <p className="text-xl text-foreground md:text-2xl lg:text-3xl">Global Operations</p>
              </div>

              {/* Social Media Icons */}
           <div className="flex flex-wrap gap-3">
  {socialLinks.map((social) => (
    <a
      key={social.name}
      href={social.href}
      target={social.external ? "_blank" : undefined}
      rel={social.external ? "noopener noreferrer" : undefined}
      aria-label={social.name}
      className="group flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-4 py-2 transition-all duration-300 hover:border-foreground/50 hover:bg-foreground/5"
    >
      <social.icon className="h-4 w-4 text-white transition-colors group-hover:text-foreground" />
      <span className="font-mono text-xs text-white transition-colors group-hover:text-foreground">
        {social.name}
      </span>
    </a>
  ))}
</div>

            </div>
          </div>

          {/* Right side - Contact Form */}
          <div ref={formRef} className="flex flex-col justify-center">
            <div
              className={`rounded-2xl  bg-transparent backdrop-blur-sm transition-all duration-1000 md:p-8 lg:p-10 ${
                isFormVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
            >
              <h3 className="mb-6 font-sans text-2xl font-light text-foreground md:text-3xl">
                Get in Touch
              </h3>

              <div className="space-y-5">
                {/* Name */}
                <div
                  className={`transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "100ms" }}
                >
                  <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-white">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-foreground/20 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div
                  className={`transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "150ms" }}
                >
                  <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-white">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-foreground/20  px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone & Company in Grid */}
                <div
                  className={`grid gap-5 sm:grid-cols-2 transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-white">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-foreground/20  px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-white">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full rounded-lg border border-foreground/20 px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div
                  className={`transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "250ms" }}
                >
                  <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-white">
                    Inquiry Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full rounded-lg border border-foreground/20  px-4 py-3 text-sm text-foreground focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base"
                  >
                    <option value="" className="bg-background">Select inquiry type</option>
                    <option value="Support" className="bg-background">Support</option>
                    <option value="Sales" className="bg-background">Sales</option>
                    <option value="General" className="bg-background">General</option>
                    <option value="Partnership" className="bg-background">Partnership</option>
                    <option value="Career" className="bg-background">Career</option>
                  </select>
                </div>

                {/* Subject */}
                <div
                  className={`transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-white">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-lg border border-foreground/20  px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div
                  className={`transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "350ms" }}
                >
                  <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-white">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-foreground/20  px-4 py-3 text-sm text-white placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <div
                  className={`pt-2 transition-all duration-700 ${
                    isFormVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <MagneticButton
                    onClick={handleSubmit}
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </MagneticButton>
                  {submitSuccess && (
                    <p className="mt-4 text-center font-mono text-sm text-green-600">
                      ✓ Thank you! We'll be in touch soon.
                    </p>
                  )}
                  {submitError && (
                    <p className="mt-4 text-center font-mono text-sm text-red-600">
                      ✕ Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}