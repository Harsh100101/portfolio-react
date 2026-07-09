import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats } from '@/data/achievements'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'

function CountUp({ target, suffix = '', duration = 1400 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const num = parseInt(target, 10)
    const step = Math.ceil(num / (duration / 16))
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, num)
      setCount(current)
      if (current >= num) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function AchievementsHero() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <ScrollReveal className="mb-16">
        <SectionLabel className="mb-4">Recognition & milestones</SectionLabel>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-5">
          Achievements<span className="text-gradient">.</span>
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg max-w-xl leading-relaxed">
          From published research to production code, hackathon leadership to
          university sport — every milestone that shaped me as a developer.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-center p-6 rounded-2xl border border-[var(--color-border)] overflow-hidden group"
            style={{ background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', backdropFilter: 'blur(16px)' }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative text-4xl font-bold text-gradient mb-1">
              <CountUp target={s.value} suffix={s.suffix} duration={1200 + i * 150} />
            </div>
            <div className="relative text-sm text-[var(--color-text-muted)]">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
