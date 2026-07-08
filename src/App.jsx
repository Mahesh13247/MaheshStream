import { lazy, Suspense, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { inject as injectAnalytics } from '@vercel/analytics'
import SkipToContent from './components/ui/SkipToContent'
import ScrollProgress from './components/ui/ScrollProgress'
import NoiseOverlay from './components/ui/NoiseOverlay'
import BackToTop from './components/ui/BackToTop'
import AgeVerification from './components/ui/AgeVerification'
import ErrorBoundary from './components/ui/ErrorBoundary'
import Navbar from './components/sections/Navbar'
import Footer from './components/sections/Footer'
import { setupSmoothScroll } from './utils/smoothScroll'
import { trackPageView } from './utils/analytics'

const Hero = lazy(() => import('./components/sections/Hero'))
const Features = lazy(() => import('./components/sections/Features'))
const Screenshots = lazy(() => import('./components/sections/Screenshots'))
const DemoVideos = lazy(() => import('./components/sections/DemoVideos'))
const Download = lazy(() => import('./components/sections/Download'))
const AutoUpdate = lazy(() => import('./components/sections/AutoUpdate'))
const Technology = lazy(() => import('./components/sections/Technology'))
const InstallationGuide = lazy(() => import('./components/sections/InstallationGuide'))
const Changelog = lazy(() => import('./components/sections/Changelog'))
const FAQ = lazy(() => import('./components/sections/FAQ'))
const About = lazy(() => import('./components/sections/About'))
const Legal = lazy(() => import('./components/sections/Legal'))

function SectionLoader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0',
        color: 'var(--color-text-muted)',
        fontSize: '0.9rem',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          border: '2px solid var(--color-border)',
          borderTopColor: 'var(--color-accent)',
          borderRadius: '50%',
          animation: 'spin-slow 0.8s linear infinite',
        }}
      />
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const cleanup = setupSmoothScroll()
    injectAnalytics()
    trackPageView('home')
    return cleanup
  }, [])

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>MaheshStream - One Platform. Endless Entertainment.</title>
        <meta name="description" content="Premium entertainment platform for movies, TV shows, web series, and live TV. Download the official Android app." />
        <meta property="og:title" content="MaheshStream - One Platform. Endless Entertainment." />
        <meta property="og:description" content="Premium entertainment platform for movies, TV shows, web series, and live TV." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MaheshStream - One Platform. Endless Entertainment." />
        <meta name="twitter:description" content="Premium entertainment platform for movies, TV shows, web series, and live TV." />
      </Helmet>

      <SkipToContent />
      <ScrollProgress />
      <NoiseOverlay opacity={0.03} />
      <AgeVerification />

      <Navbar />

      <main id="main-content">
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Hero />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Features />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Screenshots />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <DemoVideos />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Download />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <AutoUpdate />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Technology />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <InstallationGuide />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Changelog />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <FAQ />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Legal />
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />

      <BackToTop />
    </>
  )
}
