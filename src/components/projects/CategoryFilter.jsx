import { motion } from 'framer-motion'
import { categories } from '@/data/projects'
import { cn } from '@/utils/cn'

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 px-6 max-w-6xl mx-auto mb-10">
      {categories.map((cat) => {
        const isActive = cat === active
        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            whileTap={{ scale: 0.95 }}
            data-cursor="hover"
            className={cn(
              'relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 border',
              isActive
                ? 'text-white border-transparent'
                : 'text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]',
            )}
            style={isActive ? {
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))',
              boxShadow: '0 0 20px rgba(110,114,255,0.35)',
            } : {
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {cat}
            {isActive && (
              <motion.span
                layoutId="filter-bg"
                className="absolute inset-0 rounded-xl -z-10"
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
