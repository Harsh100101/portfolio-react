import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Badge from '@/components/ui/Badge'

export default function ExperienceHero() {
  return (
    <section className="pt-32 pb-12 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <SectionLabel className="mb-4">Background</SectionLabel>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-5">
          Experience<span className="text-gradient">.</span>
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="text-[var(--color-text-muted)] text-lg max-w-xl leading-relaxed mb-6">
          From classroom to production code — the work, research, and milestones
          that define my path as a developer.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent" dot>Available for work</Badge>
          <Badge variant="gradient">4 mo production internship</Badge>
          <Badge variant="accent2">Published researcher</Badge>
        </div>
      </ScrollReveal>
    </section>
  )
}
