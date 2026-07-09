import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { achievements } from '@/data/achievements'
import AchievementFilter from './CategoryFilter'
import AchievementCard from './AchievementCard'

export default function AchievementsGrid() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? achievements
    : achievements.filter((a) => a.category === active)

  return (
    <section className="pb-16">
      <AchievementFilter active={active} onChange={setActive} />
      <div className="px-6 max-w-6xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <AchievementCard
                key={item.id}
                item={item}
                index={i}
                featured={item.featured}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-[var(--color-text-muted)]"
          >
            No achievements in this category yet.
          </motion.div>
        )}
      </div>
    </section>
  )
}
