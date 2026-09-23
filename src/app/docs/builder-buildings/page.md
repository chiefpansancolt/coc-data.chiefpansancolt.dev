---
title: Builder Base Buildings & Leagues
nextjs:
  metadata:
    title: clash-of-clans-data - Builder Base Buildings & Leagues
    description: Query Builder Base resource buildings, army buildings, the Builder Hall, and Builder Base league tiers.
---

Support buildings, the Builder Hall, and the 42 Builder Base league tiers that track trophy progress. {% .lead %}

---

## Resource buildings

`builder().resourceBuildings()` returns a `BuilderBaseResourceBuildings` query over all 6 resource buildings.

### Entities (6)

`goldMine` · `elixirCollector` · `goldStorage` · `elixirStorage` · `gemMine` · `bobControl`

### Filters

| Method          | Signature                      | Description                          |
| --------------- | ------------------------------ | ------------------------------------ |
| `byBuilderHall` | `byBuilderHall(level: number)` | Filter by Builder Hall availability. |

---

## Army buildings

`builder().armyBuildings()` returns a `BuilderBaseArmyBuildings` query. `armyCamp()` and `reinforcementCamp()` return their own dedicated query classes.

```typescript
import { builder } from 'clash-of-clans-data'

const starLab = builder().armyBuildings().starLaboratory().first()!
const armyCamp = builder().armyBuildings().armyCamp().first()!
```

### Entities

`builderBarracks` · `armyCamp` · `starLaboratory` · `battleMachineAltar` · `battleCopterAltar` · `reinforcementCamp` · `healingHut`

### Filters

| Method          | Signature                      | Description                          |
| --------------- | ------------------------------ | ------------------------------------ |
| `byBuilderHall` | `byBuilderHall(level: number)` | Filter by Builder Hall availability. |

---

## Other buildings

`builder().otherBuildings()` returns a `BuilderBaseOtherBuildings` query over the Clock Tower.

```typescript
import { builder } from 'clash-of-clans-data'

const clockTower = builder().otherBuildings().clockTower().first()!
```

The Clock Tower's boost math lives in [`calculators().clockTower()`](/docs/calculators): this namespace returns the building data (build cost, hitpoints), not the boost calculations.

---

## Builder Hall

`builder().builderHall()` returns a `BuilderBaseBuilderHall` query over Builder Hall level data.

```typescript
import { builder } from 'clash-of-clans-data'

const builderHall = builder().builderHall().first()!
const bh9 = builderHall.levels.find((l) => l.level === 9)
```

---

## Leagues

`builder().leagues()` returns a `BuilderBaseLeagues` query over all 42 Builder Base league tiers, from Wood V through Diamond, with trophy ranges, battle result rewards (0–6 stars), and star bonus data.

```typescript
import { builder } from 'clash-of-clans-data'

const goldLeagues = builder().leagues().byGroup('gold').get()
const current = builder().leagues().atTrophies(2400)
```

### Filters / lookups

| Method       | Signature                                | Description                                                |
| ------------ | ---------------------------------------- | ---------------------------------------------------------- |
| `byGroup`    | `byGroup(group: BuilderBaseLeagueGroup)` | Filter to leagues in a group (e.g. `'gold'`, `'crystal'`). |
| `byName`     | `byName(query: string)`                  | Filter by league name (partial match).                     |
| `atTrophies` | `atTrophies(trophies: number)`           | Return the single league tier for a given trophy count.    |

---

## Next steps

- [Defenses & traps](/docs/builder-defenses): what these buildings protect
- [Troops & heroes](/docs/builder-troops): what the Builder Barracks and hero altars produce
- [Calculators](/docs/calculators): Clock Tower boost math that pairs with `otherBuildings().clockTower()`
