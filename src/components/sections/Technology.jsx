import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiCode, HiLightningBolt, HiDeviceMobile, HiColorSwatch, HiServer, HiCube } from 'react-icons/hi'
import Section, { SectionHeader } from '../ui/Section'

const technologies = [
  { icon: HiCode, title: 'React', desc: 'Modern UI library for building fast, interactive user interfaces with a component-based architecture.' },
  { icon: HiCode, title: 'JavaScript', desc: 'Core programming language powering dynamic content and seamless user interactions.' },
  { icon: HiLightningBolt, title: 'Vite', desc: 'Next-generation build tool providing instant server start and lightning-fast hot module replacement.' },
  { icon: HiColorSwatch, title: 'Modern UI Libraries', desc: 'Premium UI libraries including Framer Motion for silky smooth animations and interactions.' },
  { icon: HiServer, title: 'REST APIs', desc: 'Efficient API integration for content fetching, streaming sources, and real-time data updates.' },
  { icon: HiCube, title: 'Performance Optimization', desc: 'Lazy loading, code splitting, and optimized asset delivery for maximum performance.' },
  { icon: HiDeviceMobile, title: 'Responsive Design', desc: 'Fluid layouts and adaptive components that deliver a perfect experience on any screen size.' },
  { icon: HiLightningBolt, title: 'Animation Libraries', desc: 'Advanced animation systems powering smooth transitions, micro-interactions, and visual flourishes.' },
]

function TechCard({ tech, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = tech.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(16px, 3vw, 24px)',
        transition: 'all var(--transition-base)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-hover)'
        e.currentTarget.style.background = 'var(--color-bg-card-hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.background = 'var(--color-bg-card)'
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, rgba(230,0,0,0.15), rgba(255,26,26,0.15))',
          marginBottom: '16px',
          fontSize: '1.25rem',
          color: 'var(--color-accent-light)',
        }}
      >
        <Icon />
      </div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '8px' }}>{tech.title}</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', lineHeight: 1.7, flex: 1 }}>{tech.desc}</p>
    </motion.div>
  )
}

export default function Technology() {
  return (
    <Section id="technology">
      <div className="container">
        <SectionHeader
          label="Technology"
          title="Built with modern tech."
          subtitle="MaheshStream leverages cutting-edge technologies to deliver a premium, high-performance experience."
        />
        <div className="features-grid">
          {technologies.map((tech, i) => (
            <TechCard key={tech.title} tech={tech} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
