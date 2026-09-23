---
title: Builder Base Defenses & Traps
nextjs:
  metadata:
    title: clash-of-clans-data - Builder Base Defenses & Traps
    description: Query Builder Base defenses, traps, and walls by Builder Hall level and damage type.
---

Everything that defends a Builder Base: stationary defenses, traps, and walls. {% .lead %}

---

## Defenses

`builder().defenses()` returns a `BuilderBaseDefenses` query over all 15 stationary defenses.

```typescript
import { builder } from 'clash-of-clans-data'

const cannon = builder().defenses().cannon().first()!
const bh9 = builder().defenses().byBuilderHall(9).get()
```

### Entities (15)

`cannon` · `doubleCannon` · `archerTower` · `hiddenTesla` · `firecrackers` · `crusher` · `guardPost` · `airBombs` · `multiMortar` · `ottosOutpost` · `roaster` · `giantCannon` · `megaTesla` · `lavaLauncher` · `xBow`

### Filters

| Method          | Signature                                                             | Description                              |
| --------------- | --------------------------------------------------------------------- | ---------------------------------------- |
| `byBuilderHall` | `byBuilderHall(level: number)`                                        | Filter by Builder Hall availability.     |
| `byDamageType`  | `byDamageType(type: BuilderDefense['modes']['normal']['damageType'])` | Filter by the normal mode's damage type. |

### Type shape

```typescript
interface BuilderDefense extends Building<BuilderDefenseLevel> {
  targetType: 'ground' | 'air' | 'both'
  modes: { normal: DefenseMode; fastAttack?: DefenseMode }
  defendingTroops?: Array<{ name: string; count: number }>
  availablePerBuilderHall: BuilderHallAvailability[]
}

interface BuilderDefenseLevel extends BuildingLevel {
  builderHallRequired: number
  troopLevel?: number
  spawnCount?: number
  stats: { normal: DefenseModeStats; fastAttack?: DefenseModeStats }
  images: { normal: string }
}
```

---

## Traps

`builder().traps()` returns a `BuilderBaseTraps` query over all 4 traps.

### Entities (4)

`pushTrap` · `springTrap` · `mine` · `megaMine`

### Filters

| Method          | Signature                      | Description                          |
| --------------- | ------------------------------ | ------------------------------------ |
| `byBuilderHall` | `byBuilderHall(level: number)` | Filter by Builder Hall availability. |

---

## Walls

`builder().walls()` returns a `BuilderBaseWalls` query over the single Builder Base wall entity.

```typescript
import { builder } from 'clash-of-clans-data'

const wall = builder().walls().wall().first()!
const bh8Tier = wall.levels.find((l) => l.builderHallRequired <= 8)
```

### Filters

| Method          | Signature                      | Description                          |
| --------------- | ------------------------------ | ------------------------------------ |
| `byBuilderHall` | `byBuilderHall(level: number)` | Filter by Builder Hall availability. |

---

## Next steps

- [Troops & heroes](/docs/builder-troops): the units and heroes these defenses face
- [Buildings & leagues](/docs/builder-buildings): Builder Hall progression and league tiers
- [Home Village defenses](/docs/home-defenses): the Home Village equivalent of this page
