---
title: Query builder basics
nextjs:
  metadata:
    title: clash-of-clans-data - Query builder basics
    description: Learn how to filter, look up, and chain operations using the chainable query builder API.
---

The query builder API lets you filter and look up any dataset with readable, chainable method calls: no manual array manipulation required. {% .lead %}

---

## How it works

Every namespace method (`.defenses()`, `.troops()`, `.heroes()`, and so on) returns a query builder wrapping an internal array of typed data. Calling a filter or per-entity accessor method returns a **new** query builder containing only the matching items. You finish the chain with a terminal method (`get()`, `first()`, `find()`, `findByName()`, or `count()`) to extract results.

```typescript
import { home } from 'clash-of-clans-data'

const results = home()
  .defenses() // Start with all Home Village defenses
  .byTownHall(12) // Filter to defenses available at TH12
  .byDamageType('splash') // Keep only splash-damage defenses
  .get() // Extract the array
```

---

## Filtering by Town Hall / Builder Hall / Capital Hall

The most common filter across every base is scoping a category to a progression level. The method name follows the base: `byTownHall(n)` for Home Village, `byBuilderHall(n)` for Builder Base, and `byDistrictHall(n)` / `byCapitalHall(n)` for Clan Capital categories.

```typescript
import { home, builder, clanCapital } from 'clash-of-clans-data'

const th12Defenses = home().defenses().byTownHall(12).get()
const bh9Troops = builder().troops().byBuilderHall(9).get()
const dh5Defenses = clanCapital().defenses().byDistrictHall(5).get()
```

These return buildings or units that have at least one level available at or before the given level: not just ones unlocked exactly at that level.

---

## Per-entity accessors

Every entity in a category has its own accessor method, named after the entity in camelCase. Chain it with `.first()` to get the single matching item:

```typescript
import { home, builder, clanCapital } from 'clash-of-clans-data'

const cannon = home().defenses().cannon().first()!
const barbarianKing = home().heroes().barbarianKing().first()!
const battleMachine = builder().heroes().battleMachine().first()!
const superBarbarian = clanCapital().troops().superBarbarian().first()!
```

This is usually faster to read than `findByName()` for a known entity, and it's fully typed: your editor autocompletes the available accessors for each namespace.

---

## Category-specific filters

Beyond Town Hall scoping, most categories add a handful of filters specific to that category. A few examples:

```typescript
import { home, clan } from 'clash-of-clans-data'

// Home Village defenses: damage type, gear-up capability
const splashDefenses = home().defenses().byDamageType('splash').get()
const gearedUp = home().defenses().hasGearUp().get()

// Home Village troops: housing space, target type
const cheapTroops = home().troops().byHousingSpace(1).get()
const groundTroops = home().troops().byTargetType('ground').get()

// Clan levels: badge tier
const goldLevels = clan().levels().byBadge('gold').get()
```

See each category's own docs page (for example [Home Village defenses](/docs/home-defenses) or [Home Village troops](/docs/home-troops)) for the full filter list for that namespace.

---

## Combining operations

### Branching from a shared base

Since every filter and accessor returns a new instance, you can branch from any intermediate query:

```typescript
import { home } from 'clash-of-clans-data'

const th14 = home().defenses().byTownHall(14)

const splash = th14.byDamageType('splash').get()
const single = th14.byDamageType('single').get()
const total = th14.count()
```

### Passing a custom source into a namespace

Several factory functions accept an optional `source` array so you can wrap your own pre-filtered data in the same query builder:

```typescript
import { home, type HomeDefense } from 'clash-of-clans-data'

const myDefenses: HomeDefense[] = home().defenses().byTownHall(10).get()
const query = home().defenses() // scoped to all defenses by default
```

---

## Collecting results

### As an array

```typescript
const allDefenses = home().defenses().get() // HomeDefense[]
const names = home()
  .defenses()
  .get()
  .map((d) => d.name) // string[]
```

### First item only

```typescript
const cannon = home().defenses().cannon().first() // HomeDefense | undefined
```

### By ID or name

```typescript
const byId = home().troops().find('barbarian') // HomeTroop | undefined
const dragon = home().troops().findByName('Dragon') // HomeTroop | undefined
```

### Count

```typescript
const total = home().defenses().byTownHall(12).count() // number
```

---

## Common patterns

### Building a lookup table

```typescript
import { home } from 'clash-of-clans-data'

const troopMap = new Map(
  home()
    .troops()
    .get()
    .map((t) => [t.id, t]),
)

const barbarian = troopMap.get('barbarian')
```

### Conditional filtering

```typescript
import { home, type HomeVillageDefenses } from 'clash-of-clans-data'

function queryDefenses(townHall?: number, splashOnly?: boolean) {
  let query = home().defenses()

  if (townHall) {
    query = query.byTownHall(townHall)
  }
  if (splashOnly) {
    query = query.byDamageType('splash')
  }

  return query.get()
}
```

### Reading upgrade levels

Most entities carry a `levels` array on the entity itself, rather than a separate query. Once you have an entity, index or filter its `levels` directly:

```typescript
import { home } from 'clash-of-clans-data'

const cannon = home().defenses().cannon().first()!
const th12Level = cannon.levels.find((l) => l.townHallRequired <= 12)
const maxLevel = cannon.levels[cannon.levels.length - 1]

console.log(
  `Cannon has ${cannon.levels.length} levels, max hitpoints ${maxLevel.hitpoints}`,
)
```

---

## Next steps

- Explore [TypeScript integration](/docs/typescript) for type-safe querying
- See the [core concepts](/docs/core-concepts) page for the QueryBase pattern in depth
- Browse individual category pages (for example [Home Village defenses](/docs/home-defenses), [Builder Base troops](/docs/builder-troops)) for category-specific filters
