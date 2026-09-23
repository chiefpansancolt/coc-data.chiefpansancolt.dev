---
title: Image assets
nextjs:
  metadata:
    title: clash-of-clans-data - Image assets
    description: Access bundled PNG image assets for every Clash of Clans building, troop, and item level.
---

The package bundles a PNG image asset for every building level, troop, and item: accessible via a relative path on the data itself. {% .lead %}

---

## How images work

Image files are distributed with the package under the `images/` directory. Every building level record includes an `images` field with paths to its PNG assets: buildings with multiple visual modes (like a geared-up defense) expose one path per mode.

```typescript
import { home } from 'clash-of-clans-data'

const cannon = home().defenses().cannon().first()!
cannon.levels[0].images.normal
// "images/home/defenses/cannon/normal/level-1.png"
cannon.levels[6].images.gearedUpBurst
// "images/home/defenses/cannon/geared-up-burst/level-7.png"
```

Troops, spells, heroes, pets, and hero equipment use a simpler shape: usually a single `images.normal` or `images.icon` path per level:

```typescript
import { home } from 'clash-of-clans-data'

const barbarian = home().troops().barbarian().first()!
barbarian.levels[0].images.normal
// "images/home/troops/barbarian/normal/level-1.png"

const barbarianKing = home().heroes().barbarianKing().first()!
barbarianKing.images.icon
// "images/home/heroes/barbarian-king/icon.png"
```

---

## Accessing images

Images are located at `node_modules/clash-of-clans-data/images/...` and can be referenced by resolving them from `require.resolve('clash-of-clans-data')` or via your bundler's asset pipeline.

### In a bundler (Webpack, Vite, etc.)

Most modern bundlers can resolve image imports from `node_modules`. Combine the relative path from the data with the package name:

```typescript
import { home } from 'clash-of-clans-data'

const cannon = home().defenses().cannon().first()!
const imagePath = `clash-of-clans-data/${cannon.levels[0].images.normal}`
```

### In React

```tsx
import { home } from 'clash-of-clans-data'

function DefenseCard({ name }: { name: string }) {
  const defense = home().defenses().findByName(name)
  if (!defense) return null

  const latest = defense.levels[defense.levels.length - 1]

  return (
    <div>
      <img
        src={`/node_modules/clash-of-clans-data/${latest.images.normal}`}
        alt={defense.name}
      />
      <h3>{defense.name}</h3>
      <p>Level {latest.level}</p>
    </div>
  )
}
```

### Copying images to your public directory

For production use, copy the images directory into your project's public/static folder during your build step:

```shell
# Copy all images to your public directory
cp -r node_modules/clash-of-clans-data/images public/coc-images
```

Then reference them with a simple path:

```tsx
<img src="/coc-images/home/defenses/cannon/normal/level-1.png" alt="Cannon" />
```

### In Next.js

Create a small helper to resolve image paths after copying assets into `public/`:

```typescript
function cocImage(relativePath: string): string {
  return `/coc-images/${relativePath.replace('images/', '')}`
}

// Usage
const cannon = home().defenses().cannon().first()!
const src = cocImage(cannon.levels[0].images.normal)
// "/coc-images/home/defenses/cannon/normal/level-1.png"
```

---

## Image organization

Images are organized under `images/<base>/<category>/<entity>/<mode>/level-N.png`, mirroring the module structure. A few examples:

| Path pattern                                           | Content                                                        |
| ------------------------------------------------------ | -------------------------------------------------------------- |
| `images/home/defenses/<name>/<mode>/level-N.png`       | Home Village defense sprites, by upgrade level and visual mode |
| `images/home/troops/<name>/normal/level-N.png`         | Home Village troop sprites, by upgrade level                   |
| `images/home/heroes/<name>/icon.png`                   | Home Village hero icons                                        |
| `images/builder/defenses/<name>/normal/level-N.png`    | Builder Base defense sprites                                   |
| `images/clan-capital/troops/<name>/normal/level-N.png` | Clan Capital troop sprites                                     |
| `images/clan/levels/badge-N.png`                       | Clan level badge images                                        |
| `images/magic-items/<type>/<name>.png`                 | Magic item icons                                               |

The exact mode segment (`normal`, `gearedUpBurst`, `icon`, and so on) matches the key used in that level's `images` object.

---

## Next steps

- See [TypeScript integration](/docs/typescript) for the exact `images` field shape per level type
- Browse [Home Village defenses](/docs/home-defenses) for an example of a multi-mode `images` object (geared-up defenses)
- See the [core concepts](/docs/core-concepts) page for how per-entity accessors return the level data these images belong to
