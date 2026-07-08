import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiShieldCheck, HiDocumentText, HiInformationCircle, HiScale, HiEye, HiClock, HiChevronDown } from 'react-icons/hi'
import Section, { SectionHeader } from '../ui/Section'

const legalItems = [
  {
    icon: HiShieldCheck,
    title: 'Privacy Policy',
    content: 'MaheshStream respects your privacy. We collect minimal data necessary for the app to function properly, including basic device information and app preferences. We do not collect personal identifiable information without your consent. No viewing history or personal data is ever shared with third parties.',
  },
  {
    icon: HiScale,
    title: 'Terms of Service',
    content: 'By using MaheshStream, you agree to use the application for personal, non-commercial entertainment purposes only. You may not redistribute, modify, or reverse engineer the application. The app is provided "as is" without warranty of any kind.',
  },
  {
    icon: HiInformationCircle,
    title: 'Disclaimer',
    content: 'MaheshStream is a third-party application that indexes publicly available content from various sources on the internet. We do not host, store, or distribute any copyrighted content. All content is provided by third-party sources and is accessible through publicly available APIs.',
  },
  {
    icon: HiDocumentText,
    title: 'DMCA Policy',
    content: 'MaheshStream respects intellectual property rights. If you believe that any content available through the app infringes upon your copyright, please contact us with the relevant details and we will promptly address your concerns.',
  },
  {
    icon: HiEye,
    title: 'Copyright Notice',
    content: 'All trademarks, logos, and brand names are the property of their respective owners. MaheshStream is not affiliated with, endorsed by, or associated with any of the content providers. The MaheshStream name and logo are proprietary.',
  },
  {
    icon: HiClock,
    title: 'Age Policy',
    content: 'MaheshStream is intended for users aged 13 and above. The app may contain content that is not suitable for all ages. Parental guidance is recommended for younger users. By using the app, you confirm that you meet the minimum age requirement.',
  },
]

function LegalItem({ item, index, isOpen, onClick }) {
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '18px 0',
          textAlign: 'left',
          fontSize: '0.95rem',
          fontWeight: 500,
          color: isOpen ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          transition: 'color var(--transition-fast)',
        }}
      >
        <span style={{ color: 'var(--color-accent-light)', fontSize: '1.1rem', flexShrink: 0 }}>
          <Icon />
        </span>
        <span style={{ flex: 1 }}>{item.title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
        >
          <HiChevronDown size={18} />
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
                paddingBottom: '18px',
                paddingLeft: '36px',
                fontSize: '0.9rem',
                color: 'var(--color-text-tertiary)',
                lineHeight: 1.7,
              }}
            >
              {item.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Legal() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <Section id="legal">
      <div className="container">
        <SectionHeader
          label="Legal"
          title="Transparency matters."
          subtitle="Our legal documents are straightforward and transparent. We believe in clear communication with our users."
        />
        <div>
          {legalItems.map((item, i) => (
            <LegalItem
              key={item.title}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
