import { motion } from 'framer-motion'
import { categories, categoryMeta } from '@/data/achievements'
import { AchievementIcon } from '@/utils/achievementIcons'
import { cn } from '@/utils/cn'

export default function AchievementFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 px-6 max-w-6xl mx-auto mb-10">
      {categories.map((cat) => {
        const isActive = cat === active
        const meta = categoryMeta[cat]
        const color = meta?.color ?? 'var(--color-accent)'
        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            whileTap={{ scale: 0.95 }}
            data-cursor="hover"
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200'
            )}
            style={isActive ? {
              background: `linear-gradient(135deg, ${color}33, ${color}18)`,
              borderColor: `${color}66`,
              color,
              boxShadow: `0 0 16px ${color}33`,
            } : {
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(10px)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-muted)',
            }}
          >
            {meta && <AchievementIcon name={meta.icon} size={15} color={isActive ? color : 'currentColor'} />}
            {cat}
          </motion.button>
        )
      })}
    </div>
  )
}
