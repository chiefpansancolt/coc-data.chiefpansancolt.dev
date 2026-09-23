import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
  src: '../fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
})

// CHANGE_ME: siteUrl must match SITE_URL in src/app/robots.ts and
// src/app/sitemap.ts — a mismatch between these was a real bug found
// across several sites cloned from this template's sibling repos.
const siteUrl = 'https://YOUR_APP_NAME.example.com'
const siteDescription =
  'Getting started with using YOUR_APP_NAME in YOUR_CONTEXT.'

// CHANGE_ME: update name/description/keywords for your project throughout
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s - Docs',
    default: 'YOUR_APP_NAME',
  },
  description: siteDescription,
  keywords: ['YOUR_APP_NAME', 'YOUR_KEYWORD'],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'YOUR_APP_NAME',
    title: 'YOUR_APP_NAME',
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YOUR_APP_NAME',
    description: siteDescription,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

// CHANGE_ME: update name/codeRepository/programmingLanguage, or delete this
// block and the <script> below entirely if the docs aren't for an open
// source project.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: 'YOUR_APP_NAME',
  description: siteDescription,
  codeRepository: 'https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO',
  programmingLanguage: 'YOUR_LANGUAGE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full bg-white dark:bg-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
