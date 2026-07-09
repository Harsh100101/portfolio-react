import { cn } from '@/utils/cn'

/**
 * SectionLabel — the small ALL-CAPS eyebrow line above h2 headings.
 * Matches the Vercel / Linear section heading pattern.
 */
export default function SectionLabel({ children, className = '' }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2',
        'text-xs font-semibold tracking-widest uppercase',
        'text-[var(--color-accent)]',
        className,
      )}
    >
      <span className="w-5 h-px bg-[var(--color-accent)]" />
      {children}
    </div>
  )
}
