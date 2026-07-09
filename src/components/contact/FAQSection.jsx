import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Add } from 'iconsax-react'
import { faqs } from '@/data/contact'
import SectionLabel from '@/components/ui/SectionLabel'
import ScrollReveal from '@/components/animations/ScrollReveal'

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="border border-[var(--color-border)] rounded-2xl overflow-hidden"
      style={{
        background: open
          ? 'linear-gradient(155deg, rgba(110,114,255,0.07), rgba(255,255,255,0.02))'
          : 'linear-gradient(155deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        backdropFilter: 'blur(14px)',
        borderColor: open ? 'rgba(110,114,255,0.3)' : 'var(--color-border)',
        transition: 'border-color 0.3s, background 0.3s',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        data-cursor="hover"
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-semibold text-[var(--color-text)] leading-snug">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-7 h-7 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)]"
        >
          <Add size={16} variant="Linear" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)] pt-4">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal className="mb-12">
        <SectionLabel className="mb-4">Common questions</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="text-gradient">FAQ</span>
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-md">
          Answers to the questions I get asked most before starting a conversation.
        </p>
      </ScrollReveal>

      <div className="max-w-2xl space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>
    </section>
  )
}
