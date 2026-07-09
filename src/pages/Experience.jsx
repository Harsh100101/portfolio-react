import ExperienceHero from '@/components/experience/ExperienceHero'
import AppleTimeline from '@/components/experience/AppleTimeline'
import InternshipSection from '@/components/experience/InternshipSection'
import CertificationsSection from '@/components/experience/CertificationsSection'
import ExperienceCTA from '@/components/experience/ExperienceCTA'

export default function Experience() {
  return (
    <main>
      <ExperienceHero />
      <AppleTimeline />
      <InternshipSection />
      <CertificationsSection />
      <ExperienceCTA />
    </main>
  )
}
