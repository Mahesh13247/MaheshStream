import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown, HiSearch } from 'react-icons/hi'
import Section, { SectionHeader } from '../ui/Section'

const faqs = [
  {
    q: 'What is MaheshStream?',
    a: 'MaheshStream is a premium Android entertainment application that lets you stream movies, TV shows, web series, and live TV channels. It features a beautiful interface, powerful search, and a seamless viewing experience.',
  },
  {
    q: 'Is MaheshStream free?',
    a: 'Yes, MaheshStream is completely free to download and use. There are no subscription fees or hidden charges. The app is supported through optional contributions and community support.',
  },
  {
    q: 'How do I install MaheshStream?',
    a: 'Download the APK from our official website, enable "Install from Unknown Sources" in your device settings, open the downloaded APK file, and tap Install. The full installation process takes less than a minute.',
  },
  {
    q: 'Is MaheshStream safe?',
    a: 'Yes, MaheshStream is safe to use. All APK files are verified and signed. We recommend downloading exclusively from our official website to ensure you receive authentic, untampered files.',
  },
  {
    q: 'What Android versions are supported?',
    a: 'MaheshStream supports Android 6.0 (Marshmallow) and above. We recommend using the latest Android version for the best performance and feature compatibility.',
  },
  {
    q: 'How do I update MaheshStream?',
    a: 'MaheshStream has a built-in auto-update feature. When a new version is available, you will receive an in-app notification. Simply tap "Update Now" and the app handles the rest.',
  },
  {
     q: 'Can I request new features?',
     a: 'Absolutely! We welcome feature requests and feedback through our GitHub repository. The community plays a vital role in shaping MaheshStream\'s development.',
  },
  {
    q: 'Does MaheshStream support subtitles?',
    a: 'Yes, MaheshStream has full subtitle support with multiple languages. You can customize subtitle appearance including font size, color, and position to suit your preferences.',
  },
]

function FAQItem({ faq, index, isOpen, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderBottom: '1px solid var(--color-border)',
        transition: 'border-color var(--transition-fast)',
      }}
    >
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: 'clamp(16px, 3vw, 20px) 0',
          textAlign: 'left',
          fontSize: 'clamp(0.95rem, 2vw, 1rem)',
          fontWeight: 500,
          minHeight: 'var(--touch-target)',
          color: isOpen ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          transition: 'color var(--transition-fast)',
        }}
      >
        <span>{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flexShrink: 0,
            width: 'var(--touch-target)',
            height: 'var(--touch-target)',
            borderRadius: '50%',
            background: isOpen ? 'rgba(230,0,0,0.15)' : 'var(--color-bg-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            color: isOpen ? 'var(--color-accent-light)' : 'var(--color-text-muted)',
          }}
        >
          <HiChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                paddingBottom: '20px',
                fontSize: '0.95rem',
                color: 'var(--color-text-tertiary)',
                lineHeight: 1.7,
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openKey, setOpenKey] = useState(null)
  const [query, setQuery] = useState('')

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return faqs
    return faqs.filter(
      (faq) => faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <Section id="faq">
      <div className="container">
        <SectionHeader
          label="FAQ"
          title="Frequently asked questions."
          subtitle="Everything you need to know about MaheshStream."
        />

        <div style={{ maxWidth: '480px', margin: '0 auto 32px', position: 'relative' }}>
          <HiSearch
            size={18}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            aria-label="Search FAQ"
            style={{
              width: '100%',
              padding: '14px 16px 14px 44px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-bg-glass)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              fontSize: '0.95rem',
              minHeight: 'var(--touch-target)',
            }}
          />
        </div>

        <div>
          {filteredFaqs.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', padding: '24px 0' }}>
               No questions match your search. Reach out via GitHub for help.
            </p>
          ) : (
            filteredFaqs.map((faq, i) => (
              <FAQItem
                key={faq.q}
                faq={faq}
                index={i}
                isOpen={openKey === faq.q}
                onClick={() => setOpenKey(openKey === faq.q ? null : faq.q)}
              />
            ))
          )}
        </div>
      </div>
    </Section>
  )
}
