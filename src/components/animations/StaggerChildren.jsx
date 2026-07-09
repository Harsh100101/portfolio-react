import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/utils/cn'

const containerVariants = {
  hidden: {},
  visible: (stagger) => ({
    transition: { staggerChildren: stagger },
  }),
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

/**
 * StaggerChildren — wraps a parent + its direct children so each child
 * fades/slides up with a cascade delay.
 *
 * Usage:
 *   <StaggerChildren stagger={0.1}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </StaggerChildren>
 */
export function StaggerChildren({
  children,
  stagger = 0.08,
  className = '',
  as = 'div',
  threshold = 0.1,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </Tag>
  )
}

/**
 * StaggerItem — each direct child inside StaggerChildren should be wrapped with this.
 */
export function StaggerItem({ children, className = '', as = 'div' }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag className={cn(className)} variants={itemVariants}>
      {children}
    </Tag>
  )
}
