import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiGithub } from 'react-icons/fi'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/animations/MagneticButton'

const QUICK_LINKS = [
  { label: 'View Projects',    to: '/projects',    desc: 'See the code behind the achievements' },
  { label: 'My Experience',    to: '/experience',  desc: 'Internship, timeline, certifications' },
  { label: 'Get In Touch',     to: '/contact',     desc: 'Available for work right now' },
]

export default function AchievementsCTA() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">

      {/* Quick nav cards */}
      <ScrollReveal className="mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {QUICK_LINKS.map(({ label, to, desc }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={to}
                data-cursor="hover"
                className="flex flex-col justify-between p-5 h-full rounded-2xl border border-[var(--color-border)] group transition-all duration-300 hover:border-[var(--color-border-hover)]"
                style={{
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <div>
                  <h3 className="text-base font-bold text-[var(--color-text)] mb-1">{label}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{desc}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-4 text-sm font-medium text-[var(--color-accent)]">
                  Go
                  <FiArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* Main CTA banner */}
      <ScrollReveal>
        <div
          className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden border border-[var(--color-border)]"
          style={{
            background: 'linear-gradient(155deg, rgba(110,114,255,0.1), rgba(176,107,255,0.06), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top shine */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          {/* Central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent)] mb-4">
              Open to opportunities
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              These are the milestones.<br />
              Let's build the <span className="text-gradient">next one</span> together.
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg mb-10 max-w-md mx-auto">
              Available for React Native and frontend roles — full-time or freelance.
              Gujarat-first, remote-friendly.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button as="a" href="/contact" size="lg" variant="primary">
                <span>Start a conversation</span>
                <span>→</span>
              </Button>

              <MagneticButton>
                <a
                  href="https://github.com/Harsh100101"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-all backdrop-blur-sm"
                >
                  <FiGithub size={16} />
                  GitHub Profile
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
