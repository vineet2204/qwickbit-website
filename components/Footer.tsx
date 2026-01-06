"use client"

import React from "react"
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiFillLinkedin,
} from "react-icons/ai"
import { FaWhatsapp } from "react-icons/fa6"
import { IoLocationOutline } from "react-icons/io5"

export function Footer() {
  const year = new Date().getFullYear()

  return (
   <footer
  className="
    relative
    w-full
    bg-gradient-to-r from-blue-950/30 via-purple-950/30 to-orange-950/30
    backdrop-blur-xl
    border-t border-white/20
    shadow-[0_-8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)]
    py-3
  "
>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8 md:gap-0">

        {/* LEFT */}
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-7 w-7" />
            <span className="text-xl font-semibold text-white">
              Qwickbit
            </span>
          </div>

          <div className="flex flex-nowrap gap-4 text-sm text-white">
            <a href="/terms" className="hover:text-gray-300">Terms</a>
            <a href="/privacy" className="hover:text-gray-300">Privacy</a>
            <a href="/refund" className="hover:text-gray-300">
              Refund & Cancellation
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center gap-3 text-white">

          {/* CONTACT + SOCIAL – SINGLE LINE */}
        <div className="flex flex-nowrap items-center gap-6 text-2xl">
  {/* PHONE */}
  <a
    href="tel:+919591622608"
    aria-label="Call"
    className="group p-2 rounded-full transition-all hover:bg-white"
  >
    <AiOutlinePhone
      className="text-white group-hover:text-[#1877F2] group-hover:scale-110 transition"
    />
  </a>

  {/* EMAIL */}
  <a
    href="mailto:contact@qwickbit.com"
    aria-label="Email"
    className="group p-2 rounded-full transition-all hover:bg-white"
  >
    <AiOutlineMail
      className="text-white group-hover:text-[#EA4335] group-hover:scale-110 transition"
    />
  </a>

  {/* WHATSAPP */}
  <a
    href="https://wa.me/919591622608"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="group p-2 rounded-full transition-all hover:bg-white"
  >
    <FaWhatsapp
      className="text-green-500 group-hover:scale-110 transition"
    />
  </a>

  {/* LINKEDIN */}
  <a
    href="https://in.linkedin.com/company/qwickbit-technologies-pvt.-ltd"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="group p-2 rounded-full transition-all hover:bg-white"
  >
    <AiFillLinkedin
      className="text-[#0A66C2] group-hover:scale-110 transition"
    />
  </a>
</div>


          {/* COMPANY NAME BELOW ICONS */}
          <div className="text-xs text-white/70 whitespace-nowrap">
            © Qwickbit Technologies Pvt Ltd  {year}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2 text-white text-sm">

          {/* TITLE ABOVE ADDRESS */}
          <div className="flex items-center gap-2 font-bold uppercase whitespace-nowrap">
            <img src="/logo.svg" alt="Logo" className="h-4 w-4" />
            <span>Qwickbit Technologies Pvt Ltd</span>
          </div>

          <div className="flex items-start mr-8 gap-2 max-w-xs">
            <IoLocationOutline className="mt-1 text-lg shrink-0" />
            <p className="text-left">
              #721 A Sector 16th A Main Road<br />
              Yelahanka New Town,<br />
              Bangalore 560064
            </p>
          </div>

         
        </div>

      </div>
    </footer>
  )
}
