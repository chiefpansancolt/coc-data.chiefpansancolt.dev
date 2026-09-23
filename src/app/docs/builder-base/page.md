---
title: Builder Base
nextjs:
  metadata:
    title: clash-of-clans-data - Builder Base
    description: Overview of the builder() namespace, covering every Builder Base category from defenses to leagues.
---

The `builder()` factory function is the entry point for every piece of Builder Base data: defenses, troops, heroes, buildings, and league progression. {% .lead %}

---

## Namespaces

`builder()` returns a `BuilderBase` object with one method per category:

```typescript
import { builder } from 'clash-of-clans-data'

builder().defenses() // BuilderBaseDefenses
builder().traps() // BuilderBaseTraps
builder().walls() // BuilderBaseWalls
builder().troops() // BuilderBaseTroops
builder().heroes() // BuilderBaseHeroes
builder().resourceBuildings() // BuilderBaseResourceBuildings
builder().armyBuildings() // BuilderBaseArmyBuildings
builder().otherBuildings() // BuilderBaseOtherBuildings
builder().builderHall() // BuilderBaseBuilderHall
builder().leagues() // BuilderBaseLeagues
```

| Namespace             | Category page                                  | Content                                                                               |
| --------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| `defenses()`          | [Defenses & traps](/docs/builder-defenses)     | 15 stationary defenses                                                                |
| `traps()`             | [Defenses & traps](/docs/builder-defenses)     | 4 traps (Push Trap, Spring Trap, Mine, Mega Mine)                                     |
| `walls()`             | [Defenses & traps](/docs/builder-defenses)     | Wall tiers and hitpoints per level                                                    |
| `troops()`            | [Troops & heroes](/docs/builder-troops)        | 12 troops trained in the Builder Barracks                                             |
| `heroes()`            | [Troops & heroes](/docs/builder-troops)        | 2 heroes (Battle Machine, Battle Copter)                                              |
| `resourceBuildings()` | [Buildings & leagues](/docs/builder-buildings) | 6 resource buildings                                                                  |
| `armyBuildings()`     | [Buildings & leagues](/docs/builder-buildings) | Builder Barracks, Army Camp, Star Laboratory, hero altars, and the Reinforcement Camp |
| `otherBuildings()`    | [Buildings & leagues](/docs/builder-buildings) | The Clock Tower                                                                       |
| `builderHall()`       | [Buildings & leagues](/docs/builder-buildings) | Builder Hall level data                                                               |
| `leagues()`           | [Buildings & leagues](/docs/builder-buildings) | Builder Base league tiers with trophy ranges and star bonuses                         |

---

## Quick start

```typescript
import { builder } from 'clash-of-clans-data'

const cannon = builder().defenses().cannon().first()!
const battleMachine = builder().heroes().battleMachine().first()!
const bh9Defenses = builder().defenses().byBuilderHall(9).get()
```

---

## Level-count totals

`builder()` exposes a helper that totals every category's upgrade cost at a given Builder Hall level:

```typescript
import { builder } from 'clash-of-clans-data'

const counts = builder().levelCountAtBuilderHall(9)

console.log(counts.structures) // defenses + army buildings + resource buildings
console.log(counts.traps)
console.log(counts.starLab) // troop levels unlocked via Star Laboratory
console.log(counts.heroes)
console.log(counts.walls)
console.log(counts.total)
```

---

## Next steps

- [Defenses & traps](/docs/builder-defenses): the full Builder Base defense, trap, and wall list
- [Troops & heroes](/docs/builder-troops): every unit and hero available in the Builder Base
- [Buildings & leagues](/docs/builder-buildings): support buildings, the Builder Hall, and league progression
