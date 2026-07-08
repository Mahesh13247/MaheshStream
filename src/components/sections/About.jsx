import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiEye, HiLightningBolt, HiUserGroup, HiStar } from 'react-icons/hi'
import Section, { SectionHeader } from '../ui/Section'

const values = [
  { icon: HiStar, title: 'Quality First', desc: 'Every pixel, every animation, every interaction is crafted with meticulous attention to detail.' },
  { icon: HiUserGroup, title: 'Community Driven', desc: 'Built with feedback from thousands of users who shape the direction of the platform.' },
  { icon: HiLightningBolt, title: 'Performance Obsessed', desc: 'Optimized for speed and efficiency without compromising on features or quality.' },
  { icon: HiEye, title: 'Beautiful by Design', desc: 'A premium visual experience that makes entertainment truly enjoyable.' },
]

const milestones = [
  { year: '2024', event: 'MaheshStream concept and initial development begins' },
  { year: '2024', event: 'First alpha release with core streaming functionality' },
  { year: '2025', event: 'Major UI redesign with glassmorphism and premium aesthetics' },
  { year: '2025', event: 'Auto-update system, live TV, and multi-language support launched' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section id="about">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(230,0,0,0.02) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div className="container" ref={ref}>
        <SectionHeader
          label="About"
          title="Our mission is simple."
          subtitle="We believe entertainment should be accessible, beautiful, and effortless. MaheshStream was built to deliver exactly that."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(24px, 4vw, 48px)',
            marginBottom: 'clamp(24px, 4vw, 48px)',
          }}
        >
          <div className="about-vision-grid">
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Our Vision</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-tertiary)', lineHeight: 1.7 }}>
                To create the most beautiful and accessible entertainment platform that brings together
                movies, TV shows, web series, and live TV into a single, seamless experience. We envision
                a world where premium entertainment is available to everyone, without barriers.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Our Philosophy</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-tertiary)', lineHeight: 1.7 }}>
                We believe in the power of great design and performance. Every feature in MaheshStream
                is built with intention — nothing is added without purpose. We prioritize user experience
                above all else, because entertainment should be effortless.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="about-values-grid" style={{ marginBottom: 'clamp(24px, 4vw, 48px)' }}>
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  textAlign: 'center',
                  transition: 'all var(--transition-base)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(230,0,0,0.15), rgba(255,26,26,0.15))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '1.25rem',
                    color: 'var(--color-accent-light)',
                  }}
                >
                  <Icon />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '8px' }}>{v.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', lineHeight: 1.7 }}>{v.desc}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, textAlign: 'center', marginBottom: '24px' }}>
            Development Story
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  transition: 'all var(--transition-base)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent-light)' }}>{m.year}</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', marginTop: '8px' }}>{m.event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
