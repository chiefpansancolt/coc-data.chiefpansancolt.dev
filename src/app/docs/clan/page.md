---
title: Clan Data
nextjs:
  metadata:
    title: clash-of-clans-data - Clan Data
    description: Query clan level progression, clan labels, and clan war loot, bonus, and ore data.
---

Clan-level data that lives outside any single base: level progression, labels, and war rewards. {% .lead %}

---

## Clan levels

`clan().levels()` returns a `ClanLevels` query over all 20 clan levels, including XP requirements and unlocked perks.

```typescript
import { clan } from 'clash-of-clans-data'

const level10 = clan().levels().atLevel(10)!
console.log(level10.perks.donationUpgradeLevels) // 2
console.log(level10.perks.treasuryExtraStorage) // percentage

const goldLevels = clan().levels().byBadge('gold').get()
```

### Methods

| Method    | Signature                   | Description                                       |
| --------- | --------------------------- | ------------------------------------------------- |
| `get`     | `get()`                     | Return all 20 clan levels.                        |
| `count`   | `count()`                   | Return the number of clan levels.                 |
| `atLevel` | `atLevel(level: number)`    | Return the entry for a specific clan level.       |
| `byBadge` | `byBadge(badge: ClanBadge)` | Filter to levels that display a given badge tier. |

### Type shape

```typescript
interface ClanLevel {
  level: number
  xpRequired: number | null
  cumulativeXp: number | null
  badge: ClanBadge
  image: string
  perks: ClanLevelPerks
}

interface ClanLevelPerks {
  donationLimit: { troops: number; spells: number; siegeMachines: number }
  donationUpgradeLevels: number
  treasuryExtraStorage: number
  warBonusExtraLoot: number
}

type ClanBadge =
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'crystal'
  | 'master'
  | 'champion'
  | 'titan'
  | 'legend'
```

---

## Clan labels

`clan().labels()` returns a `ClanLabels` query over all 17 searchable clan labels.

```typescript
import { clan } from 'clash-of-clans-data'

const warLabel = clan().labels().findByName('clan wars')
```

Extends the shared [`QueryBase`](/docs/core-concepts) terminal methods, plus `byId(id: string)` for an exact ID lookup.

---

## Clan war

`clan().war()` returns a `ClanWar` object with max base loot, war bonus tiers, and max base ore.

```typescript
import { clan } from 'clash-of-clans-data'

const war = clan().war()

war.maxWarBaseLoot() // WarBaseLootEntry[]: TH3–18
war.warBonus() // WarBonusTier[]: 5 clan-level tiers
war.bonusTierForClanLevel(7) // WarBonusTier for a given clan level
war.maxWarBaseOre() // WarBaseOreEntry[]: TH8–18
```

### Methods

| Method                  | Returns                     | Description                                                        |
| ----------------------- | --------------------------- | ------------------------------------------------------------------ |
| `maxWarBaseLoot`        | `WarBaseLootEntry[]`        | Maximum available loot in an enemy war base, indexed by Town Hall. |
| `maxWarBaseOre`         | `WarBaseOreEntry[]`         | Maximum available ore in an enemy war base, indexed by Town Hall.  |
| `warBonus`              | `WarBonusTier[]`            | War bonus tiers, grouped by clan level range.                      |
| `bonusTierForClanLevel` | `WarBonusTier \| undefined` | The war bonus tier that applies to a given clan level.             |

### Type shape

```typescript
interface WarBaseLootEntry {
  townHallLevel: number
  goldAndElixir: number
  darkElixir: number
}

interface WarBonusTier {
  clanLevelRange: string // e.g. "1-2", "9+"
  label: string
  minClanLevel: number
  maxClanLevel?: number
  byTownHall: WarBonusByTownHall[]
}

interface WarBaseOreEntry {
  townHallLevel: number | string // string "16-18" for the grouped top tier
  shinyOre: number
  glowyOre: number
  starryOre: number | null
}
```

### Examples

```typescript
import { clan } from 'clash-of-clans-data'

// War bonus for a level 7 clan against each Town Hall
const tier = clan().war().bonusTierForClanLevel(7)!
tier.byTownHall.forEach((entry) => {
  console.log(
    `TH${entry.townHallLevel}: ${entry.victory.goldAndElixir} Gold/Elixir`,
  )
})

// Max ore available from a TH16 war base
const th16Ore = clan()
  .war()
  .maxWarBaseOre()
  .find((e) => e.townHallLevel === 16)
```

---

## Next steps

- [Calculators](/docs/calculators): gem, boost, and helper math that pairs with clan progression
- [Season pass, ranked battles & achievements](/docs/extras): other progression systems outside a single base
