'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaReact, FaNodeJs, FaGithub, FaExternalLinkAlt, FaHtml5, FaCss3 } from 'react-icons/fa'
import { SiMongodb, SiTailwindcss, SiJavascript, SiPython, SiFlask, SiTensorflow } from 'react-icons/si'
import { BsArrowUpRight } from 'react-icons/bs'

// --- Tech icons map ---
const technologies = {
  'ReactJs': { icon: <FaReact className="text-[#61DAFB]" />, name: 'React' },
  'NodeJS': { icon: <FaNodeJs className="text-[#339933]" />, name: 'Node.js' },
  'MongoDB': { icon: <SiMongodb className="text-[#47A248]" />, name: 'MongoDB' },
  'Deep Learning': { icon: <SiTensorflow className="text-[#FF6F00]" />, name: 'Deep Learning' },
  'Flask': { icon: <SiFlask className="text-[#000000]" />, name: 'Flask' },
  'Python': { icon: <SiPython className="text-[#3776AB]" />, name: 'Python' },
  'Tailwind': { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: 'Tailwind' },
  'ML': { icon: <SiTensorflow className="text-[#FF6F00]" />, name: 'Machine Learning' },
  'HTML': { icon: <FaHtml5 className="text-[#E34F26]" />, name: 'HTML' },
  'CSS': { icon: <FaCss3 className="text-[#1572B6]" />, name: 'CSS' },
  'JavaScript': { icon: <SiJavascript className="text-[#F7DF1E]" />, name: 'JavaScript' },
}

// --- Projects array ---
const projects = [
  {
    title: 'GRAND CHICKEN',
    description: 'Designed and developed a responsive, user-friendly website with smooth navigation and engaging visuals to enhance customer experience.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: '/pro1.PNG',
    live: 'https://skwebdesign.netlify.app',
    github: 'https://github.com/Sudhakar-SP/GRAND-CHICKEN',
  },
  {
    title: 'X_CLONE',
    description: 'Built a full-stack Twitter clone with tweets, likes, comments, real-time chat, JWT authentication, media uploads, and a responsive React UI.',
    technologies: ['ReactJs', 'JavaScript', 'MongoDB'],
    image: '/pro3.PNG',
    github: 'https://github.com/Sudhakar-SP/X-CLONE',
  },
  {
    title: 'VFAC.COM',
    description: 'Developed a MERN stack app for managing events, music classes, and memberships with role-based access, attendance tracking, OTP admin reset, and responsive React UI.',
    technologies: ['ReactJs', 'Tailwind', 'MongoDB'],
    image: '/pro4.PNG',
    github: 'https://github.com/Sudhakar-SP/VFAC/tree/S1',
  },
  {
    title: 'SHOPPER',
    description: 'Real-time weather application with location-based forecasts and interactive UI.',
    technologies: ['Tailwind', 'JavaScript', 'ReactJs'],
    image: '/pro2.PNG',
    github: 'https://github.com/Sudhakar-SP/SHOPPER'
  }
]

// --- Animation duration (seconds) ---
const DURATION = 22

export default function Projects() {
  const allProjects = [...projects, ...projects]

  return (
    <motion.section
      id="projects"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-16 bg-gradient-to-br from-black via-gray-900 to-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-8">
        My <span className="text-white">Projects</span>
      </h2>

      {/* Infinite auto-scrolling carousel */}
      <div className="relative w-full max-w-6xl overflow-hidden py-8">
        <motion.div
          className="flex gap-8"
          style={{ width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: DURATION,
          }}
        >
          {allProjects.map((project, idx) => (
            <div
              key={project.title + idx}
              className="relative w-[280px] flex-shrink-0 bg-[#000000]/90 border-2 border-green-500/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(34,197,94,0.15)] backdrop-blur-sm group transition-all duration-300 hover:scale-105 hover:border-green-400"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  {project.title}
                  <motion.span
                    className="text-green-400"
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <BsArrowUpRight className="inline-block text-sm" />
                  </motion.span>
                </h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-1 bg-green-950/30 px-2 py-0.5 rounded-full border border-green-500/20"
                    >
                      <span className="text-base">
                        {technologies[tech].icon}
                      </span>
                      <span className="text-xs text-gray-300">
                        {technologies[tech].name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      Live
                    </motion.a>
                  )}
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/10 transition-colors duration-300"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="text-sm" />
                    Code
                  </motion.a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Overlay gradients */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-transparent to-transparent z-10" />
      </div>

      {/* Navigation hint */}
      <div className="mt-6 flex gap-2 items-center text-green-400/60 text-sm font-medium">
        <motion.span 
          animate={{ x: [-5, 0, -5] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
        >←</motion.span>
        Auto-scrolling carousel
        <motion.span 
          animate={{ x: [0, 5, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
        >→</motion.span>
      </div>
    </motion.section>
  )
}
