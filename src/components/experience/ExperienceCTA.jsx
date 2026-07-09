import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Button from '@/components/ui/Button'

export default function ExperienceCTA() {
  return (
    <section className="py-24 px-6">
      <ScrollReveal>
        <div
          className="max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border border-[var(--color-border)]"
          style={{
            background: 'linear-gradient(155deg, rgba(110,114,255,0.1), rgba(176,107,255,0.06), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top shine */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent)] mb-4">
              Let's work together
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
              Ready to build<br />
              something <span className="text-gradient">real</span>?
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg mb-10 max-w-md mx-auto">
              I'm actively looking for React Native and frontend roles —
              full-time or freelance, Gujarat-first or remote.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button as="a" href="/contact" size="lg" variant="primary">
                <span>Get in touch</span>
                <span>→</span>
              </Button>
              <Button as="a" href="/projects" size="lg" variant="secondary">
                View my work
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
