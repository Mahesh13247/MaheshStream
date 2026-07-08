export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'fixed',
        top: '-100%',
        left: '16px',
        zIndex: 10001,
        padding: '12px 24px',
        background: 'var(--color-accent)',
        color: '#fff',
        fontWeight: 600,
        borderRadius: 'var(--radius-md)',
        fontSize: '0.9rem',
        transition: 'top 0.2s',
      }}
      onFocus={(e) => { e.target.style.top = '16px' }}
      onBlur={(e) => { e.target.style.top = '-100%' }}
    >
      Skip to main content
    </a>
  )
}
