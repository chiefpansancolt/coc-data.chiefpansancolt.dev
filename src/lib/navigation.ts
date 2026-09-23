export const navigation = [
  {
    title: 'Introduction',
    links: [
      { title: 'Getting started', href: '/' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'How to use', href: '/docs/usage' },
    ],
  },
  {
    title: 'Contributing',
    links: [
      { title: 'How to contribute', href: '/docs/how-to-contribute' },
      { title: 'Sponsor', href: '/docs/sponsor' },
      { title: 'Change log', href: '/docs/change-log' },
    ],
  },
  {
    title: 'Resources',
    links: [
      // CHANGE_ME: update or remove these — they're placeholders
      {
        title: 'Roadmap',
        href: 'https://github.com/users/YOUR_GITHUB_USERNAME/projects/1',
      },
      {
        title: 'License',
        href: 'https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO/blob/main/LICENSE',
      },
    ],
  },
]

// NOTE: src/app/sitemap.ts and src/app/robots.ts read this file directly to
// generate the sitemap and to build search-page metadata — add every new
// internal doc page here (an `href` starting with "/") and it's picked up
// automatically. External links (http/https) are ignored by the sitemap.
