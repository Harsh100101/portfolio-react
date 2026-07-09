import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Badge from '@/components/ui/Badge'
import ScrollReveal from '@/components/animations/ScrollReveal'

export default function ContactHero() {
  return (
    <section className="pt-32 pb-12 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <SectionLabel className="mb-4">Get in touch</SectionLabel>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-5">
          Let's build<br />
          something <span className="text-gradient">great.</span>
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="text-[var(--color-text-muted)] text-lg max-w-xl leading-relaxed mb-6">
          Open to freelance projects, full-time roles, and interesting conversations.
          Based in Gujarat — happy to work with teams across India and internationally.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent" dot>Available now</Badge>
          <Badge variant="gradient">Immediate joinee</Badge>
          <Badge variant="green">Reply within 24h</Badge>
        </div>
      </ScrollReveal>
    </section>
  )
}
