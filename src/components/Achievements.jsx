'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaUser, FaCommentDots, FaArrowDown } from 'react-icons/fa'

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, y: -40, scale: 0.96, transition: { duration: 0.5, ease: "easeIn" } },
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false) // Table toggle

  const formRef = useRef(null)

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

  // ArrowDown key toggles table
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setShowDetails((prev) => !prev)
        if (!showDetails) {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showDetails])

  return (
    <motion.section
      id="contact"
      className="relative flex flex-col items-center justify-center min-h-screen px-6 sm:px-8 lg:px-12 py-20 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      >
        <span className="bg-clip-text bg-gradient-to-r from-green-400 to-green-500 mb-6">
          Contact Me
        </span>
      </motion.h2>

      {/* Toggle Button */}
      <button
        onClick={() => {
          setShowDetails((prev) => !prev)
          if (!showDetails) {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
        className="mb-6 flex items-center gap-2 text-green-400 hover:text-green-300 transition"
      >
        <FaArrowDown />
        {showDetails ? 'Hide Contact Details' : 'Show Contact Details'}
      </button>

      {showDetails && (
        <motion.table
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 w-full max-w-lg border border-green-400/40 text-white text-left"
        >
          <tbody>
            <tr className="border-b border-green-400/40">
              <td className="p-3 font-semibold">Email</td>
              <td className="p-3">sudhakars2609@gmail.com</td>
            </tr>
            <tr className="border-b border-green-400/40">
              <td className="p-3 font-semibold">Phone</td>
              <td className="p-3">6383188865</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">Location</td>
              <td className="p-3">Dindigul , Tamilnadu</td>
            </tr>
          </tbody>
        </motion.table>
      )}

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
            background: 'linear-gradient(120deg, rgba(34,197,94,0.14) 0%, rgba(255,255,255,0.06) 100%)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <span
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl border-2 border-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              boxShadow: '0 0 24px 0 #22c55e88, 0 0 0 4px #22c55e22',
              borderImage: 'linear-gradient(100deg, #22c55e 0%, #fff 100%) 1'
            }}
          />

          <div
            ref={formRef}
            className="relative z-20 p-7 flex flex-col items-center text-center bg-gradient-to-t from-black/60 via-black/30 to-transparent"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div className="flex items-center bg-black/30 rounded-lg px-3 py-2 border border-green-400/30">
                  <FaUser className="text-green-400 mr-3" />
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
                <div className="flex items-center bg-black/30 rounded-lg px-3 py-2 border border-green-400/30">
                  <FaEnvelope className="text-green-400 mr-3" />
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
                <div className="flex items-start bg-black/30 rounded-lg px-3 py-2 border border-green-400/30">
                  <FaCommentDots className="text-green-400 mr-3 mt-1" />
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
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg hover:shadow-green-500/30 transition disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg border-2 border-green-400 text-center shadow-lg"
                style={{
                  boxShadow: '0 0 24px 0 #22c55e88, 0 0 0 4px #22c55e22',
                  background: 'linear-gradient(120deg, rgba(34,197,94,0.14) 0%, rgba(255,255,255,0.06) 100%)',
                }}
              >
                <h3 className="text-green-400 font-bold text-lg">✅ Message Sent Successfully!</h3>
                <p className="text-gray-300 mt-2">Your message has been delivered. I’ll respond as soon as possible.</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
