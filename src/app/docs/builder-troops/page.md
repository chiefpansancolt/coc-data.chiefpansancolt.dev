---
title: Builder Base Troops & Heroes
nextjs:
  metadata:
    title: clash-of-clans-data - Builder Base Troops & Heroes
    description: Query Builder Base troops and heroes by damage type, target type, and Builder Hall level.
---

Every unit trained in the Builder Barracks, plus the two Builder Base heroes. {% .lead %}

---

## Troops

`builder().troops()` returns a `BuilderBaseTroops` query over all 12 troops.

```typescript
import { builder } from 'clash-of-clans-data'

const cannonCart = builder().troops().cannonCart().first()!
const airTroops = builder().troops().byTargetType('air').get()
```

### Entities (12)

`ragedBarbarian` · `sneakyArcher` · `boxerGiant` · `betaMinion` · `bomber` · `babyDragon` · `cannonCart` · `nightWitch` · `dropShip` · `powerPekka` · `hogGlider` · `electrofireWizard`

### Filters

| Method         | Signature                                        | Description                                            |
| -------------- | ------------------------------------------------ | ------------------------------------------------------ |
| `byDamageType` | `byDamageType(type: BuilderTroop['damageType'])` | Filter by damage type.                                 |
| `byTargetType` | `byTargetType(type: BuilderTroop['targetType'])` | Filter by target type (`'ground'`, `'air'`, `'both'`). |

---

## Heroes

`builder().heroes()` returns a `BuilderBaseHeroes` query over both Builder Base heroes.

```typescript
import { builder } from 'clash-of-clans-data'

const battleMachine = builder().heroes().battleMachine().first()!
console.log(battleMachine.ability?.name)
```

### Entities (2)

`battleMachine` · `battleCopter`

### Filters

| Method          | Signature                      | Description                                               |
| --------------- | ------------------------------ | --------------------------------------------------------- |
| `byBuilderHall` | `byBuilderHall(level: number)` | Filter to heroes available at a given Builder Hall level. |

### Type shape

Builder Base heroes carry a charge-based `ability` with three charge levels instead of a single special ability string:

```typescript
interface BuilderHero {
  id: string
  name: string
  preferredTarget: string
  attackType: string
  ability?: BuilderHeroAbility
  images: { icon: string }
  levels: BuilderHeroLevel[]
}

interface BuilderHeroAbility {
  name: string
  cooldownPerChargeLevel: number
  levels: BuilderHeroAbilityLevel[]
}

interface BuilderHeroAbilityLevel {
  abilityLevel: number
  chargeLevel1: BuilderHeroAbilityChargeLevel
  chargeLevel2: BuilderHeroAbilityChargeLevel
  chargeLevel3: BuilderHeroAbilityChargeLevel
}
```

---

## Next steps

- [Defenses & traps](/docs/builder-defenses): what these troops and heroes attack
- [Buildings & leagues](/docs/builder-buildings): the Builder Barracks, Star Laboratory, and hero altars
- [TypeScript integration](/docs/typescript): full type reference for `BuilderTroop` and `BuilderHero`
