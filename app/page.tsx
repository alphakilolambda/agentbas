import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Agents from '@/components/Agents'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <Agents />
      <Footer />
    </main>
  )
}

