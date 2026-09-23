---
title: Clan Capital Defenses & Traps
nextjs:
  metadata:
    title: clash-of-clans-data - Clan Capital Defenses & Traps
    description: Query Clan Capital defenses, traps, and walls by district, Capital Hall level, and target type.
---

Everything that defends a Clan Capital district during Raid Weekend: defenses, traps, and walls. {% .lead %}

---

## Defenses

`clanCapital().defenses()` returns a `ClanCapitalDefenses` query over all 21 district defenses.

```typescript
import { clanCapital } from 'clash-of-clans-data'

const cannon = clanCapital().defenses().cannon().first()!
const dh5Defenses = clanCapital().defenses().byCapitalHall(5).get()
```

### Entities (21)

`cannon` · `spearThrower` · `airDefense` · `multiCannon` · `bombTower` · `multiMortar` · `airBombs` · `blastBow` · `raidCartPost` · `rapidRockets` · `crusher` · `giantCannon` · `goblinThrower` · `hiddenMegaTesla` · `infernoTower` · `miniMinionHive` · `superDragonPost` · `superGiantPost` · `superWizardTower` · `rocketArtillery` · `reflector`

### Filters

| Method          | Signature                                         | Description                          |
| --------------- | ------------------------------------------------- | ------------------------------------ |
| `byTargetType`  | `byTargetType(type: 'ground' \| 'air' \| 'both')` | Filter by target type.               |
| `byCapitalHall` | `byCapitalHall(level: number)`                    | Filter by Capital Hall availability. |

### Type shape

```typescript
interface ClanCapitalDefense extends Building<ClanCapitalDefenseLevel> {
  targetType: 'ground' | 'air' | 'both'
  modes: { normal: DefenseMode }
  defendingTroops?: Array<{ name: string; count: number }>
  availablePerCapitalHall?: CapitalHallAvailability[]
  availablePerDistrict: DistrictAvailability[]
}

interface ClanCapitalDefenseLevel extends BuildingLevel {
  capitalHallRequired?: number
  districtHallRequired: number
  deathDamage?: number
  troopLevel?: number
  stats: { normal: DefenseModeStats }
  images: { normal: string }
}
```

`availablePerDistrict` lists how many instances of the defense are placed in each of the 8 Clan Capital districts, indexed by that district's District Hall level.

---

## Traps

`clanCapital().traps()` returns a `ClanCapitalTraps` query over all 5 traps.

### Entities (5)

`mine` · `megaMine` · `logTrap` · `zapTrap` · `spearTrap`

### Filters

| Method         | Signature                                         | Description                                 |
| -------------- | ------------------------------------------------- | ------------------------------------------- |
| `byTargetType` | `byTargetType(type: 'ground' \| 'air' \| 'both')` | Filter by target type.                      |
| `byDistrict`   | `byDistrict(district: string)`                    | Filter to traps placed in a given district. |

---

## Walls

`clanCapital().walls()` returns a `ClanCapitalWalls` query over the single Clan Capital wall entity.

```typescript
import { clanCapital } from 'clash-of-clans-data'

const wall = clanCapital().walls().wall().first()!
```

### Filters

| Method          | Signature                      | Description                          |
| --------------- | ------------------------------ | ------------------------------------ |
| `byCapitalHall` | `byCapitalHall(level: number)` | Filter by Capital Hall availability. |

### Type shape

```typescript
interface ClanCapitalWall {
  id: string
  name: string
  levels: ClanCapitalWallLevel[]
  availablePerCapitalHall: CapitalHallAvailability[]
  availablePerDistrict: DistrictAvailability[]
}

interface ClanCapitalWallLevel {
  level: number
  hitpoints: number
  capitalHallRequired: number
  districtHallRequired: number
  images: { normal: string; corner: string }
}
```

---

## Next steps

- [Troops & spells](/docs/capital-troops): the Raid Weekend units that attack these defenses
- [Buildings & leagues](/docs/capital-buildings): district halls, army buildings, and the Forge
- [Home Village defenses](/docs/home-defenses): the Home Village equivalent of this page
