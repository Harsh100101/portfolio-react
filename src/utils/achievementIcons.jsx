import { Cup, DocumentText, Code, Flash, Medal, Teacher } from 'iconsax-react'

/**
 * ACHIEVEMENT_ICONS — maps the semantic icon keys used in
 * /src/data/achievements.js to real Iconsax React components.
 *
 * Keeping the data file as plain strings (not JSX) means it stays
 * framework-agnostic and easy to edit; this map is the only place
 * that needs to know about the icon library in use.
 */
export const ACHIEVEMENT_ICONS = {
  trophy:   Cup,
  document: DocumentText,
  code:     Code,
  bolt:     Flash,
  medal:    Medal,
  cap:      Teacher,
}

export function AchievementIcon({ name, size = 22, color, variant = 'Bold' }) {
  const IconComponent = ACHIEVEMENT_ICONS[name] ?? Cup
  return <IconComponent size={size} color={color} variant={variant} />
}
