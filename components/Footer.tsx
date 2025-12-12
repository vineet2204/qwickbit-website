"use client"

import React from "react"
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiFillSkype,
  AiFillInstagram,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai"
import { FaXTwitter } from "react-icons/fa6"
import { IoLocationOutline } from "react-icons/io5"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-white/20 border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">

        {/* LEFT SECTION — LOGO + LINKS */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-2xl font-semibold text-[#3B41F0]">Qwickbit</span>
          </div>

          <div className="flex gap-6 text-[15px] text-white">
            <a href="/terms" className="hover:text-gray-900">Terms</a>
            <a href="/privacy" className="hover:text-gray-900">Privacy</a>
            <a href="/refund" className="hover:text-gray-900">Refund and cancellation</a>
          </div>
        </div>

        {/* CENTER — CONTACT + SOCIAL ICONS */}
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="flex gap-6 text-2xl">
            <AiOutlinePhone />
            <AiOutlineMail />
            <AiFillSkype />
          </div>

          <div className="flex gap-5 text-2xl">
            <AiFillLinkedin />
            <FaXTwitter />
            <AiFillInstagram />
            <AiFillYoutube />
          </div>
        </div>

        {/* RIGHT — COPYRIGHT + ADDRESS */}
        <div className="flex flex-col items-end text-right text-white text-[15px] leading-relaxed">
          <div>© {year} Qwickbit Technologies Pvt Ltd.</div>

          <div className="flex items-start gap-2">
            <IoLocationOutline className="mt-1 text-[20px]" />
            <p className="max-w-xs">
              #721 A sector 16th A main road Yelahanka  
              New Town, Bangalore 560064
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
