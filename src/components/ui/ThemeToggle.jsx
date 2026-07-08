import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '../../context/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'var(--touch-target)',
        height: 'var(--touch-target)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-bg-glass)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-secondary)',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
        flexShrink: 0,
      }}
    >
      {theme === 'dark' ? <HiSun size={16} /> : <HiMoon size={16} />}
    </button>
  )
}
