"use client"

import React from "react"
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiFillInstagram,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai"
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6"
import { IoLocationOutline } from "react-icons/io5"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-white/20 border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-10 md:gap-0 justify-between">

        {/* LEFT */}
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-2xl font-semibold text-white">
              Qwickbit
            </span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white">
            <a href="/terms" className="hover:text-gray-300">Terms</a>
            <a href="/privacy" className="hover:text-gray-300">Privacy</a>
            <a href="/refund" className="hover:text-gray-300">
              Refund & Cancellation
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center gap-5 text-white">

          {/* CONTACT ICONS */}
          <div className="flex gap-6 text-2xl md:text-xl">
            <a href="tel:+919591622608" aria-label="Call">
              <AiOutlinePhone className="hover:scale-110 transition" />
            </a>
            <a href="mailto:contact@qwickbit.com" aria-label="Email">
              <AiOutlineMail className="hover:scale-110 transition" />
            </a>
            <a
              href="https://wa.me/919591622608"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="hover:scale-110 transition" />
            </a>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-5 text-2xl md:text-xl">
            <a
              href="https://in.linkedin.com/company/qwickbit-technologies-pvt.-ltd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillLinkedin />
            </a>
            <a
              href="https://x.com/qwickbit1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillInstagram />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillYoutube />
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-3 text-white text-sm">
          <div>© {year} Qwickbit Technologies Pvt Ltd.</div>

          <div className="flex items-start gap-2 max-w-xs">
            <IoLocationOutline className="mt-1 text-lg shrink-0" />
            <p>
              #721 A Sector 16th A Main Road  
              Yelahanka New Town,  
              Bangalore 560064
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
