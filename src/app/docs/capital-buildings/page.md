---
title: Clan Capital Buildings & Leagues
nextjs:
  metadata:
    title: clash-of-clans-data - Clan Capital Buildings & Leagues
    description: Query Clan Capital army buildings, houses, halls, leagues, and the Forge.
---

District support buildings, decorative houses, the Capital/District Halls, Clan Capital league tiers, and the Forge. {% .lead %}

---

## Army buildings

`clanCapital().armyBuildings()` returns a `ClanCapitalArmyBuildings` query. `barracks()` and `spellFactories()` return their own dedicated query classes, since each district's Barracks trains a specific troop and each Spell Factory brews a specific spell.

```typescript
import { clanCapital } from 'clash-of-clans-data'

const armyCamp = clanCapital().armyBuildings().armyCamp().first()!
const barracks = clanCapital().armyBuildings().barracks()
```

### Entities

`armyCamp` · `spellStorage` · `barracks()`: per-troop barracks (e.g. Super Barbarian Barracks, Raid Cart Barracks) · `spellFactories()`: per-spell factories (e.g. Rage Spell Factory, Frost Spell Factory)

### Filters

| Method       | Signature                      | Description                                     |
| ------------ | ------------------------------ | ----------------------------------------------- |
| `byDistrict` | `byDistrict(district: string)` | Filter to buildings placed in a given district. |

---

## Other (houses)

`clanCapital().other().houses()` returns a `ClanCapitalHouses` query over the decorative houses found in each district.

### Entities (9)

`smallCabin` · `thatchedHut` · `smallHut` · `woodenHouse` · `woodenCabin` · `slantedHouse` · `goblinOutpost` · `goblinHut` · `goblinHall`

### Filters

| Method       | Signature                      | Description                                  |
| ------------ | ------------------------------ | -------------------------------------------- |
| `byDistrict` | `byDistrict(district: string)` | Filter to houses placed in a given district. |

---

## Capital Hall & District Hall

```typescript
import { clanCapital } from 'clash-of-clans-data'

const capitalHall = clanCapital().capitalHall().first()!
const districtHall = clanCapital().districtHall().first()!
```

`capitalHall()` returns Capital Hall level data (unlocks districts 1 through 9). `districtHall()` returns District Hall level data (unlocks buildings within a single district).

---

## Leagues

`clanCapital().leagues()` returns a `ClanCapitalLeagues` query over the Clan Capital's Raid Weekend league tiers.

```typescript
import { clanCapital } from 'clash-of-clans-data'

const goldLeagues = clanCapital().leagues().byGroup('gold').get()
const current = clanCapital().leagues().atTrophies(15000)
```

### Filters / lookups

| Method       | Signature                                | Description                                             |
| ------------ | ---------------------------------------- | ------------------------------------------------------- |
| `byGroup`    | `byGroup(group: ClanCapitalLeagueGroup)` | Filter to leagues in a group.                           |
| `atTrophies` | `atTrophies(trophies: number)`           | Return the single league tier for a given trophy count. |

---

## Forge

`clanCapital().forge()` returns a `ClanCapitalForge` object covering the Daily Forge, Auto-Forge, and crafting rates used to turn Raid Medals and ore into equipment.

```typescript
import { clanCapital } from 'clash-of-clans-data'

const forge = clanCapital().forge()

forge.dailyForge() // ClanCapitalDailyForgeEntry[]
forge.dailyForgeAtTownHall(14) // entry for a specific Town Hall level
forge.craftingTime() // BuildTime for a single craft
forge.availableForges() // ClanCapitalAvailableForgeEntry[]
forge.availableForgesAtTownHall(14) // number of forge slots unlocked
forge.autoForge() // ClanCapitalForgeRates
forge.autoForgeAtTownHall(14) // ClanCapitalHomeForgeEntry
forge.autoForgeAtBuilderHall(9) // ClanCapitalBuilderForgeEntry
forge.forgeRates() // ClanCapitalForgeRates
forge.forgeAtTownHall(14) // ClanCapitalHomeForgeEntry
forge.forgeAtBuilderHall(9) // ClanCapitalBuilderForgeEntry
```

---

## Next steps

- [Defenses & traps](/docs/capital-defenses): what these buildings protect
- [Troops & spells](/docs/capital-troops): what the Barracks and Spell Factories produce
- [Magic items](/docs/magic-items): where forged equipment and hammers fit alongside the Forge
