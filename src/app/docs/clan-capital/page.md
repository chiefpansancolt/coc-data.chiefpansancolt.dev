---
title: Clan Capital
nextjs:
  metadata:
    title: clash-of-clans-data - Clan Capital
    description: Overview of the clanCapital() namespace, covering every Clan Capital category from defenses to the Forge.
---

The `clanCapital()` factory function is the entry point for every piece of Clan Capital data: defenses, Raid Weekend troops, districts, and the Forge. {% .lead %}

---

## Namespaces

`clanCapital()` returns a `ClanCapital` object with one method per category:

```typescript
import { clanCapital } from 'clash-of-clans-data'

clanCapital().defenses() // ClanCapitalDefenses
clanCapital().traps() // ClanCapitalTraps
clanCapital().walls() // ClanCapitalWalls
clanCapital().troops() // ClanCapitalTroops
clanCapital().spells() // ClanCapitalSpells
clanCapital().armyBuildings() // ClanCapitalArmyBuildings
clanCapital().other() // ClanCapitalOther
clanCapital().capitalHall() // ClanCapitalCapitalHall
clanCapital().districtHall() // ClanCapitalDistrictHall
clanCapital().leagues() // ClanCapitalLeagues
clanCapital().forge() // ClanCapitalForge
```

| Namespace         | Category page                                  | Content                                                              |
| ----------------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| `defenses()`      | [Defenses & traps](/docs/capital-defenses)     | 21 district defenses                                                 |
| `traps()`         | [Defenses & traps](/docs/capital-defenses)     | 5 traps (Mine, Mega Mine, Log Trap, Zap Trap, Spear Trap)            |
| `walls()`         | [Defenses & traps](/docs/capital-defenses)     | Wall tiers per Capital/District Hall level                           |
| `troops()`        | [Troops & spells](/docs/capital-troops)        | 17 Raid Weekend troops                                               |
| `spells()`        | [Troops & spells](/docs/capital-troops)        | 7 Raid Weekend spells                                                |
| `armyBuildings()` | [Buildings & leagues](/docs/capital-buildings) | Army Camp, Spell Storage, Barracks, and Spell Factories per district |
| `other()`         | [Buildings & leagues](/docs/capital-buildings) | District houses/decorations                                          |
| `capitalHall()`   | [Buildings & leagues](/docs/capital-buildings) | Capital Hall level data                                              |
| `districtHall()`  | [Buildings & leagues](/docs/capital-buildings) | District Hall level data                                             |
| `leagues()`       | [Buildings & leagues](/docs/capital-buildings) | Clan Capital league tiers with trophy ranges                         |
| `forge()`         | [Buildings & leagues](/docs/capital-buildings) | Daily Forge, Auto-Forge, and forge crafting rates                    |

---

## Quick start

```typescript
import { clanCapital } from 'clash-of-clans-data'

const superBarbarian = clanCapital().troops().superBarbarian().first()!
const dh5Defenses = clanCapital().defenses().byCapitalHall(5).get()
const airDefenses = clanCapital().defenses().byTargetType('air').get()
```

---

## Level-count totals

`clanCapital()` exposes a helper that totals structure, wall, troop, and spell levels across the Capital Peak and every unlocked district, for a given Capital Hall level:

```typescript
import { clanCapital } from 'clash-of-clans-data'

const counts = clanCapital().levelCountAtClanCapital(6)

console.log(counts.capitalPeak.total)
console.log(counts.barbarianCamp.total)
console.log(counts.wizardValley.total)
console.log(counts.troops)
console.log(counts.spells)
console.log(counts.total)
```

---

## Next steps

- [Defenses & traps](/docs/capital-defenses): the full Clan Capital defense, trap, and wall list
- [Troops & spells](/docs/capital-troops): every Raid Weekend unit
- [Buildings & leagues](/docs/capital-buildings): district buildings, halls, leagues, and the Forge
