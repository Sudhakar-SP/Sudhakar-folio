'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaUser, FaCommentDots } from 'react-icons/fa'

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, y: -40, scale: 0.96, transition: { duration: 0.5, ease: "easeIn" } },
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert(`❌ Failed to send: ${data.error || 'Try again later.'}`)
      }
    } catch (error) {
      console.error(error)
      alert('❌ Network error. Please check your connection.')
    }

    setLoading(false)
  }

  return (
    <motion.section
      id="contact"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 sm:px-8 lg:px-12 py-20 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      >
        <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">Contact Me</span>
      </motion.h2>

      <motion.div
        className="relative w-full max-w-xl mx-auto"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div
          className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-transparent group mx-auto"
          style={{
            background: 'linear-gradient(120deg, rgba(6,182,212,0.14) 0%, rgba(255,255,255,0.06) 100%)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <span
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              boxShadow: '0 0 24px 0 #22d3ee88, 0 0 0 4px #22d3ee22',
              borderImage: 'linear-gradient(100deg, #06b6d4 0%, #fff 100%) 1'
            }}
          />

          <div className="relative z-20 p-7 flex flex-col items-center text-center bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div className="flex items-center bg-black/30 rounded-lg px-3 py-2 border border-cyan-400/30">
                  <FaUser className="text-cyan-400 mr-3" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-transparent outline-none text-white w-full"
                    required
                  />
                </div>
                <div className="flex items-center bg-black/30 rounded-lg px-3 py-2 border border-cyan-400/30">
                  <FaEnvelope className="text-cyan-400 mr-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent outline-none text-white w-full"
                    required
                  />
                </div>
                <div className="flex items-start bg-black/30 rounded-lg px-3 py-2 border border-cyan-400/30">
                  <FaCommentDots className="text-cyan-400 mr-3 mt-1" />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="bg-transparent outline-none text-white w-full resize-none"
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg border-2 border-cyan-400 text-center shadow-lg"
                style={{
                  boxShadow: '0 0 24px 0 #22d3ee88, 0 0 0 4px #22d3ee22',
                  background: 'linear-gradient(120deg, rgba(6,182,212,0.14) 0%, rgba(255,255,255,0.06) 100%)',
                }}
              >
                <h3 className="text-cyan-400 font-bold text-lg">✅ Message Sent Successfully!</h3>
                <p className="text-gray-300 mt-2">Your message has been delivered. I’ll respond as soon as possible.</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
