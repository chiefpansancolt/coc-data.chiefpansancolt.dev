---
title: Installation
nextjs:
  metadata:
    title: clash-of-clans-data - Installation
    description: Install clash-of-clans-data and start importing Clash of Clans game data into your project.
---

Get up and running with clash-of-clans-data in your JavaScript or TypeScript project in under a minute. {% .lead %}

---

## Install the package

Install with your preferred package manager:

### npm

```shell
npm install clash-of-clans-data
```

### Yarn

```shell
yarn add clash-of-clans-data
```

### pnpm

```shell
pnpm add clash-of-clans-data
```

---

## Basic imports

### Named imports

Import individual factory functions and types directly from the package:

```typescript
import { builder, clan, clanCapital, home } from 'clash-of-clans-data'

const allDefenses = home().defenses().get()
const superBarbarian = clanCapital().troops().superBarbarian().first()
const level10 = clan().levels().atLevel(10)
```

This is the recommended approach for most use cases. Tree-shaking-friendly bundlers will only include the modules you actually use.

### Namespace import

If you prefer, you can import the entire package as a namespace:

```typescript
import * as coc from 'clash-of-clans-data'

const th12Defenses = coc.home().defenses().byTownHall(12).get()
```

### Type-only imports

When you only need types for annotations, use `import type`:

```typescript
import type { HomeDefense, HomeTroop } from 'clash-of-clans-data'

function describe(item: HomeDefense | HomeTroop): string {
  return `${item.name} (${item.levels.length} levels)`
}
```

---

## Package exports map

The package exposes three entry points through its exports map:

| Entry point                    | Description                                                           | Example import                                                                |
| ------------------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `clash-of-clans-data`          | Main entry: every namespace factory function and all TypeScript types | `import { home } from 'clash-of-clans-data'`                                  |
| `clash-of-clans-data/data/*`   | Raw JSON data files backing each module                               | `import cannonData from 'clash-of-clans-data/data/home/defenses/cannon.json'` |
| `clash-of-clans-data/images/*` | Bundled PNG image assets for every building, troop, and item level    | Referenced via file path in your bundler or asset pipeline                    |

### Main entry point

The main entry point re-exports everything: the `home()`, `builder()`, `clanCapital()`, `clan()`, `calculators()`, `magicItems()`, `seasonPass()`, `rankedBattles()`, and `achievements()` factory functions, plus every exported TypeScript type.

```typescript
import {
  home,
  builder,
  clanCapital,
  clan,
  calculators,
  magicItems,
} from 'clash-of-clans-data'
```

### Image assets

Every building level, troop level, and item ships with a relative `images` field pointing at a bundled PNG under `clash-of-clans-data/images/`. See the [Image assets](/docs/images) page for usage patterns.

```typescript
const cannon = home().defenses().cannon().first()!
cannon.levels[0].images.normal
// "images/home/defenses/cannon/normal/level-1.png"
```

---

## Requirements

- **Node.js** 24 or later
- **TypeScript** 5.0 or later (optional, but recommended)

The package ships with full TypeScript declarations and works in both ESM and CommonJS projects. No additional `@types` package is needed.

---

## Next steps

- Learn the [core concepts](/docs/core-concepts) behind the query builder pattern
- Explore the [query builder](/docs/query-builder) for filtering and looking up data
- See [TypeScript integration](/docs/typescript) for type usage across every base
