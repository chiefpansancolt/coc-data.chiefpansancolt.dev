---
title: Calculators
nextjs:
  metadata:
    title: clash-of-clans-data - Calculators
    description: Gem cost, boost, potion, Clock Tower, and Helper Hut calculators built on the same BuildTime type as the rest of the package.
---

The `calculators()` namespace turns raw build/research time into gem cost, applies boosts and potions, and runs Helper Hut and Forge-adjacent math: all built on the shared `BuildTime` type. {% .lead %}

---

## Namespaces

```typescript
import { calculators } from 'clash-of-clans-data'

calculators().boost() // BuildBoostCalculator
calculators().gems() // GemsCalculator
calculators().helpers() // HelpersCalculator
calculators().potions() // PotionsCalculator
calculators().clockTower() // ClockTowerCalculator
```

Every calculator reads and returns a `BuildTime`:

```typescript
interface BuildTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}
```

---

## Gems

`calculators().gems()` converts a remaining build or research time into its gem cost to finish instantly, using the game's tiered scale.

```typescript
import { calculators } from 'clash-of-clans-data'

const remaining = { days: 1, hours: 0, minutes: 0, seconds: 0 }
const gemCost = calculators().gems().cost(remaining)
```

| Method | Signature                       | Description                                            |
| ------ | ------------------------------- | ------------------------------------------------------ |
| `cost` | `cost(time: BuildTime): number` | Gem cost to instantly finish the given remaining time. |

---

## Boost

`calculators().boost()` applies Builder Boost / Research Boost tiers (10%, 15%, or 20%) to either a remaining time or a resource cost.

```typescript
import { calculators, type BuildCostResource } from 'clash-of-clans-data'

const remaining = { days: 5, hours: 12, minutes: 0, seconds: 0 }
const boosted = calculators().boost().builderBoost(remaining, 20)

const cost = 5_000_000
const reducedCost = calculators().boost().builderBoostCost(cost, 'Gold', 20)
```

| Method              | Signature                                                                    | Description                                              |
| ------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------- |
| `builderBoost`      | `builderBoost(time: BuildTime, tier: BoostTier): BuildTime`                  | Reduce a build time by the tier percentage.              |
| `researchBoost`     | `researchBoost(time: BuildTime, tier: BoostTier): BuildTime`                 | Reduce a research time by the tier percentage.           |
| `builderBoostCost`  | `builderBoostCost(cost: number, resource: BuildCostResource, tier): number`  | Reduce a build cost by the tier percentage (floored).    |
| `researchBoostCost` | `researchBoostCost(cost: number, resource: BuildCostResource, tier): number` | Reduce a research cost by the tier percentage (floored). |

`BoostTier` is `10 | 15 | 20`. `BuildCostResource` is `'Gold' | 'Elixir' | 'Dark Elixir'`.

---

## Potions & snacks

`calculators().potions()` applies the fixed time reduction from each time-boosting potion or snack.

```typescript
import { calculators } from 'clash-of-clans-data'

const remaining = { days: 0, hours: 24, minutes: 0, seconds: 0 }
const afterBuilderPotion = calculators().potions().builderPotion(remaining)
```

| Method           | Reduces remaining time by |
| ---------------- | ------------------------- |
| `builderPotion`  | 10 hours                  |
| `researchPotion` | 24 hours                  |
| `petPotion`      | 24 hours                  |
| `builderBite`    | 2 hours                   |
| `studySoup`      | 4 hours                   |

---

## Clock Tower

`calculators().clockTower()` calculates time saved from a Clock Tower activation or a Clock Tower Potion, at a given Clock Tower level.

```typescript
import { calculators, type ClockTowerLevel } from 'clash-of-clans-data'

const remaining = { days: 1, hours: 0, minutes: 0, seconds: 0 }
const afterBoost = calculators().clockTower().boost(remaining, 8)
const afterPotion = calculators().clockTower().potion(remaining, 8)
```

| Method   | Signature                                                    | Description                                                                           |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `boost`  | `boost(time: BuildTime, level: ClockTowerLevel): BuildTime`  | Apply one full Clock Tower activation at the given level. Clamped to zero.            |
| `potion` | `potion(time: BuildTime, level: ClockTowerLevel): BuildTime` | Apply a Clock Tower Potion's fixed 30-minute run at the given level. Clamped to zero. |

`ClockTowerLevel` is `1 | 2 | ... | 10`. See [Builder Base buildings & leagues](/docs/builder-buildings) for the Clock Tower building data these calculations pair with.

---

## Helper Hut helpers

`calculators().helpers()` runs the math for each of the four Helper Hut assistants: see [Home Village buildings](/docs/home-buildings) for their building data.

```typescript
import { calculators } from 'clash-of-clans-data'

const helpers = calculators().helpers()

helpers.labAssistant(remainingResearch, 6) // BuildTime
helpers.buildersApprentice(remainingBuild, 4) // BuildTime
helpers.alchemist(1_000_000, 5) // AlchemistResult
helpers.prospector(1) // ProspectorResult
```

| Method               | Description                                                                         |
| -------------------- | ----------------------------------------------------------------------------------- |
| `labAssistant`       | Reduces remaining research time by the assistant's work rate at the given level.    |
| `buildersApprentice` | Reduces remaining build time by the apprentice's work rate at the given level.      |
| `alchemist`          | Converts Gold or Elixir to Dark Elixir (150:1) plus a level-based bonus percentage. |
| `prospector`         | Returns the maximum daily ore conversion amounts at the given level.                |

```typescript
interface AlchemistResult {
  input: number
  base: number
  bonus: number
  total: number
}

interface ProspectorResult {
  shinyOre: number
  glowyOre: number
  starryOre: number
}
```

---

## Next steps

- [Home Village buildings](/docs/home-buildings): the Helper Hut buildings behind `calculators().helpers()`
- [Builder Base buildings & leagues](/docs/builder-buildings): the Clock Tower building
- [Magic items](/docs/magic-items): items with the same time-reduction effects as these calculators
