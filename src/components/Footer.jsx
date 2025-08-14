'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 sm:px-8 lg:px-12 py-10 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div
        className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-transparent group"
        style={{
          background:
            'linear-gradient(120deg, rgba(34,197,94,0.14) 0%, rgba(255,255,255,0.06) 100%)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <span
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl border-2 border-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            boxShadow: '0 0 24px 0 #22c55e88, 0 0 0 4px #22c55e22',
            borderImage: 'linear-gradient(100deg, #22c55e 0%, #fff 100%) 1',
          }}
        />

        <div className="relative z-20 text-center p-6 sm:p-8 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
          <p className="text-gray-300 mb-4">
            &copy; {new Date().getFullYear()} Sudhakar . All rights reserved.
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/Sudhakar-SP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-2xl transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/suthakar-s-34a938330/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-2xl transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
