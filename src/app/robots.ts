import type { MetadataRoute } from 'next'

// CHANGE_ME: must match siteUrl in src/app/layout.tsx and SITE_URL in
// src/app/sitemap.ts
const SITE_URL = 'https://YOUR_APP_NAME.example.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
