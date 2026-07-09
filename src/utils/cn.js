import { clsx } from 'clsx'

/**
 * Tiny className combiner. We don't need tailwind-merge's conflict
 * resolution for this project's scale — clsx alone keeps the bundle lean.
 */
export function cn(...inputs) {
  return clsx(...inputs)
}
