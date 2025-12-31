"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, MessageCircle, Briefcase, HelpCircle, Handshake, Users } from "lucide-react"

interface InquiryDropdownProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

interface InquiryOption {
  value: string
  label: string
  description: string
  icon: React.ReactNode
}

const inquiryOptions: InquiryOption[] = [
  {
    value: "Support",
    label: "Support",
    description: "Need help with an issue?",
    icon: <HelpCircle className="h-4 w-4" />,
  },
  {
    value: "Sales",
    label: "Sales",
    description: "Interested in our services?",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    value: "General",
    label: "General",
    description: "General inquiry",
    icon: <MessageCircle className="h-4 w-4" />,
  },
  {
    value: "Partnership",
    label: "Partnership",
    description: "Let's collaborate",
    icon: <Handshake className="h-4 w-4" />,
  },
  {
    value: "Career",
    label: "Career",
    description: "Join our team",
    icon: <Users className="h-4 w-4" />,
  },
]

export default function InquiryDropdown({ value, onChange, error }: InquiryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const selectedOption = inquiryOptions.find((opt) => opt.value === value)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  return (
    <div ref={dropdownRef} className="relative z-50">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full transition-all duration-200 flex items-center justify-between rounded-lg border ${
          error ? "border-red-500" : "border-foreground/20"
        } bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-white focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 md:text-base group hover:border-foreground/40 ${
          isOpen ? "border-foreground/40 relative z-[60]" : ""
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1 text-left">
          {selectedOption && (
            <>
              <div className="text-foreground/60 group-hover:text-foreground/80 transition-colors">
                {selectedOption.icon}
              </div>
              <div>
                <div className="font-medium">{selectedOption.label}</div>
                <div className="text-xs text-foreground/50 hidden sm:block">{selectedOption.description}</div>
              </div>
            </>
          )}
          {!selectedOption && (
            <>
              <MessageCircle className="h-4 w-4 text-foreground/60" />
              <span className="text-foreground/60">Select inquiry type</span>
            </>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-foreground/60 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-[70] mt-2 bg-gray-900/95 border border-gray-700 rounded-lg shadow-2xl overflow-hidden backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {inquiryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left text-sm transition-all duration-150 group ${
                  selectedOption?.value === option.value
                    ? "bg-blue-600/20 border-l-2 border-blue-500"
                    : "border-l-2 border-transparent hover:bg-white/5"
                }`}
              >
                <div className="text-gray-400 group-hover:text-white transition-colors mt-0.5 flex-shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white leading-snug">{option.label}</div>
                  <div className="text-xs text-gray-400 leading-snug">{option.description}</div>
                </div>
                {selectedOption?.value === option.value && (
                  <div className="ml-2 mt-0.5 text-blue-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}