import React from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-20 w-full border-t border-white/10 bg-white/30 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-12">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand/Logo */}
          <button
        //   onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:scale-110">
            <img src="/logo.svg" alt="Logo" />
          </div>
          <span className="text-2xl uppercase leading-tight text-start font-montserrat">
            <span className="block font-extrabold tracking-wide text-[#4f47e5]">
              QWICKBIT
            </span>
          </span>
        </button>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="/terms"
              className="font-mono text-sm text-white/70 transition-colors hover:text-white"
            >
              Terms & Conditions
            </a>
            <span className="text-white/30">•</span>
            <a
              href="/privacy"
              className="font-mono text-sm text-white/70 transition-colors hover:text-white"
            >
              Privacy Policy
            </a>
            <span className="text-white/30">•</span>
            <a
              href="/contact"
              className="font-mono text-sm text-white/70 transition-colors hover:text-white"
            >
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <div className="font-mono text-sm text-white/60">
            © {currentYear} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}