"use client"

import React, { useState, useRef, useEffect } from 'react'
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
      {/* Black Background */}
      <div className="fixed inset-0 bg-black" />

      {/* Full Screen Container */}
      <div className="fixed inset-0 z-40">
        <div 
          ref={contentRef}
          className="relative w-full h-full bg-black overflow-hidden"
        >
          {/* Navigation Header */}
          <div className="absolute top-0 left-0 right-0 z-50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl md:text-2xl font-bold text-white">{title}</h1>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area with Scroll */}
          <div className="h-full overflow-y-auto overflow-x-hidden pt-20 md:pt-24">
            {/* Content Section */}
            <div className="relative px-4 md:px-6 lg:px-8 py-8 md:py-12">
              <div className="max-w-7xl mx-auto">
                <div className="w-full">
                  <div className="policy-content">
                    {children}
                  </div>

                  {/* Footer Info */}
                  <div className="mt-6 md:mt-8 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                      <div className="text-center md:text-left">
                        <p className="text-gray-400 text-sm mb-1">
                          Have questions about this policy?
                        </p>
                        <p className="text-white font-medium">
                          Contact us at{' '}
                          <a 
                            href="mailto:contact@qwickbit.com" 
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            contact@qwickbit.com
                          </a>
                        </p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all"
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

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
            <div 
              className="h-full bg-white transition-all duration-150"
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