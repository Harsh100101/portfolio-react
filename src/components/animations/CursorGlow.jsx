import { useEffect, useRef } from 'react'

/**
 * CursorGlow — a soft, lagging radial-glow dot that follows the pointer.
 * Pairs with the `data-cursor="hover"` attribute (set on interactive
 * elements like buttons/links) to grow + brighten on hover.
 *
 * Disabled automatically on touch-only devices via CSS in index.css
 * (`cursor: auto` under `@media (hover: none)`), and this component
 * also short-circuits on mount if no fine pointer is detected, so it
 * never adds a phantom dot on mobile.
 */
export default function CursorGlow() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const raf = useRef(null)

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!hasFinePointer) return

    const dot = dotRef.current
    const ring = ringRef.current
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
    }

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor="hover"]')
      if (target) {
        ring.dataset.state = 'hover'
      } else {
        ring.dataset.state = 'default'
      }
    }

    function loop() {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    loop()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-accent)] mix-blend-screen will-change-transform"
      />
      <div
        ref={ringRef}
        data-state="default"
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/30 will-change-transform transition-[width,height,border-color] duration-300
          data-[state=hover]:w-14 data-[state=hover]:h-14 data-[state=hover]:border-[var(--color-accent-2)]/70"
      />
    </div>
  )
}
