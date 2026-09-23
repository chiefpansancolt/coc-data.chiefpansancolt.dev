---
title: Season Pass, Ranked Battles & Achievements
nextjs:
  metadata:
    title: clash-of-clans-data - Season Pass, Ranked Battles & Achievements
    description: Query Season Pass challenge types, ranked battle leagues and loot, and in-game achievements.
---

Three progression systems that sit outside any single base: Season Pass challenges, Ranked Battles leagues, and achievements. {% .lead %}

---

## Season Pass

`seasonPass().challenges()` returns a `SeasonPassChallenges` query over every challenge task type that can appear in a season's Season Pass.

```typescript
import { seasonPass } from 'clash-of-clans-data'

const buildingChallenges = seasonPass().challenges().buildingUpgrade().get()
```

### Entities

`buildingUpgrade` · `troopUpgrade` · `heroPetUpgrade` · `donateReinforcements` · `starBonus` · `winBattle` · `destroyTownHall` · `requestReinforcements`

### Type shape

```typescript
interface SeasonPassChallenge {
  id: string
  name: string
  notes: string[]
  image: string
}
```

---

## Ranked Battles

`rankedBattles()` returns a `RankedBattles` object covering league data, loot, and the difficulty modifiers applied at higher ranks.

```typescript
import { rankedBattles } from 'clash-of-clans-data'

const rb = rankedBattles()

rb.leagues() // RankedBattlesLeagues: full league list
rb.leagueFloor() // LeagueFloorEntry[]: minimum league per Town Hall
rb.floorForTownHall(14) // LeagueFloorEntry for a specific Town Hall
rb.difficultyModifiers() // DifficultyModifier[]: Expert/Master/Legend bonuses
rb.loot(14) // RankedBattleLootEntry[]: loot for every league at TH14
rb.lowerThBonuses() // LowerThBonus[]: bonuses for TH2–6, which can't rank
```

### Leagues

`rankedBattles().leagues()` returns a `RankedBattlesLeagues` query over every league, from Unranked through Legend.

```typescript
import { rankedBattles } from 'clash-of-clans-data'

const electroLeagues = rankedBattles().leagues().byGroup('Electro').get()
const skeleton1 = rankedBattles().leagues().byName('Skeleton 1').first()
const withModifiers = rankedBattles().leagues().withDifficultyModifier().get()
```

| Method                   | Signature                     | Description                                                         |
| ------------------------ | ----------------------------- | ------------------------------------------------------------------- |
| `byGroup`                | `byGroup(group: LeagueGroup)` | Filter to leagues in a group (e.g. `'Electro'`, `'Legend'`).        |
| `byName`                 | `byName(query: string)`       | Filter by league name (partial match).                              |
| `withDifficultyModifier` | `withDifficultyModifier()`    | Filter to leagues with an Expert/Master/Legend difficulty modifier. |

### Type shape

```typescript
type LeagueGroup =
  | 'Unranked'
  | 'Skeleton'
  | 'Barbarian'
  | 'Archer'
  | 'Wizard'
  | 'Valkyrie'
  | 'Witch'
  | 'Golem'
  | 'PEKKA'
  | 'Titan'
  | 'Dragon'
  | 'Electro'
  | 'Legend'

interface RankedBattleLeague {
  id: string
  name: string
  leagueGroup: LeagueGroup
  leagueNumber: number | null
  image: string
  attacksPerWeek: number | null
  percentPromoted: number | null
  percentDemoted: number | null
}
```

### Examples

```typescript
import { rankedBattles } from 'clash-of-clans-data'

// Loot available to a TH14 attacker across every reachable league
const loot = rankedBattles()
  .loot(14)
  .filter((entry) => !entry.underfloor)

loot.forEach((entry) => {
  console.log(
    `${entry.leagueId}: ${entry.maxAvailableLoot.goldAndElixir} Gold/Elixir`,
  )
})

// Where a TH14 base's league floor sits
const floor = rankedBattles().floorForTownHall(14)!
console.log(floor.leagueId)
```

---

## Achievements

`achievements()` returns an `Achievements` query (extends [`QueryBase`](/docs/core-concepts)) over every in-game achievement.

```typescript
import { achievements } from 'clash-of-clans-data'

const homeAchievements = achievements().byBase('home').get()
const lootAchievements = achievements().byDataInvolved('Gold').get()
const multiTier = achievements().byTierCount(3).get()
```

### Filters

| Method           | Signature                         | Description                                                            |
| ---------------- | --------------------------------- | ---------------------------------------------------------------------- |
| `byBase`         | `byBase(base: AchievementBase)`   | Filter by base (`'home'`, `'builder'`, or `'clan-capital'`).           |
| `byDataInvolved` | `byDataInvolved(keyword: string)` | Filter by keyword in the tracked progress description (e.g. `"Gold"`). |
| `byTierCount`    | `byTierCount(count: number)`      | Filter to achievements with exactly this many tiers.                   |

### Type shape

```typescript
type AchievementBase = 'home' | 'builder' | 'clan-capital'

interface Achievement {
  id: string
  name: string
  base: AchievementBase
  dataInvolved: string
  tiers: AchievementTier[]
}

interface AchievementTier {
  tier: number
  requirement: number
  xpRewarded: number
  gemsRewarded: number
}
```

---

## Next steps

- [Clan data](/docs/clan): clan levels, labels, and war rewards
- [Calculators](/docs/calculators): resource and time math referenced by several achievements
- [TypeScript integration](/docs/typescript): full type reference for these three modules
