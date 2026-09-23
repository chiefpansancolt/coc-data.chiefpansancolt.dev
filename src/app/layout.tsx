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

// siteUrl must match SITE_URL in src/app/robots.ts and src/app/sitemap.ts.
// A mismatch between these was a real bug found across several sites cloned
// from this template's sibling repos.
const siteUrl = 'https://coc-data.chiefpansancolt.dev'
const siteDescription =
  'Getting started with using clash-of-clans-data, a fully-typed Node.js package containing all Clash of Clans game data.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s - Docs',
    default: 'clash-of-clans-data',
  },
  description: siteDescription,
  keywords: [
    'clash-of-clans-data',
    'clash of clans',
    'clash of clans api',
    'clash of clans json',
    'clash of clans typescript',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'clash-of-clans-data',
    title: 'clash-of-clans-data',
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'clash-of-clans-data',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: 'clash-of-clans-data',
  description: siteDescription,
  codeRepository: 'https://github.com/chiefpansancolt/clash-of-clans-data',
  programmingLanguage: 'TypeScript',
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
