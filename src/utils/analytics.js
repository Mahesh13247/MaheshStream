const ANALYTICS_KEY = 'maheshstream-analytics'

export function generateAnalyticsId() {
  let id = localStorage.getItem(ANALYTICS_KEY)
  if (!id) {
    id = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    localStorage.setItem(ANALYTICS_KEY, id)
  }
  return id
}

export function trackPageView(page) {
  generateAnalyticsId()
  localStorage.setItem('maheshstream-last-page', page)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', { page_title: page })
  }
}

export function trackDownloadClick(version, sizeMB) {
  const analyticsId = generateAnalyticsId()
  const data = {
    type: 'download_click',
    timestamp: new Date().toISOString(),
    version,
    sizeMB,
    analyticsId,
    deviceId: navigator.userAgent,
  }

  const downloads = JSON.parse(localStorage.getItem('maheshstream-downloads') || '[]')
  downloads.push(data)
  localStorage.setItem('maheshstream-downloads', JSON.stringify(downloads.slice(-100)))
}

export function trackFormSubmission(_formType) {
  generateAnalyticsId()
}

export function trackAgeVerification(_verified) {
  generateAnalyticsId()
  localStorage.setItem('maheshstream-age-verified-at', new Date().toISOString())
}

export function getAnalyticsData() {
  const downloads = JSON.parse(localStorage.getItem('maheshstream-downloads') || '[]')
  return {
    downloads: downloads.length,
    lastDownload: downloads.length > 0 ? downloads[downloads.length - 1].timestamp : null,
    lastPage: localStorage.getItem('maheshstream-last-page'),
  }
}

export function clearAnalytics() {
  localStorage.removeItem(ANALYTICS_KEY)
  localStorage.removeItem('maheshstream-downloads')
  localStorage.removeItem('maheshstream-last-page')
}
