# Harsh Sorathiya — Portfolio

React 19 + Vite + Tailwind CSS v4 + Framer Motion + GSAP + React Router + Lenis.
SaaS/Apple/Vercel/Framer-inspired dark glassmorphism design.

## Setup

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → /dist
npm run preview  # preview the production build locally
```

## Structure

```
src/
├── assets/                  static images
├── components/
│   ├── ui/                  Button, GlassCard, Badge, SectionLabel
│   ├── animations/          AuroraBackground, CursorGlow, MagneticButton,
│   │                        TiltCard, ScrollReveal, StaggerChildren, PageTransition
│   ├── common/               Navbar, Footer, ScrollToTop
│   ├── home/                 Hero, FeaturedProjects, HomeCTA
│   ├── about/                AboutHero, JourneyTimeline, SkillsGalaxy,
│   │                        ExperienceCards, TechStackSection, EducationSection
│   ├── projects/             ProjectsHero, CategoryFilter, MasonryGrid,
│   │                        ProjectCard, ProjectDetail
│   ├── experience/           ExperienceHero, AppleTimeline, InternshipSection,
│   │                        CertificationsSection, ExperienceCTA
│   ├── achievements/         AchievementsHero, CategoryShowcase, CategoryFilter,
│   │                        AchievementsGrid, AchievementCard, AchievementsCTA
│   └── contact/              ContactHero, ContactLayout, ContactForm,
│                            ContactSidebar, AnimatedGlobe, FAQSection
├── pages/                    Home.jsx, About.jsx, Projects.jsx, ProjectDetailPage.jsx,
│                            Experience.jsx, Achievements.jsx, Contact.jsx
├── hooks/                    useLenis.js (smooth scroll)
├── utils/                    cn.js (classnames helper)
├── data/                     about.js, projects.js, experience.js,
│                            achievements.js, contact.js — ALL content lives here
├── App.jsx                   router + layout composition
└── main.jsx                  entry point
```

## Editing content

Every page's text, projects, skills, achievements, and social links live in
`/src/data/*.js` — edit those files to update content without touching any
component code.

## Design tokens

All colors, blur values, and easing curves are defined as CSS variables in
`/src/index.css` under `@theme` (Tailwind v4's CSS-first config). Change the
`--color-accent`, `--color-accent-2`, etc. there to re-theme the whole site.

## Deploying

Zero-config on Vercel or Netlify:

```bash
npx vercel
# or drag the /dist folder (after npm run build) into netlify.com/drop
```
