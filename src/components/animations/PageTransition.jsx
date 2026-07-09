import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const variants = {
  initial:  { opacity: 0, y: 18 },
  enter:    { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -12 },
}

/**
 * PageTransition — wrap the <Routes> with this to get smooth route transitions.
 * Uses AnimatePresence so exit animations play before the next page mounts.
 */
export default function PageTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
