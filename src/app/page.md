---
title: Getting Started
nextjs:
  metadata:
    title: clash-of-clans-data - Getting Started
    description: Getting started with clash-of-clans-data, a fully-typed Node.js package containing all Clash of Clans game data.
---

Documentation for the clash-of-clans-data npm package: a comprehensive, fully-typed dataset for Clash of Clans with structured JSON data, bundled image assets, and a chainable query API for Home Village, Builder Base, and Clan Capital. {% .lead %}

{% quick-links %}

{% quick-link title="Installation" icon="installation" href="/docs/installation" description="Install the package and start querying Clash of Clans data in your project." /%}

{% quick-link title="Core concepts" icon="presets" href="/docs/core-concepts" description="Learn the factory function and query builder pattern shared by every namespace." /%}

{% quick-link title="Query builder" icon="plugins" href="/docs/query-builder" description="Filter and look up defenses, troops, heroes, and more with chainable methods." /%}

{% quick-link title="TypeScript" icon="theming" href="/docs/typescript" description="Full TypeScript support with typed exports for every base and entity." /%}

{% /quick-links %}

---

## Quick start

### Install the package

```shell
npm install clash-of-clans-data
```

### Import and query data

```typescript
import { builder, clan, clanCapital, home } from 'clash-of-clans-data'

// Home Village: single building
const cannon = home().defenses().cannon().first()!
console.log(cannon.name) // "Cannon"
console.log(cannon.levels.length) // number of upgrade levels

// Home Village: category queries
const splashDefenses = home().defenses().byDamageType('splash').get()
const th12Defenses = home().defenses().byTownHall(12).get()

// Builder Base
const bCannon = builder().defenses().cannon().first()!

// Clan Capital
const superBarbarian = clanCapital().troops().superBarbarian().first()!

// Clan
const level10 = clan().levels().atLevel(10)!
console.log(level10.perks.donationUpgradeLevels) // 2
```

---

## What's included

The package provides fully-typed data and query builders for every base in the game:

- **Home Village**: Defenses, crafted defenses, traps, walls, troops, spells, siege machines, heroes, hero equipment, pets, guardians, resource buildings, army buildings, other buildings, and the Town Hall
- **Builder Base**: Defenses, traps, walls, troops, heroes, resource buildings, army buildings, the Builder Hall, and Builder Base leagues
- **Clan Capital**: Defenses, traps, walls, troops, spells, army buildings, other buildings, the Capital Hall, District Halls, the Forge, and Clan Capital leagues
- **Clan**: Clan levels and perks, clan labels, and war data (max base loot, war bonus tiers, max base ore)
- **Calculators**: Gem cost, Builder/Research Boost, potions & snacks, Clock Tower, and Helper Hut helpers
- **Magic items**: Books, hammers, potions, snacks, and utility items
- **Season pass, ranked battles & achievements**: Season pass challenges, ranked battle leagues, and in-game achievements

---

## Data source

All game data is sourced from the [Clash of Clans Wiki](https://clashofclans.fandom.com/wiki/) and kept up-to-date with each game update.

---

## Getting help

### Submit an issue

Found a bug or have a feature request? Open an issue on the [GitHub repository](https://github.com/chiefpansancolt/clash-of-clans-data/issues).

### View on GitHub

Check out the source code at [github.com/chiefpansancolt/clash-of-clans-data](https://github.com/chiefpansancolt/clash-of-clans-data).

### Contributing

Bug reports, feature requests, and pull requests are welcome. See [how to contribute](/docs/how-to-contribute) for details.

This project is not affiliated with, endorsed, or sponsored by Supercell. Clash of Clans is a trademark of Supercell.
