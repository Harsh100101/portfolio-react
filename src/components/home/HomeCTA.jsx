import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/animations/ScrollReveal'

export default function HomeCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[var(--color-accent)]/10 blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <motion.div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-[var(--color-accent)]/30 text-[var(--color-accent)] bg-[var(--color-accent)]/10 mb-6"
          >
            Open to work
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Let's build something{' '}
            <span className="text-gradient">great</span> together.
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg mb-10 max-w-xl mx-auto">
            Open to freelance projects, full-time roles, and interesting conversations.
            Based in Gujarat — happy to work with teams across India and internationally.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button as="a" href="/contact" size="xl" variant="primary">
              <span>Start a conversation</span>
              <span>→</span>
            </Button>
            <Button as="a" href="/experience" size="xl" variant="secondary">
              My experience
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
