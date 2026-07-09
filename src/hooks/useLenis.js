import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

/**
 * useLenis — initialises Lenis smooth scroll once and attaches it to
 * Framer Motion's animation frame for perfectly synced scrolling.
 * Call this once at the app root level.
 */
export function useLenis() {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    })

    function raf(time) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy()
      lenisInstance = null
    }
  }, [])
}

/** Get the lenis instance from anywhere (for programmatic scroll) */
export function getLenis() {
  return lenisInstance
}
