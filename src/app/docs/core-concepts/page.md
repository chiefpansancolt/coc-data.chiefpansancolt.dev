---
title: Core concepts
nextjs:
  metadata:
    title: clash-of-clans-data - Core concepts
    description: Understand the QueryBase pattern, terminal methods, and the base/namespace/entity structure that powers every module.
---

Every module in clash-of-clans-data follows the same patterns: once you learn them here, you can use any namespace without reading its docs first. {% .lead %}

---

## Three bases, one shape

The package is organized around three bases, each returned by its own top-level factory function:

| Factory function | Returns       | Covers                                                   |
| ---------------- | ------------- | -------------------------------------------------------- |
| `home()`         | `HomeVillage` | Home Village: defenses, troops, spells, heroes, and more |
| `builder()`      | `BuilderBase` | Builder Base: defenses, troops, heroes, and leagues      |
| `clanCapital()`  | `ClanCapital` | Clan Capital: defenses, troops, spells, and leagues      |

Each base object exposes namespace methods (`.defenses()`, `.troops()`, `.heroes()`, and so on) that return a query builder scoped to that category:

```typescript
import { home, builder, clanCapital } from 'clash-of-clans-data'

home().defenses() // HomeVillageDefenses
builder().troops() // BuilderBaseTroops
clanCapital().spells() // ClanCapitalSpells
```

Two more top-level namespaces sit alongside the three bases:

```typescript
import { clan } from 'clash-of-clans-data'

clan().levels() // ClanLevels: clan XP, badges, and perks
clan().labels() // ClanLabels: searchable clan labels
clan().war() // ClanWar: max base loot, war bonus tiers, max base ore
```

---

## The QueryBase pattern

Most query builders extend the `QueryBase<T>` abstract class. It provides five standard **terminal methods** that work identically across nearly every namespace, plus per-entity accessor methods and filters layered on top.

```typescript
abstract class QueryBase<T extends { id: string; name: string }> {
  constructor(protected readonly data: T[])

  get(): T[]
  first(): T | undefined
  find(id: string): T | undefined
  findByName(name: string): T | undefined
  count(): number
}
```

The generic constraint `{ id: string; name: string }` means every item has at least an `id` and `name` field, which is what makes `find()` and `findByName()` work universally.

---

## Terminal methods

Terminal methods end a query chain and return results. They are the same on every query builder that extends `QueryBase`.

### `get(): T[]`

Returns all matching results as an array. This is the most common terminal method.

```typescript
import { home } from 'clash-of-clans-data'

const allDefenses = home().defenses().get()
const splashDefenses = home().defenses().byDamageType('splash').get()
```

### `first(): T | undefined`

Returns the first result, or `undefined` if the query is empty. Every per-entity accessor (`.cannon()`, `.barbarian()`, and so on) narrows the query to a single item, so `.first()` is how you unwrap it.

```typescript
import { home } from 'clash-of-clans-data'

const cannon = home().defenses().cannon().first()!
console.log(cannon.name) // "Cannon"
```

### `find(id: string): T | undefined`

Finds an item by its exact `id` field. Returns `undefined` if no item matches.

```typescript
import { home } from 'clash-of-clans-data'

const byId = home().troops().find('barbarian')
```

### `findByName(name: string): T | undefined`

Finds an item by name using a case-insensitive exact match. Returns `undefined` if no item matches.

```typescript
import { home } from 'clash-of-clans-data'

const dragon = home().troops().findByName('dragon') // matches "Dragon"
```

### `count(): number`

Returns the number of results without needing to materialize and measure the full array.

```typescript
import { home } from 'clash-of-clans-data'

const th12DefenseCount = home().defenses().byTownHall(12).count()
```

---

## Immutable chaining

Every filter and per-entity accessor method returns a **new instance** of that query builder. The original is never modified, so you can safely branch from any point in a chain.

```typescript
import { home } from 'clash-of-clans-data'

const th14 = home().defenses().byTownHall(14)

// These two queries are completely independent
const splash = th14.byDamageType('splash').get()
const gearedUp = th14.hasGearUp().get()

// The original `th14` query is unchanged
const allTh14 = th14.get()
```

---

## Per-entity accessor methods

Alongside filters, every namespace exposes one method per named entity it contains: `home().defenses().cannon()`, `home().troops().dragon()`, `builder().heroes().battleMachine()`, and so on. These narrow the query to a single item, matching the entity names listed on each category's own docs page:

```typescript
import { home, builder } from 'clash-of-clans-data'

const cannon = home().defenses().cannon().first()!
const battleMachine = builder().heroes().battleMachine().first()!
```

---

## Putting it all together

Here is a complete example that demonstrates factory functions, namespaces, chaining, and terminal methods:

```typescript
import { home, clanCapital, clan } from 'clash-of-clans-data'

// Home Village
const th12Defenses = home().defenses().byTownHall(12)
const splashCount = th12Defenses.byDamageType('splash').count()
const topDefense = th12Defenses.first()

// Clan Capital
const superBarbarian = clanCapital().troops().superBarbarian().first()!

// Clan
const level10 = clan().levels().atLevel(10)!

console.log(`TH12 has ${splashCount} splash-damage defenses`)
console.log(`First TH12 defense: ${topDefense?.name}`)
console.log(`Super Barbarian housing space: ${superBarbarian.housingSpace}`)
console.log(
  `Clan level 10 donation bonus: +${level10.perks.donationUpgradeLevels} levels`,
)
```

---

## Next steps

- See the [query builder](/docs/query-builder) page for filter and lookup patterns
- Learn about [TypeScript integration](/docs/typescript) for typed exports and generics
- Explore the [Home Village overview](/docs/home-village) to see the full namespace list
