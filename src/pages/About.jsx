import AboutHero from '@/components/about/AboutHero'
import PhilosophySection from '@/components/about/PhilosophySection'
import JourneyTimeline from '@/components/about/JourneyTimeline'
import SkillsGalaxy from '@/components/about/SkillsGalaxy'
import ExperienceCards from '@/components/about/ExperienceCards'
import TechStackSection from '@/components/about/TechStackSection'
import EducationSection from '@/components/about/EducationSection'

export default function About() {
  return (
    <main>
      <AboutHero />
      <PhilosophySection />
      <JourneyTimeline />
      <SkillsGalaxy />
      <ExperienceCards />
      <TechStackSection />
      <EducationSection />
    </main>
  )
}
