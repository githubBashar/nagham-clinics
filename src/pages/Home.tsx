import { LanguageProvider } from '@/lib/i18n'
import { BookingProvider } from '@/lib/booking'
import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Ticker from '@/sections/Ticker'
import About from '@/sections/About'
import Services from '@/sections/Services'
import Why from '@/sections/Why'
import Gallery from '@/sections/Gallery'
import Testimonials from '@/sections/Testimonials'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <Navbar />
        <main>
          <Hero />
          <Ticker />
          <About />
          <Services />
          <Why />
          <Ticker />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </BookingProvider>
    </LanguageProvider>
  )
}
