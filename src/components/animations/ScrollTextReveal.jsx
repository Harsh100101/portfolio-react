import { useEffect, useRef, useMemo } from 'react'
import { animate, stagger, onScroll } from 'animejs'

/**
 * ScrollTextReveal — splits text into words and "lights up" each word
 * (dim → full opacity + color) as the user scrolls the block through
 * the viewport, using Anime.js's real onScroll() ScrollObserver with
 * `sync: true` so progress is tied directly to scroll position rather
 * than a one-shot IntersectionObserver trigger.
 *
 * This is the Linear/Stripe/Apple "words light up as you scroll past"
 * effect — different from ScrollReveal (which plays once on enter).
 *
 * @param {string} text        - the sentence/paragraph to animate
 * @param {string} className   - classes on the wrapper
 * @param {string} dimColor    - color for not-yet-revealed words
 * @param {string} litColor    - color for revealed words
 * @param {string} as          - wrapper tag, default 'p'
 */
export default function ScrollTextReveal({
  text,
  className = '',
  dimColor = 'var(--color-text-faint)',
  litColor = 'var(--color-text)',
  as: Tag = 'p',
}) {
  const containerRef = useRef(null)
  const words = useMemo(() => text.split(' '), [text])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const wordEls = container.querySelectorAll('[data-word]')

    const animation = animate(wordEls, {
      opacity: [0.25, 1],
      color: [dimColor, litColor],
      filter: ['blur(3px)', 'blur(0px)'],
      delay: stagger(1, { start: 0 }),
      ease: 'linear',
      autoplay: false,
    })

    const observer = onScroll({
      target: container,
      enter: 'bottom-=10% top',
      leave: 'top+=10% bottom',
      sync: 0.6,
      onUpdate: (self) => {
        animation.seek(self.progress * animation.duration)
      },
    })

    return () => {
      observer.revert?.()
      animation.revert?.()
    }
  }, [dimColor, litColor, words])

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} data-word className="inline-block will-change-[opacity,filter,color]">
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
