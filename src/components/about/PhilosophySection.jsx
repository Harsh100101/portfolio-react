import ScrollTextReveal from '@/components/animations/ScrollTextReveal'

/**
 * PhilosophySection — a single punchy statement that lights up word-by-word
 * as the visitor scrolls through it. Sits between the bio and the timeline
 * on the About page as a breathing moment before the detailed sections.
 */
export default function PhilosophySection() {
  return (
    <section className="py-32 px-6 max-w-4xl mx-auto text-center">
      <ScrollTextReveal
        text="I care less about writing clever code and more about building things that people actually open twice. Fast, honest interfaces, shipped with the same care whether five people use them or five thousand."
        className="text-2xl md:text-4xl font-semibold leading-snug tracking-tight"
        as="p"
      />
    </section>
  )
}
