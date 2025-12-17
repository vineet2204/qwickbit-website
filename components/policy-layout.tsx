"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { X, ArrowLeft } from 'lucide-react'

interface PolicyLayoutProps {
  title: string
  children: React.ReactNode
  onClose?: () => void
}

export function PolicyLayout({ title, children, onClose }: PolicyLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    setIsLoaded(true)
    setIsVisible(true)

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop
        const scrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight
        const progress = (scrollTop / scrollHeight) * 100
        setScrollProgress(progress)
      }
    }

    const ref = contentRef.current
    if (ref) {
      ref.addEventListener('scroll', handleScroll)
      return () => ref.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      if (onClose) {
        onClose()
      } else {
        window.history.back()
      }
    }, 300)
  }

  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Fluid Effect Background */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.5}
            detail={0.6}
            blend={40}
            coarseX={20}
            coarseY={20}
            mediumX={20}
            mediumY={20}
            fineX={20}
            fineY={20}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.7}
            radius={1.5}
            momentum={20}
            maskType="alpha"
            opacity={0.95}
          />
        </Shader>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Full Screen Container */}
      <div className="fixed inset-0 z-40">
        <div 
          ref={contentRef}
          className="relative w-full h-full bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-2xl overflow-hidden"
        >
          {/* Navigation Header */}
          <div className="absolute top-0 left-0 right-0 z-50">
            <div className="mx-4 mt-4 md:mx-6 md:mt-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl">
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleClose}
                    className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
                  >
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
                      <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="font-medium text-sm md:text-base hidden sm:inline">Back to Home</span>
                  </button>


                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area with Scroll */}
          <div className="h-full overflow-y-auto overflow-x-hidden pt-20 md:pt-24">
            {/* Hero Section */}
            <div className="relative px-4 md:px-6 lg:px-8 py-8 md:py-12">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-500/10 to-blue-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
      

                {/* Content Section */}
                <div className="max-w-5xl mx-auto px-4">
                  <div className="p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
                    <div className="prose prose-lg prose-invert max-w-none policy-content">
                      {children}
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="mt-6 md:mt-8 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-orange-500/10 backdrop-blur-md">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                      <div className="text-center md:text-left">
                        <p className="text-white/70 text-sm mb-1">
                          Have questions about this policy?
                        </p>
                        <p className="text-white font-medium">
                          Contact us at{' '}
                          <a 
                            href="mailto:info@qwickbit.com" 
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            info@qwickbit.com
                          </a>
                        </p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 duration-300 shadow-lg"
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                </div>

                {/* Spacer for bottom */}
                <div className="h-16 md:h-20" />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 pointer-events-none">
            <div className="w-2 h-2 animate-pulse rounded-full bg-white/60" />
            <span className="text-xs text-white/60 font-mono">Scroll to read</span>
          </div>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.2);
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255,255,255,0.3);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Policy Content Styles */
        .policy-content {
          color: rgba(255, 255, 255, 0.9);
        }
        .policy-content h1,
        .policy-content h2,
        .policy-content h3,
        .policy-content h4,
        .policy-content h5,
        .policy-content h6 {
          color: white;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .policy-content h2 {
          font-size: 1.875rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.5rem;
          margin-top: 3rem;
        }
        .policy-content h3 {
          font-size: 1.5rem;
          margin-top: 2rem;
        }
        .policy-content p {
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .policy-content ul,
        .policy-content ol {
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .policy-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        .policy-content a {
          color: #60a5fa;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .policy-content a:hover {
          color: #93c5fd;
        }
        .policy-content strong {
          color: white;
          font-weight: 600;
        }
        .policy-content code {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: #fbbf24;
        }
        .policy-content blockquote {
          border-left: 4px solid rgba(96, 165, 250, 0.5);
          padding-left: 1.5rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.7);
          margin: 1.5rem 0;
        }
        .policy-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1.5rem 0;
        }
        .policy-content th,
        .policy-content td {
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem;
          text-align: left;
        }
        .policy-content th {
          background: rgba(255, 255, 255, 0.05);
          font-weight: 600;
          color: white;
        }
        .policy-content hr {
          border-color: rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }
      `}</style>
    </div>
  )
}

