import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import { SiReact, SiExpo, SiRedux, SiTypescript, SiNodedotjs, SiPython } from 'react-icons/si'
import { createDraggable, createSpring } from 'animejs'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import MagneticButton from '@/components/animations/MagneticButton'
import ScrollReveal from '@/components/animations/ScrollReveal'
import AnimatedUnderline from '@/components/animations/AnimatedUnderline'
import { cn } from '@/utils/cn'

// ── Typewriter hook ──────────────────────────────────────────────────────────
const PHRASES = [
  'React Native Developer',
  'React.js Developer',
  'Frontend Engineer',
  'Mobile App Builder',
]

function useTypewriter(phrases, typingSpeed = 75, deletingSpeed = 45, pauseMs = 1800) {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIdx]
    let timeout

    if (!deleting && charIdx === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx((i) => (i + 1) % phrases.length)
      timeout = setTimeout(() => {}, 400)
    } else {
      const delta = deleting ? deletingSpeed : typingSpeed
      timeout = setTimeout(() => {
        setCharIdx((c) => c + (deleting ? -1 : 1))
        setText(phrase.slice(0, charIdx + (deleting ? -1 : 1)))
      }, delta)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs])

  return text
}

// ── Tech Orbit ───────────────────────────────────────────────────────────────
const ORBIT_ICONS = [
  { Icon: SiReact,      color: '#61DBFB', label: 'React' },
  { Icon: SiExpo,       color: '#ffffff', label: 'Expo' },
  { Icon: SiRedux,      color: '#764ABC', label: 'Redux' },
  { Icon: SiTypescript, color: '#3178C6', label: 'TypeScript' },
  { Icon: SiNodedotjs,  color: '#539E43', label: 'Node.js' },
  { Icon: SiPython,     color: '#F7CA3E', label: 'Python' },
]

function OrbitIcon({ Icon, color, label, x, y, delay }) {
  const dragRef = useRef(null)

  useEffect(() => {
    if (!dragRef.current) return

    // Real spring-physics draggable — grab an icon, fling it, watch it
    // snap back to its orbit position with a bouncy spring release.
    const draggable = createDraggable(dragRef.current, {
      container: [-60, 60, -60, 60], // constrain drag range in px from origin
      releaseEase: createSpring({ stiffness: 200, damping: 12, mass: 1 }),
      onGrab: () => {
        dragRef.current.style.zIndex = 20
      },
      onRelease: () => {
        setTimeout(() => {
          if (dragRef.current) dragRef.current.style.zIndex = ''
        }, 400)
      },
    })

    return () => draggable.revert?.()
  }, [])

  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 24, repeat: Infinity, ease: 'linear', delay }}
    >
      <div
        ref={dragRef}
        className="glass rounded-xl w-10 h-10 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-125 transition-transform duration-200"
        title={label}
        data-cursor="hover"
      >
        <Icon size={18} style={{ color }} />
      </div>
    </motion.div>
  )
}

function TechOrbit() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-[var(--color-border)] animate-[spin_24s_linear_infinite]" />
      <div className="absolute inset-6 rounded-full border border-[var(--color-border)]/60 animate-[spin_18s_linear_infinite_reverse]" />

      {/* Center logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="glass-strong rounded-3xl w-20 h-20 flex items-center justify-center shadow-[0_0_40px_rgba(110,114,255,0.25)]">
          <span className="text-2xl font-bold text-gradient">HS</span>
        </div>
      </div>

      {/* Orbiting icons — draggable with spring release physics */}
      {ORBIT_ICONS.map(({ Icon, color, label }, i) => {
        const angle = (i / ORBIT_ICONS.length) * 360
        const rad = (angle * Math.PI) / 180
        const r = 110
        const x = 50 + (r / 160) * 50 * Math.cos(rad)
        const y = 50 + (r / 160) * 50 * Math.sin(rad)

        return (
          <OrbitIcon
            key={label}
            Icon={Icon}
            color={color}
            label={label}
            x={x}
            y={y}
            delay={i * -4}
          />
        )
      })}
    </div>
  )
}

// ── Social Sidebar ───────────────────────────────────────────────────────────
const SOCIAL = [
  { Icon: FiGithub,   href: 'https://github.com/Harsh100101',               label: 'GitHub' },
  { Icon: FiLinkedin, href: 'https://linkedin.com/in/harsh-sorathiya',       label: 'LinkedIn' },
  { Icon: FiMail,     href: 'mailto:harshsorathiya01@gmail.com',             label: 'Email' },
]

function SocialSidebar() {
  return (
    <motion.div
      className="fixed left-6 bottom-0 z-20 hidden xl:flex flex-col items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {SOCIAL.map(({ Icon, href, label }) => (
        <MagneticButton key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            data-cursor="hover"
            className="text-[var(--color-text-faint)] hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            <Icon size={18} />
          </a>
        </MagneticButton>
      ))}
      {/* vertical line */}
      <span className="w-px h-20 bg-gradient-to-b from-[var(--color-border-hover)] to-transparent" />
    </motion.div>
  )
}

// ── Scroll Indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <span className="text-xs tracking-widest uppercase text-[var(--color-text-faint)]">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="text-[var(--color-text-faint)]"
      >
        <FiArrowDown size={16} />
      </motion.div>
    </motion.div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const typed = useTypewriter(PHRASES)

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <SocialSidebar />

      <div className="w-full max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="accent" dot className="mb-6">
              Available for work
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight mb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Building apps<br />
            people{' '}
            <span className="relative inline-block">
              <span className="text-gradient">love</span>
              <AnimatedUnderline color="#a78bfa" delay={900} duration={650} />
            </span>
            <br />
            to use.
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            className="flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-lg text-[var(--color-accent)] font-mono font-medium">
              {typed}
            </span>
            <span className="w-0.5 h-5 bg-[var(--color-accent)] animate-pulse" />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-[var(--color-text-muted)] text-base leading-relaxed max-w-md mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            React Native & React.js developer from Gujarat, India. Final year B.Tech CSE (AI)
            student at Parul University. I build fast, polished mobile and web products
            with a focus on health-tech.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button as="a" href="/projects" size="lg" variant="primary">
              <span>View my work</span>
              <span>→</span>
            </Button>
            <Button as="a" href="/contact" size="lg" variant="secondary">
              Get in touch
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-6 pt-6 border-t border-[var(--color-border)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              { num: '22+', label: 'GitHub repos' },
              { num: '5+',  label: 'Projects shipped' },
              { num: '1',   label: 'IJSET paper' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-[var(--color-text)]">{num}</div>
                <div className="text-xs text-[var(--color-text-faint)] mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Tech Orbit */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <TechOrbit />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
