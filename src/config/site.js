export const APP_VERSION = '3.2.1'
export const APK_FILENAME = `maheshstream-v${APP_VERSION}.apk`
export const APK_DOWNLOAD_URL = `/download/${APK_FILENAME}`
export const APK_SIZE_MB = '18.5'

export const SITE = {
  name: 'MaheshStream',
  tagline: 'One Platform. Endless Entertainment.',
  email: 'support@maheshstream.com',
  url: 'https://maheshstream.com',
}

export const SOCIAL_LINKS = {
  github: 'https://github.com/maheshstream',
  twitter: 'https://twitter.com/maheshstream',
  telegram: 'https://t.me/maheshstream',
  discord: 'https://discord.gg/maheshstream',
  linkedin: 'https://linkedin.com/company/maheshstream',
}

// Set real YouTube IDs when demo videos are uploaded. Empty = "Coming Soon" card.
export const DEMO_VIDEOS = [
  {
    title: 'Product Overview',
    desc: 'A complete walkthrough of MaheshStream and all its capabilities.',
    duration: '3:24',
    views: '2.1K',
    youtubeId: '',
  },
  {
    title: 'UI Walkthrough',
    desc: 'Explore the beautiful and intuitive user interface design.',
    duration: '4:15',
    views: '1.8K',
    youtubeId: '',
  },
  {
    title: 'Feature Showcase',
    desc: 'See all premium features in action with detailed demonstrations.',
    duration: '5:30',
    views: '3.2K',
    youtubeId: '',
  },
  {
    title: 'Installation Guide',
    desc: 'Step-by-step guide to install MaheshStream on your Android device.',
    duration: '2:45',
    views: '4.5K',
    youtubeId: '',
  },
  {
    title: 'Auto-Update Demo',
    desc: 'Learn how the auto-update system keeps your app current without effort.',
    duration: '1:50',
    views: '1.2K',
    youtubeId: '',
  },
]

export function getApkAbsoluteUrl() {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${APK_DOWNLOAD_URL}`
  }
  return `${SITE.url}${APK_DOWNLOAD_URL}`
}
