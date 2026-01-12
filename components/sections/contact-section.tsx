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
  // subject: string
  message: string
  // inquiryType: string
  // companyName: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  // subject?: string
  message?: string
  // inquiryType?: string
  // companyName?: string
}

interface CharCounts {
  name: number
  email: number
  phone: number
  // subject: number
  message: number
  // companyName: number
}

// Character limit configuration
const CHAR_LIMITS = {
  name: 50,
  email: 100,
  phone: 20,
  // companyName: 100,
  // subject: 150,
  message: 1000,
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    // subject: "",
    message: "",
    // inquiryType: "",
    // companyName: "",
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
    // subject: 0,
    message: 0,
    // companyName: 0,
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
    const validCharsRegex = /^[\d\s\-+()]+$/
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
    // if (!formData.inquiryType) {
    //   newErrors.inquiryType = "Please select an inquiry type"
    // }

    // Subject validation
    // if (!formData.subject.trim()) {
    //   newErrors.subject = "Subject is required"
    // } else if (formData.subject.trim().length < 3) {
    //   newErrors.subject = "Subject must be at least 3 characters"
    // }

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
          // subject: formData.subject,
          message: formData.message,
          // inquiryType: formData.inquiryType,
          // companyName: formData.companyName,
        }),
      })

      if (response.ok) {
        setIsSubmitting(false)
        setSubmitSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
   
          message: "",
      
        })
        setErrors({})
        setCharCounts({
          name: 0,
          email: 0,
          phone: 0,
         
          message: 0,
         
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
      svg: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
            fill="#3B82F6"
          />
        </svg>
      ),
      href: "tel:+919591622608",
    },
    {
      name: "Email",
      svg: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            fill="#EF4444"
          />
          <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      href: "mailto:contact@qwickbit.com",
    },
    {
      name: "WhatsApp",
      svg: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#25D366" />
          <path
            d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.46-.01z"
            fill="white"
          />
        </svg>
      ),
      href: "https://wa.me/919591622608",
      external: true,
    },
    {
      name: "LinkedIn",
      svg: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#0A66C2" />
          <path
            d="M6.5 8.5h3v10h-3v-10zM8 5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM12 8.5h2.8v1.4c.4-.7 1.3-1.4 2.7-1.4 2.9 0 3.5 1.9 3.5 4.4v5.6h-3v-5c0-1.1 0-2.5-1.5-2.5s-1.5 1.2-1.5 2.4v5.1h-3v-10z"
            fill="white"
          />
        </svg>
      ),
      href: "https://in.linkedin.com/company/qwickbit-technologies-pvt.-ltd",
      external: true,
    },
  ]

  return (
    <section className="relative min-h-screen w-full px-4 py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-full -mt-8 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Left side - Contact Info */}
          <div className="flex mt-18 flex-col justify-start space-y-8 md:space-y-12">
            <div className="space-y-4">
              <h2 className="font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Let’s Build
                <br />
                Something Great
              </h2>
              <p className="font-mono text-sm text-foreground/60 md:text-base">
                / Have an idea or a challenge? Let’s talk.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {/* Email */}
              <a href="mailto:contact@qwickbit.com" className="group block transition-all duration-300">
                <div className="mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white">Email</span>
                </div>
                <p className="text-xl text-foreground transition-colors group-hover:text-white md:text-md lg:text-xl">
                  contact@qwickbit.com
                </p>
              </a>

              {/* Location */}
            {/* Location & Global Reach */}
              <div className="transition-all duration-300">
                <div className="mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white">Headquarters</span>
                </div>
                <p className="text-md text-foreground md:text-md lg:text-xl">
                  #721 A Sector 16th A Main Road<br />
                  Yelahanka New Town<br />
                  Bangalore 560064, India
                </p>
                <p className="mt-3 font-mono text-sm text-white/60">
                  Operating globally • Serving clients worldwide
                </p>
              </div>

              

              {/* Social Media Icons */}
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={social.name}
                    className="group flex items-center gap-2 transition-all duration-300 transform hover:scale-110"
                  >
                    {social.svg}
                    <span className="font-mono text-sm font-semibold text-white transition-colors">
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
                  {errors.email && <p className="mt-1 text-xs text-white">{errors.email}</p>}
                </div>

                {/* Phone & Company in Grid */}
                <div
                  className={` transition-all duration-700 ${
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

                  {/* <div>
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
                  </div> */}
                </div>

                {/* Inquiry Type */}
                {/* <div
                  className={`transition-all duration-700 ${
                    isFormVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "250ms" }}
                >
                  <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-white">
                    Inquiry Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => handleInputChange("inquiryType", e.target.value)}
                      className={`w-full appearance-none rounded-lg border ${errors.inquiryType ? "border-red-500" : "border-foreground/20"} bg-transparent px-4 py-3 pr-10 text-sm text-foreground focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base cursor-pointer transition-all`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.25rem'
                      }}
                    >
                      <option value="" className="bg-black text-gray-400">
                        Select inquiry type
                      </option>
                      <option value="Support" className="bg-black text-white">
                        Support
                      </option>
                      <option value="Sales" className="bg-black text-white">
                        Sales
                      </option>
                      <option value="General" className="bg-black text-white">
                        General
                      </option>
                      <option value="Partnership" className="bg-black text-white">
                        Partnership
                      </option>
                      <option value="Career" className="bg-black text-white">
                        Career
                      </option>
                    </select>
                  </div>
                  {errors.inquiryType && <p className="mt-1 text-xs text-red-500">{errors.inquiryType}</p>}
                </div> */}

                {/* Subject with Character Count */}
                {/* <div
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
                </div> */}

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