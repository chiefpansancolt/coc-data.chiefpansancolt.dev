---
title: Home Village Troops, Spells & Siege Machines
nextjs:
  metadata:
    title: clash-of-clans-data - Home Village Troops, Spells & Siege Machines
    description: Query Home Village troops, spells, and siege machines by Town Hall level, type, and more.
---

Everything trained in the Barracks and Dark Barracks, brewed in the Spell Factories, and built in the Workshop. {% .lead %}

---

## Troops

`home().troops()` returns a `HomeVillageTroops` query over every regular and dark troop.

```typescript
import { home } from 'clash-of-clans-data'

const dragon = home().troops().dragon().first()!
console.log(dragon.housingSpace)
console.log(dragon.levels.length)
```

### Entities (32)

`barbarian` · `archer` · `goblin` · `giant` · `wallBreaker` · `balloon` · `wizard` · `healer` · `dragon` · `pekka` · `babyDragon` · `minion` · `hogRider` · `valkyrie` · `golem` · `witch` · `lavaHound` · `bowler` · `dragonRider` · `electroDragon` · `miner` · `iceGolem` · `headhunter` · `yeti` · `apprenticeWarden` · `rootRider` · `electroTitan` · `furnace` · `thrower` · `druid` · `meteorGolem` · `ruinWitch`

### Filters

| Method           | Signature                           | Description                                                                   |
| ---------------- | ----------------------------------- | ----------------------------------------------------------------------------- |
| `byType`         | `byType(type: 'regular' \| 'dark')` | Filter to troops trained with Elixir (`'regular'`) or Dark Elixir (`'dark'`). |
| `byTownHall`     | `byTownHall(level: number)`         | Filter by Town Hall availability.                                             |
| `withSuperTroop` | `withSuperTroop()`                  | Filter to troops that have a corresponding Super Troop.                       |

### Type shape

```typescript
interface HomeTroop {
  id: string
  name: string
  housingSpace: number
  movementSpeed: number
  attackSpeed: number
  levels: HomeTroopLevel[]
}

interface HomeTroopLevel {
  level: number
  hitpoints: number
  townHallRequired: number
  laboratoryRequired: number
  researchCost: number
  researchCostResource: ResourceType
  researchTime: BuildTime
  stats: {
    normal: HomeTroopLevelStats
    enraged?: HomeTroopLevelStats /* ... */
  }
  images: { normal: string }
}
```

### Examples

```typescript
import { home } from 'clash-of-clans-data'

// All Dark Elixir troops available at TH14
const th14Dark = home().troops().byType('dark').byTownHall(14).get()

// Troops that have a Super Troop variant
const boostable = home().troops().withSuperTroop().get()
```

---

## Spells

`home().spells()` returns a `HomeVillageSpells` query over every regular and dark spell.

### Entities (18)

`lightningSpell` · `healingSpell` · `rageSpell` · `freezeSpell` · `earthquakeSpell` · `hasteSpell` · `cloneSpell` · `invisibilitySpell` · `batSpell` · `skeletonSpell` · `poisonSpell` · `iceBlockSpell` · `overgrowthSpell` · `jumpSpell` · `recallSpell` · `reviveSpell` · `totemSpell` · `angrySpell`

### Filters

| Method       | Signature                           | Description                                                                  |
| ------------ | ----------------------------------- | ---------------------------------------------------------------------------- |
| `byType`     | `byType(type: 'regular' \| 'dark')` | Filter to spells brewed with Elixir (`'regular'`) or Dark Elixir (`'dark'`). |
| `byTownHall` | `byTownHall(level: number)`         | Filter by Town Hall availability.                                            |

### Examples

```typescript
import { home } from 'clash-of-clans-data'

const darkSpells = home().spells().byType('dark').get()
const th12Spells = home().spells().byTownHall(12).get()
const rage = home().spells().rageSpell().first()!
```

---

## Siege machines

`home().siegeMachines()` returns a `HomeVillageSiegeMachines` query over every Workshop-built siege machine.

### Entities (9)

`wallWrecker` · `battleBlimp` · `stoneSlammer` · `siegeBarracks` · `logLauncher` · `flameFlinger` · `battleDrill` · `troopLauncher` · `skyWagon`

### Filters

| Method       | Signature                   | Description                           |
| ------------ | --------------------------- | ------------------------------------- |
| `byWorkshop` | `byWorkshop(level: number)` | Filter by Workshop level requirement. |
| `byTownHall` | `byTownHall(level: number)` | Filter by Town Hall availability.     |

### Examples

```typescript
import { home } from 'clash-of-clans-data'

const wallWrecker = home().siegeMachines().wallWrecker().first()!
const th15Siege = home().siegeMachines().byTownHall(15).get()
```

---

## Next steps

- [Defenses & traps](/docs/home-defenses): the defenses these troops attack
- [Heroes, equipment & pets](/docs/home-heroes): the heroes that lead the charge
- [Buildings](/docs/home-buildings): the Barracks, Laboratory, and other army buildings that produce these units
