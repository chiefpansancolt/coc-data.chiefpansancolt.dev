---
title: Home Village Defenses & Traps
nextjs:
  metadata:
    title: clash-of-clans-data - Home Village Defenses & Traps
    description: Query Home Village defenses, crafted defenses, traps, and walls by Town Hall level, damage type, and more.
---

Everything that defends a Home Village base: stationary defenses, the Crafting Station's modular defenses, traps, and walls. {% .lead %}

---

## Defenses

`home().defenses()` returns a `HomeVillageDefenses` query over all 22 stationary defenses.

```typescript
import { home } from 'clash-of-clans-data'

const cannon = home().defenses().cannon().first()!
console.log(cannon.targetType) // "ground" | "air" | "both"
console.log(cannon.modes.normal?.damageType) // "single" | "splash" | ...
```

### Entities (22)

`cannon` · `archerTower` · `mortar` · `airDefense` · `wizardTower` · `airSweeper` · `hiddenTesla` · `bombTower` · `xBow` · `infernoTower` · `eagleArtillery` · `scattershot` · `buildersHut` · `spellTower` · `monolith` · `multiArcherTower` · `multiGearTower` · `firespitter` · `superWizardTower` · `revengeTower` · `ricochetCannon` · `craftingStation`

### Filters

| Method         | Signature                                       | Description                                                                                                                                                                              |
| -------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `byBuilding`   | `byBuilding(name: string)`                      | Filter to a specific defense by name (case-insensitive).                                                                                                                                 |
| `byTownHall`   | `byTownHall(level: number)`                     | Filter to defenses with at least one level available at or before the given Town Hall.                                                                                                   |
| `byDamageType` | `byDamageType(type: DefenseMode['damageType'])` | Filter by the damage type of the normal mode (`'single'`, `'splash'`, `'multiple'`, `'chain'`, `'ricochet'`, `'none'`). Buildings without a normal mode (e.g. Spell Tower) are excluded. |
| `hasGearUp`    | `hasGearUp()`                                   | Filter to defenses that support the Gear Up upgrade.                                                                                                                                     |

### Type shape

```typescript
interface HomeDefense extends Building<HomeDefenseLevel> {
  targetType: 'ground' | 'air' | 'both'
  modes: {
    normal?: DefenseMode
    gearedUpBurst?: BurstDefenseMode
    // ...additional modes depending on the defense (fastAttack, stage1-3, etc.)
  }
  gearUp?: GearUp
  specialAbility?: string
  availablePerTownHall: TownHallAvailability[]
}

interface HomeDefenseLevel extends BuildingLevel {
  townHallRequired: number
  supercharge?: boolean
  deathDamage?: number
  unlocksSpell?: string
  stats: {
    normal: DefenseModeStats
    gearedUpBurst?: DefenseModeStats /* ... */
  }
  images: { normal: string; gearedUpBurst?: string /* ... */ }
}
```

`HomeDefenseLevel` carries one `images`/`stats` entry per visual mode the defense supports at that level: see [Image assets](/docs/images) for how geared-up and multi-stage defenses expose multiple image paths.

### Examples

```typescript
import { home } from 'clash-of-clans-data'

// All splash-damage defenses available at TH14
const th14Splash = home().defenses().byTownHall(14).byDamageType('splash').get()

// Defenses that support Gear Up
const gearedUp = home().defenses().hasGearUp().get()

// A single defense's max level
const inferno = home().defenses().infernoTower().first()!
const maxLevel = inferno.levels[inferno.levels.length - 1]
```

---

## Crafted defenses

`home().craftedDefenses()` returns a `HomeVillageCraftedDefenses` query over the Crafting Station's modular defenses. Each is built from up to three independently-upgradable modules rather than a single flat level track.

```typescript
import { home } from 'clash-of-clans-data'

const hookTower = home().craftedDefenses().hookTower().first()!
console.log(hookTower.modules.length) // 3
console.log(hookTower.craftingPhase) // current crafting phase
```

### Entities (12)

`roaster` · `lavaLauncher` · `crusherMortar` · `bombHive` · `hookTower` · `flameSpinner` · `lightBeam` · `airBombs` · `heroBell` · `hotCandle` · `heroHunter` · `cakeAPult`

### Filters

| Method         | Signature                   | Description                                                              |
| -------------- | --------------------------- | ------------------------------------------------------------------------ |
| `byTownHall`   | `byTownHall(level: number)` | Filter by Town Hall availability.                                        |
| `byPhase`      | `byPhase(phase: number)`    | Filter to defenses from a specific crafting phase.                       |
| `current`      | `current()`                 | Filter to defenses that are part of the currently active crafting phase. |
| `former`       | `former()`                  | Filter to defenses from earlier, now-retired crafting phases.            |
| `byTargetType` | `byTargetType(type)`        | Filter by `targetType` (`'ground'`, `'air'`, `'both'`).                  |

### Type shape

```typescript
interface CraftedDefense {
  id: string
  name: string
  craftingPhase: number
  isCurrent: boolean
  targetType: 'ground' | 'air' | 'both'
  stats?: Record<string, string | number>
  modules: [CraftedDefenseModule, CraftedDefenseModule, CraftedDefenseModule]
  images: CraftedDefenseImageEntry[]
}

interface CraftedDefenseModule {
  name: string
  controls: string
  upgrades: CraftedDefenseModuleUpgrade[]
}
```

---

## Traps

`home().traps()` returns a `HomeVillageTraps` query over all 8 traps.

### Entities (8)

`bomb` · `springTrap` · `airBomb` · `giantBomb` · `seekingAirMine` · `skeletonTrap` · `tornadoTrap` · `gigaBomb`

### Filters

| Method         | Signature                   | Description                                             |
| -------------- | --------------------------- | ------------------------------------------------------- |
| `byTrap`       | `byTrap(name: string)`      | Filter to a specific trap by name (case-insensitive).   |
| `byTownHall`   | `byTownHall(level: number)` | Filter by Town Hall availability.                       |
| `byTargetType` | `byTargetType(type)`        | Filter by `targetType` (`'ground'`, `'air'`, `'both'`). |

### Type shape

```typescript
interface HomeTrap {
  id: string
  name: string
  triggerRadius: number
  damageType: 'splash' | 'single'
  targetType: 'ground' | 'air' | 'both'
  levels: TrapLevel[]
  availablePerTownHall: TownHallAvailability[]
}

interface TrapLevel {
  level: number
  damage: number
  townHallRequired: number
  images: { normal: string; air?: string }
}
```

---

## Walls

`home().walls()` returns a `HomeVillageWalls` query. There is a single wall entity with per-tier levels.

```typescript
import { home } from 'clash-of-clans-data'

const wall = home().walls().wall().first()!
const th12Tier = wall.levels.find((l) => l.townHallRequired <= 12)
```

### Filters

| Method       | Signature                   | Description                                                         |
| ------------ | --------------------------- | ------------------------------------------------------------------- |
| `byTownHall` | `byTownHall(level: number)` | Filter to walls available (count > 0) at the given Town Hall level. |

### Type shape

```typescript
interface HomeWall {
  id: string
  name: string
  levels: WallLevel[]
  availablePerTownHall: TownHallAvailability[]
}

interface WallLevel {
  level: number
  hitpoints: number
  wallRings: number
  townHallRequired: number
  images: { normal: string }
}
```

---

## Next steps

- [Troops, spells & siege machines](/docs/home-troops): the units trained and brewed at Home Village
- [Heroes, equipment & pets](/docs/home-heroes): heroes, hero equipment, pets, and Guardians
- [Buildings](/docs/home-buildings): resource buildings, army buildings, and the Town Hall
