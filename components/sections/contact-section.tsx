"use client"

import type React from "react"

import { Mail, MapPin, Linkedin, Phone, MessageCircle } from "lucide-react"
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
      } ${size === "lg" ? "px-8 py-3 md:px-12 md:py-4" : "px-6 py-2"} ${className}`}
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

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
  inquiryType?: string
  companyName?: string
}

interface CharCounts {
  name: number
  email: number
  phone: number
  subject: number
  message: number
  companyName: number
}

// Character limit configuration
const CHAR_LIMITS = {
  name: 50,
  email: 100,
  phone: 20,
  companyName: 100,
  subject: 150,
  message: 1000,
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
    companyName: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  // Character count states
  const [charCounts, setCharCounts] = useState<CharCounts>({
    name: 0,
    email: 0,
    phone: 0,
    subject: 0,
    message: 0,
    companyName: 0,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true)
        }
      },
      { threshold: 0.2 },
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

  const validateEmail = (email: string): { isValid: boolean; message?: string } => {
    if (!email.trim()) {
      return { isValid: false, message: "Email is required" }
    }

    // Check for basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Please enter a valid email address (e.g., name@example.com)" }
    }

    // Check for consecutive dots
    if (email.includes("..")) {
      return { isValid: false, message: "Email cannot contain consecutive dots" }
    }

    // Check for valid characters in local part
    const localPart = email.split("@")[0]
    if (!/^[a-zA-Z0-9._+-]+$/.test(localPart)) {
      return { isValid: false, message: "Email contains invalid characters" }
    }

    // Check domain has at least 2 characters after dot
    const domain = email.split("@")[1]?.toLowerCase()
    const domainParts = domain?.split(".")
    if (domainParts && domainParts[domainParts.length - 1].length < 2) {
      return { isValid: false, message: "Invalid email domain" }
    }

    return { isValid: true }
  }

  const validatePhone = (phone: string): { isValid: boolean; message?: string } => {
    if (!phone.trim()) {
      return { isValid: true } // Phone is optional
    }

    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, "")

    // Check if contains only valid characters
    const validCharsRegex = /^[\d\s\-+$$$$]+$/
    if (!validCharsRegex.test(phone)) {
      return { isValid: false, message: "Phone number can only contain digits, spaces, +, -, ( )" }
    }

    // Check minimum length (10 digits)
    if (digitsOnly.length < 10) {
      return { isValid: false, message: "Phone number must have at least 10 digits" }
    }

    // Check maximum length (15 digits for international numbers)
    if (digitsOnly.length > 15) {
      return { isValid: false, message: "Phone number cannot exceed 15 digits" }
    }

    // Check for invalid patterns
    if (/^0+$/.test(digitsOnly) || /^1+$/.test(digitsOnly)) {
      return { isValid: false, message: "Please enter a valid phone number" }
    }

    return { isValid: true }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters, spaces, hyphens, and apostrophes"
    }

    // Email validation
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message
    }

    // Phone validation
    const phoneValidation = validatePhone(formData.phone)
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.message
    }

    // Inquiry type validation
    if (!formData.inquiryType) {
      newErrors.inquiryType = "Please select an inquiry type"
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(false)

    try {
      const response = await fetch("https://formspree.io/f/xzznngvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          inquiryType: formData.inquiryType,
          companyName: formData.companyName,
        }),
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
          companyName: "",
        })
        setErrors({})
        setCharCounts({
          name: 0,
          email: 0,
          phone: 0,
          subject: 0,
          message: 0,
          companyName: 0,
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    const charLimit = CHAR_LIMITS[field as keyof typeof CHAR_LIMITS]

    // Prevent exceeding character limit
    if (charLimit && value.length > charLimit) {
      return
    }

    // Update character counts
    setCharCounts((prev) => ({ ...prev, [field]: value.length }))

    setFormData({ ...formData, [field]: value })

    // Real-time validation for email and phone
    if (field === "email" && value.trim()) {
      const emailValidation = validateEmail(value)
      if (!emailValidation.isValid) {
        setErrors({ ...errors, email: emailValidation.message })
      } else {
        setErrors({ ...errors, email: undefined })
      }
    } else if (field === "phone" && value.trim()) {
      const phoneValidation = validatePhone(value)
      if (!phoneValidation.isValid) {
        setErrors({ ...errors, phone: phoneValidation.message })
      } else {
        setErrors({ ...errors, phone: undefined })
      }
    } else if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  const getCharCountColor = (current: number, limit: number): string => {
    const percentage = (current / limit) * 100
    if (percentage >= 100) return "text-red-500"
    if (percentage >= 80) return "text-yellow-500"
    return "text-gray-400"
  }

  const socialLinks = [
    {
      name: "Call",
      icon: Phone,
      href: "tel:+919591622608",
      bgColor: "bg-blue-500",
      hoverBg: "hover:bg-blue-600",
      iconColor: "text-white",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:contact@qwickbit.com",
      bgColor: "bg-red-500",
      hoverBg: "hover:bg-red-600",
      iconColor: "text-white",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/919591622608",
      external: true,
      bgColor: "bg-green-500",
      hoverBg: "hover:bg-green-600",
      iconColor: "text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://in.linkedin.com/company/qwickbit-technologies-pvt.-ltd",
      external: true,
      bgColor: "bg-blue-600",
      hoverBg: "hover:bg-blue-700",
      iconColor: "text-white",
    },
  ]

  return (
    <section className="relative min-h-screen w-full px-4 py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-full -mt-8 max-w-7xl">
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
              <a href="mailto:contact@qwickbit.com" className="group block transition-all duration-300">
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
                    className={`group flex items-center gap-2 rounded-full ${social.bgColor} ${social.hoverBg} px-4 py-2 transition-all duration-300 transform hover:scale-105 shadow-lg`}
                  >
                    <social.icon className={`h-4 w-4 ${social.iconColor}`} />
                    <span className={`font-mono text-xs ${social.iconColor}`}>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div ref={formRef} className="flex flex-col justify-center">
            <div
              className={`rounded-2xl bg-transparent backdrop-blur-sm transition-all duration-1000 md:p-8 lg:p-10 ${
                isFormVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
            >
              <h3 className="mb-6 font-sans text-2xl font-light text-foreground md:text-3xl">Get in Touch</h3>

              <div className="space-y-5">
                {/* Name with Character Count */}
                <div
                  className={`transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "100ms" }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <label className="font-mono text-xs uppercase tracking-wider text-white">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <span className={`font-mono text-xs ${getCharCountColor(charCounts.name, CHAR_LIMITS.name)}`}>
                      {charCounts.name}/{CHAR_LIMITS.name}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full rounded-lg border ${errors.name ? "border-red-500" : "border-foreground/20"} bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                {/* Email with Character Count */}
                <div
                  className={`transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "150ms" }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <label className="font-mono text-xs uppercase tracking-wider text-white">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <span className={`font-mono text-xs ${getCharCountColor(charCounts.email, CHAR_LIMITS.email)}`}>
                      {charCounts.email}/{CHAR_LIMITS.email}
                    </span>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full rounded-lg border ${errors.email ? "border-red-500" : "border-foreground/20"} bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                {/* Phone & Company in Grid */}
                <div
                  className={`grid gap-5 sm:grid-cols-2 transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="font-mono text-xs uppercase tracking-wider text-white">Phone</label>
                      <span className={`font-mono text-xs ${getCharCountColor(charCounts.phone, CHAR_LIMITS.phone)}`}>
                        {charCounts.phone}/{CHAR_LIMITS.phone}
                      </span>
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`w-full rounded-lg border ${errors.phone ? "border-red-500" : "border-foreground/20"} bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="font-mono text-xs uppercase tracking-wider text-white">Company</label>
                      <span
                        className={`font-mono text-xs ${getCharCountColor(charCounts.companyName, CHAR_LIMITS.companyName)}`}
                      >
                        {charCounts.companyName}/{CHAR_LIMITS.companyName}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      className={`w-full rounded-lg border ${errors.companyName ? "border-red-500" : "border-foreground/20"} bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base`}
                      placeholder="Your company"
                    />
                    {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
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
                    onChange={(e) => handleInputChange("inquiryType", e.target.value)}
                    className={`w-full rounded-lg border ${errors.inquiryType ? "border-red-500" : "border-foreground/20"} bg-transparent px-4 py-3 text-sm text-foreground focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base`}
                  >
                    <option value="" className="bg-background">
                      Select inquiry type
                    </option>
                    <option value="Support" className="bg-background">
                      Support
                    </option>
                    <option value="Sales" className="bg-background">
                      Sales
                    </option>
                    <option value="General" className="bg-background">
                      General
                    </option>
                    <option value="Partnership" className="bg-background">
                      Partnership
                    </option>
                    <option value="Career" className="bg-background">
                      Career
                    </option>
                  </select>
                  {errors.inquiryType && <p className="mt-1 text-xs text-red-500">{errors.inquiryType}</p>}
                </div>

                {/* Subject with Character Count */}
                <div
                  className={`transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <label className="font-mono text-xs uppercase tracking-wider text-white">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <span className={`font-mono text-xs ${getCharCountColor(charCounts.subject, CHAR_LIMITS.subject)}`}>
                      {charCounts.subject}/{CHAR_LIMITS.subject}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className={`w-full rounded-lg border ${errors.subject ? "border-red-500" : "border-foreground/20"} bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                </div>

                {/* Message with Character Count */}
                <div
                  className={`transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "350ms" }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <label className="font-mono text-xs uppercase tracking-wider text-white">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <span className={`font-mono text-xs ${getCharCountColor(charCounts.message, CHAR_LIMITS.message)}`}>
                      {charCounts.message}/{CHAR_LIMITS.message}
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className={`w-full rounded-lg border ${errors.message ? "border-red-500" : "border-foreground/20"} bg-transparent px-4 py-3 text-sm text-white placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base`}
                    placeholder="Tell us about your inquiry..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
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
                    <p className="mt-4 text-center font-mono text-sm text-green-500">
                      ✓ Thank you! We'll be in touch soon.
                    </p>
                  )}
                  {submitError && (
                    <p className="mt-4 text-center font-mono text-sm text-red-500">
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
