import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useLenis } from '@/hooks/useLenis'
import AuroraBackground from '@/components/animations/AuroraBackground'
import CursorGlow from '@/components/animations/CursorGlow'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import PageTransition from '@/components/animations/PageTransition'
import ScrollToTop from '@/components/common/ScrollToTop'

import { lazy, Suspense } from 'react'

// Pages — lazy loaded for code splitting
const Home         = lazy(() => import('@/pages/Home'))
const About        = lazy(() => import('@/pages/About'))
const Projects     = lazy(() => import('@/pages/Projects'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const Experience   = lazy(() => import('@/pages/Experience'))
const Achievements = lazy(() => import('@/pages/Achievements'))
const Contact      = lazy(() => import('@/pages/Contact'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
    </div>
  )
}

function AppInner() {
  useLenis()

  return (
    <div className="relative min-h-screen">
      {/* Scroll reset on route change */}
      <ScrollToTop />

      {/* Layer 0: Aurora canvas background */}
      <AuroraBackground />

      {/* Layer 1: Custom cursor */}
      <CursorGlow />

      {/* Layer 2: Fixed nav */}
      <Navbar />

      {/* Layer 3: Page content with transitions */}
      <Suspense fallback={<PageLoader />}>
        <PageTransition>
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/about"         element={<About />} />
            <Route path="/projects"      element={<Projects />} />
            <Route path="/projects/:id"  element={<ProjectDetailPage />} />
            <Route path="/experience"    element={<Experience />} />
            <Route path="/achievements"  element={<Achievements />} />
            <Route path="/contact"       element={<Contact />} />
          </Routes>
        </PageTransition>
      </Suspense>

      {/* Shared footer */}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
