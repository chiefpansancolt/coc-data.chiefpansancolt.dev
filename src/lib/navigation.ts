export const navigation = [
  {
    title: 'Introduction',
    links: [
      { title: 'Getting started', href: '/' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Core concepts', href: '/docs/core-concepts' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { title: 'Query builder basics', href: '/docs/query-builder' },
      { title: 'TypeScript integration', href: '/docs/typescript' },
      { title: 'Image assets', href: '/docs/images' },
    ],
  },
  {
    title: 'Home Village',
    links: [
      { title: 'Overview', href: '/docs/home-village' },
      { title: 'Defenses & traps', href: '/docs/home-defenses' },
      { title: 'Troops, spells & siege machines', href: '/docs/home-troops' },
      { title: 'Heroes, equipment & pets', href: '/docs/home-heroes' },
      { title: 'Buildings', href: '/docs/home-buildings' },
    ],
  },
  {
    title: 'Builder Base',
    links: [
      { title: 'Overview', href: '/docs/builder-base' },
      { title: 'Defenses & traps', href: '/docs/builder-defenses' },
      { title: 'Troops & heroes', href: '/docs/builder-troops' },
      { title: 'Buildings & leagues', href: '/docs/builder-buildings' },
    ],
  },
  {
    title: 'Clan Capital',
    links: [
      { title: 'Overview', href: '/docs/clan-capital' },
      { title: 'Defenses & traps', href: '/docs/capital-defenses' },
      { title: 'Troops & spells', href: '/docs/capital-troops' },
      { title: 'Buildings & leagues', href: '/docs/capital-buildings' },
    ],
  },
  {
    title: 'Clan & Progression',
    links: [
      { title: 'Clan data', href: '/docs/clan' },
      { title: 'Calculators', href: '/docs/calculators' },
      { title: 'Magic items', href: '/docs/magic-items' },
      {
        title: 'Season pass, ranked battles & achievements',
        href: '/docs/extras',
      },
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
      {
        title: 'License',
        href: 'https://github.com/chiefpansancolt/clash-of-clans-data/blob/main/LICENSE',
      },
    ],
  },
]

// NOTE: src/app/sitemap.ts and src/app/robots.ts read this file directly to
// generate the sitemap and to build search-page metadata: add every new
// internal doc page here (an `href` starting with "/") and it's picked up
// automatically. External links (http/https) are ignored by the sitemap.
