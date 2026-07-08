import { useState, useEffect, lazy, Suspense } from 'react'
import { getApkAbsoluteUrl } from '../../config/site'

const QRCode = lazy(() => import('react-qr-code'))

export default function DownloadQR({ size = 80 }) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(getApkAbsoluteUrl())
  }, [])

  if (!url) return null

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 'var(--radius-md)',
        padding: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        lineHeight: 0,
      }}
    >
      <Suspense fallback={<div style={{ width: size, height: size, background: '#f0f0f0', borderRadius: '4px' }} />}>
        <QRCode
          value={url}
          size={size}
          bgColor="#ffffff"
          fgColor="#0f0f10"
          level="M"
          style={{ display: 'block', width: '100%', height: 'auto', maxWidth: size }}
          aria-label="QR code to download MaheshStream APK"
        />
      </Suspense>
    </div>
  )
}
