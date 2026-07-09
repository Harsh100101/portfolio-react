import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'

export default function ProjectsHero() {
  return (
    <section className="pt-32 pb-12 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <SectionLabel className="mb-4">Selected work</SectionLabel>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-5">
          Projects<span className="text-gradient">.</span>
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="text-[var(--color-text-muted)] text-lg max-w-xl leading-relaxed">
          Real products built with real technology — from AI recommendation engines
          to healthcare portals to mobile marketplaces. Click any card for the full story.
        </p>
      </ScrollReveal>
    </section>
  )
}
