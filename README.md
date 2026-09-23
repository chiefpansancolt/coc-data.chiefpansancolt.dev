# Documentation Template

A Next.js + [Markdoc](https://markdoc.dev) template for building documentation sites, based on the pattern shared by [package-builder](https://github.com/chiefpansancolt/package-builder.chiefpansancolt.dev), [simplecov-tailwind](https://github.com/chiefpansancolt/simplecov-tailwind.chiefpansancolt.dev), [stimulus-tailwind](https://github.com/chiefpansancolt/stimulus-tailwind.chiefpansancolt.dev), and [stardew-valley-data](https://github.com/chiefpansancolt/stardew-valley-data.chiefpansancolt.dev)'s documentation sites.

See [DOCUMENTATION_TEMPLATE.md](./DOCUMENTATION_TEMPLATE.md) for a full customization guide before you start.

## What's included out of the box

- Next.js App Router + Markdoc docs pages, with search (FlexSearch)
- A working SEO baseline: `metadataBase`, OpenGraph/Twitter metadata, `alternates.canonical`, a dynamic `robots.ts` + `sitemap.ts` generated from `src/lib/navigation.ts`, a generated `opengraph-image.tsx`, and JSON-LD `SoftwareSourceCode` schema
- Dark mode, mobile navigation, table of contents, prev/next links
- CI (lint + build) and a manual-dispatch Vercel deploy workflow

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
```
