---
title: TypeScript integration
nextjs:
  metadata:
    title: clash-of-clans-data - TypeScript integration
    description: Use the full TypeScript type system with typed exports, shared types, and generics across every base.
---

clash-of-clans-data ships with complete TypeScript declarations: every function, type, and interface is fully typed with no additional packages required. {% .lead %}

---

## Importing types

All types are exported from the main entry point. Use `import type` when you only need the type for annotations:

```typescript
import type {
  BuilderBaseLeague,
  BuilderDefense,
  BuilderTroop,
  ClanCapitalDefense,
  ClanCapitalTroop,
  ClanLabel,
  ClanLevel,
  HeroEquipment,
  HomeDefense,
  HomeDefenseLevel,
  HomeHero,
  HomePet,
  HomeSiegeMachine,
  HomeSpell,
  HomeTroop,
  WarBonusTier,
} from 'clash-of-clans-data'
```

You can also import types alongside runtime values:

```typescript
import { home, type HomeDefense } from 'clash-of-clans-data'

function summarize(defense: HomeDefense): string {
  return `${defense.name}: ${defense.levels.length} levels`
}

const cannon = home().defenses().cannon().first()!
console.log(summarize(cannon))
```

---

## Common shared types

Several types are shared across every base. These live in the common type module and are re-exported from the main package.

### `Base`

```typescript
type Base = 'home' | 'builder' | 'clan_capital'
```

Tags every `Building` with the base it belongs to.

### `Category`

```typescript
type Category =
  | 'defense'
  | 'crafted-defense'
  | 'wall'
  | 'trap'
  | 'troop'
  | 'spell'
  | 'resource'
  | 'army'
  | 'research'
  | 'guardian'
  | 'siege-machine'
  | 'pet'
  | 'hero'
  | 'hero-equipment'
  | 'town-hall'
  | 'other'
```

### `ResourceType`

```typescript
type ResourceType =
  | 'Gold'
  | 'Elixir'
  | 'Dark Elixir'
  | 'Gold or Elixir'
  | 'Builder Gold'
  | 'Builder Elixir'
  | 'Builder Gold or Builder Elixir'
  | 'Capital Gold'
  | 'Gems'
```

Used across build costs, upgrade costs, and donation costs.

### `BuildTime`

```typescript
interface BuildTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}
```

Represents any build, research, or upgrade duration: also the input/output type for every [calculator](/docs/calculators) function.

### `TownHallAvailability` / `BuilderHallAvailability` / `CapitalHallAvailability` / `DistrictHallAvailability`

```typescript
interface TownHallAvailability {
  townHallLevel: number
  count: number
  countAfterMerges?: number
}
```

Describes how many instances of a building are available at a given Town Hall (or Builder Hall / Capital Hall / District Hall) level. Found on the `availablePerTownHall`, `availablePerBuilderHall`, and similar fields on most buildings.

---

## The `Building<L>` base interface

Nearly every structure in the package (defenses, traps, walls, army buildings, resource buildings) extends a common `Building<L>` shape, generic over its own level type:

```typescript
interface BuildingLevel {
  level: number
  hitpoints: number
  buildCost: number
  buildCostResource: ResourceType
  buildTime: BuildTime
  xpGained: number
}

interface Building<L extends BuildingLevel = BuildingLevel> {
  id: string
  name: string
  description?: string
  base: Base
  category: Category
  size: string
  levels: L[]
}
```

Each base extends `BuildingLevel` with its own fields: for example `HomeDefenseLevel` adds `townHallRequired`, `supercharge?`, and per-mode `stats`/`images` objects, while `BuilderDefenseLevel` adds `builderHallRequired`.

---

## The `QueryBase<T>` generic

The `QueryBase<T>` class most query builders extend is generic over any type `T` with `id: string` and `name: string`. This means all terminal methods are fully typed:

```typescript
import { home } from 'clash-of-clans-data'

// home().defenses() returns HomeVillageDefenses extends QueryBase<HomeDefense>
const result = home().defenses().byTownHall(12).get() // HomeDefense[]
const first = home().defenses().first() // HomeDefense | undefined
const found = home().defenses().find('cannon') // HomeDefense | undefined
const byName = home().defenses().findByName('Cannon') // HomeDefense | undefined
const count = home().defenses().count() // number
```

---

## Typing function parameters

Use the exported types to write strongly-typed helper functions:

```typescript
import { home, type HomeDefense, type ResourceType } from 'clash-of-clans-data'

function totalBuildCost(
  defenses: HomeDefense[],
  resource: ResourceType,
): number {
  return defenses
    .flatMap((d) => d.levels)
    .filter((l) => l.buildCostResource === resource)
    .reduce((sum, l) => sum + l.buildCost, 0)
}

const cost = totalBuildCost(home().defenses().get(), 'Gold')
```

### Working with calculator results

```typescript
import { calculators, type BuildTime } from 'clash-of-clans-data'

const remaining: BuildTime = { days: 5, hours: 12, minutes: 0, seconds: 0 }
const boosted: BuildTime = calculators().boost().builderBoost(remaining, 20)
```

---

## Module-specific types

Each base exports its own entity and level types. A few commonly used ones:

| Base         | Key types                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| Home Village | `HomeDefense`, `HomeDefenseLevel`, `HomeTroop`, `HomeSpell`, `HomeHero`, `HomePet`, `HomeSiegeMachine`  |
| Builder Base | `BuilderDefense`, `BuilderTroop`, `BuilderHero`, `BuilderBaseLeague`                                    |
| Clan Capital | `ClanCapitalDefense`, `ClanCapitalTroop`, `BuilderHallAvailability`, `DistrictAvailability`             |
| Clan         | `ClanLevel`, `ClanLabel`, `WarBonusTier`, `WarBaseLootEntry`, `WarBaseOreEntry`                         |
| Calculators  | `BuildTime`, `BoostTier`, `ClockTowerLevel`, `BuildCostResource`                                        |
| Magic items  | `MagicItem`, `MagicItemEffect`, `MagicSnack`, `MagicPotion`, `MagicBook`, `MagicHammer`, `MagicUtility` |
| Common       | `Base`, `Category`, `ResourceType`, `BuildTime`, `DonationCost`                                         |

All types are importable from the main `'clash-of-clans-data'` entry point.

---

## Next steps

- See the [query builder](/docs/query-builder) page for type-safe filtering and lookup
- Explore [image assets](/docs/images) for the `images` field shape on each level
- Browse individual category pages for the full field reference of each entity type
