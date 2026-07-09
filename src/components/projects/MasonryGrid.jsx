import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '@/data/projects'
import CategoryFilter from './CategoryFilter'
import ProjectCard from './ProjectCard'

export default function MasonryGrid() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section className="pb-24">
      <CategoryFilter active={activeFilter} onChange={setActiveFilter} />

      <div className="px-6 max-w-6xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-[var(--color-text-muted)]"
          >
            No projects found in this category yet.
          </motion.div>
        )}
      </div>
    </section>
  )
}
