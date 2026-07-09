import AchievementsHero from '@/components/achievements/AchievementsHero'
import CategoryShowcase from '@/components/achievements/CategoryShowcase'
import AchievementsGrid from '@/components/achievements/AchievementsGrid'
import AchievementsCTA from '@/components/achievements/AchievementsCTA'

export default function Achievements() {
  return (
    <main>
      <AchievementsHero />
      <CategoryShowcase />
      <AchievementsGrid />
      <AchievementsCTA />
    </main>
  )
}
