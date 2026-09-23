---
title: Home Village
nextjs:
  metadata:
    title: clash-of-clans-data - Home Village
    description: Overview of the home() namespace, covering every Home Village category from defenses to heroes to the Town Hall.
---

The `home()` factory function is the entry point for every piece of Home Village data: defenses, troops, spells, heroes, and the buildings that support them. {% .lead %}

---

## Namespaces

`home()` returns a `HomeVillage` object with one method per category:

```typescript
import { home } from 'clash-of-clans-data'

home().defenses() // HomeVillageDefenses
home().craftedDefenses() // HomeVillageCraftedDefenses
home().traps() // HomeVillageTraps
home().walls() // HomeVillageWalls
home().troops() // HomeVillageTroops
home().spells() // HomeVillageSpells
home().siegeMachines() // HomeVillageSiegeMachines
home().heroes() // HomeVillageHeroes
home().heroEquipment() // HomeVillageHeroEquipment
home().pets() // HomeVillagePets
home().guardians() // HomeVillageGuardians
home().resourceBuildings() // HomeVillageResourceBuildings
home().armyBuildings() // HomeVillageArmyBuildings
home().otherBuildings() // HomeVillageOtherBuildings
home().townHall() // HomeVillageTownHall
```

| Namespace             | Category page                                        | Content                                                         |
| --------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `defenses()`          | [Defenses & traps](/docs/home-defenses)              | 22 stationary defenses (Cannon, X-Bow, Inferno Tower, and more) |
| `craftedDefenses()`   | [Defenses & traps](/docs/home-defenses)              | 9 Crafting Station defenses built from modules                  |
| `traps()`             | [Defenses & traps](/docs/home-defenses)              | 8 traps (Bomb, Giant Bomb, Tornado Trap, and more)              |
| `walls()`             | [Defenses & traps](/docs/home-defenses)              | Wall tiers and hitpoints per level                              |
| `troops()`            | [Troops, spells & siege machines](/docs/home-troops) | 31 troops trained in the Barracks and Dark Barracks             |
| `spells()`            | [Troops, spells & siege machines](/docs/home-troops) | 17 spells brewed in the Spell Factory and Dark Spell Factory    |
| `siegeMachines()`     | [Troops, spells & siege machines](/docs/home-troops) | 8 siege machines built in the Workshop                          |
| `heroes()`            | [Heroes, equipment & pets](/docs/home-heroes)        | 6 heroes (Barbarian King, Archer Queen, Grand Warden, and more) |
| `heroEquipment()`     | [Heroes, equipment & pets](/docs/home-heroes)        | 37+ hero equipment items forged at the Blacksmith               |
| `pets()`              | [Heroes, equipment & pets](/docs/home-heroes)        | 12 pets raised in the Pet House                                 |
| `guardians()`         | [Heroes, equipment & pets](/docs/home-heroes)        | 2 Guardians unlocked via the Hero Hall                          |
| `resourceBuildings()` | [Buildings](/docs/home-buildings)                    | 7 resource buildings (mines, collectors, storages, Clan Castle) |
| `armyBuildings()`     | [Buildings](/docs/home-buildings)                    | 11 army buildings (Barracks, Laboratory, Hero Hall, and more)   |
| `otherBuildings()`    | [Buildings](/docs/home-buildings)                    | Bob's Hut, the Helper Hut, and the four Helper Hut assistants   |
| `townHall()`          | [Buildings](/docs/home-buildings)                    | Town Hall level data                                            |

---

## Quick start

```typescript
import { home } from 'clash-of-clans-data'

// Single building
const cannon = home().defenses().cannon().first()!
console.log(cannon.name) // "Cannon"
console.log(cannon.targetType) // "ground"
console.log(cannon.levels.length) // number of upgrade levels

// Category queries
const splashDefenses = home().defenses().byDamageType('splash').get()
const th12Defenses = home().defenses().byTownHall(12).get()
const gearedUp = home().defenses().hasGearUp().get()

// Single troop / hero
const dragon = home().troops().dragon().first()!
const barbarianKing = home().heroes().barbarianKing().first()!
```

---

## Level-count totals

`home()` also exposes a helper that totals every category's upgrade cost at a given Town Hall level: useful for progress calculators and "max base" tools:

```typescript
import { home } from 'clash-of-clans-data'

const counts = home().levelCountAtTownHall(12)

console.log(counts.structures) // defenses + army buildings + resource buildings
console.log(counts.traps)
console.log(counts.superCharge)
console.log(counts.lab) // troops + spells + siege machines
console.log(counts.heroes)
console.log(counts.guardians)
console.log(counts.equipment)
console.log(counts.pets)
console.log(counts.craftedDefenses)
console.log(counts.walls)
console.log(counts.total)
```

See [TypeScript integration](/docs/typescript) for the full `TownHallLevelCounts` shape.

---

## Next steps

- [Defenses & traps](/docs/home-defenses): the full defense, crafted defense, trap, and wall list
- [Troops, spells & siege machines](/docs/home-troops): every unit trained or brewed at Home Village
- [Heroes, equipment & pets](/docs/home-heroes): heroes, hero equipment, pets, and Guardians
- [Buildings](/docs/home-buildings): resource buildings, army buildings, other buildings, and the Town Hall
