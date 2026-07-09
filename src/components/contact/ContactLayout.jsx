import ScrollReveal from '@/components/animations/ScrollReveal'
import ContactForm from './ContactForm'
import ContactSidebar from './ContactSidebar'

export default function ContactLayout() {
  return (
    <section className="py-8 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — form */}
        <ScrollReveal delay={0.05}>
          <ContactForm />
        </ScrollReveal>

        {/* Right — globe + availability + social */}
        <div className="lg:sticky lg:top-24">
          <ContactSidebar />
        </div>
      </div>
    </section>
  )
}
