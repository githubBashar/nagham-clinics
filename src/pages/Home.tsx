import { Fragment } from 'react'
import { LanguageProvider, useLanguage } from '@/lib/i18n'
import { BookingProvider } from '@/lib/booking'
import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Ticker from '@/sections/Ticker'
import About from '@/sections/About'
import Team from '@/sections/Team'
import Services from '@/sections/Services'
import Why from '@/sections/Why'
import Gallery from '@/sections/Gallery'
import Testimonials from '@/sections/Testimonials'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

/**
 * Sections are keyed by language: switching AR/EN remounts them so every
 * scroll-reveal (framer-motion whileInView, once:true) re-triggers cleanly.
 * Without this, cards whose React key changes with the translation (e.g. team
 * member names) remount *inside* an already-fired animation container and can
 * stay stuck at opacity:0 — invisible images until a manual refresh.
 */
function Sections() {
  const { lang } = useLanguage()
  return (
    <Fragment key={lang}>
      <main>
        <Hero />
        <Ticker />
        <About />
        <Team />
        <Services />
        <Why />
        <Ticker />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </Fragment>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <Navbar />
        <Sections />
      </BookingProvider>
    </LanguageProvider>
  )
}
