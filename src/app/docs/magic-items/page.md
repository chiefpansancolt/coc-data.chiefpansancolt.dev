---
title: Magic Items
nextjs:
  metadata:
    title: clash-of-clans-data - Magic Items
    description: Query books, hammers, potions, snacks, and utility items with the magicItems() namespace.
---

Books, hammers, potions, snacks, and utility items: every magic item in the game, each carrying a typed `effect` describing exactly what it does. {% .lead %}

---

## Namespaces

```typescript
import { magicItems } from 'clash-of-clans-data'

magicItems().books().get() // MagicBook[]
magicItems().hammers().get() // MagicHammer[]
magicItems().potions().get() // MagicPotion[]
magicItems().snacks().get() // MagicSnack[]
magicItems().utilities().get() // MagicUtility[]
```

---

## Books (5)

`bookOfFighting` · `bookOfBuilding` · `bookOfSpells` · `bookOfHeroes` · `bookOfEverything`

Instantly complete an ongoing upgrade queue.

```typescript
import { magicItems } from 'clash-of-clans-data'

const bookOfHeroes = magicItems().books().bookOfHeroes().first()!
console.log(bookOfHeroes.effect) // { type: 'instant-complete', appliesTo: 'heroes-and-pets' }
```

---

## Hammers (4)

`hammerOfFighting` · `hammerOfBuilding` · `hammerOfSpells` · `hammerOfHeroes`

Instantly upgrade a single unit or building to the next level.

```typescript
import { magicItems } from 'clash-of-clans-data'

const troopHammers = magicItems().hammers().byAppliesTo('troops').get()
```

| Method        | Signature                                                                          | Description                                        |
| ------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------- |
| `byAppliesTo` | `byAppliesTo(appliesTo: 'troops' \| 'buildings' \| 'spells' \| 'heroes-and-pets')` | Filter by the upgrade queue the hammer applies to. |

---

## Potions (8)

`builderPotion` · `researchPotion` · `petPotion` · `heroPotion` · `powerPotion` · `resourcePotion` · `clockTowerPotion` · `superPotion`

Time-limited boosts: build/research/pet speed, unit level, resource collection, Clock Tower activation, or a single troop's Super Troop status.

```typescript
import { magicItems } from 'clash-of-clans-data'

const heroPotion = magicItems().potions().heroPotion().first()!
console.log(heroPotion.effect) // { type: 'unit-level-boost', boostTo: 'max-town-hall-level', ... }

const timeReductionPotions = magicItems()
  .potions()
  .byEffectType('time-reduction')
  .get()
```

| Method         | Signature                                           | Description            |
| -------------- | --------------------------------------------------- | ---------------------- |
| `byEffectType` | `byEffectType(type: MagicPotion['effect']['type'])` | Filter by effect type. |

---

## Snacks (5)

`builderBite` · `studySoup` · `mightyMorsel` · `powerPancakes` · `clanCastleCake`

Smaller, shorter-duration versions of the equivalent potions: see [Calculators](/docs/calculators) for the time math behind `builderBite` and `studySoup`.

```typescript
import { magicItems } from 'clash-of-clans-data'

const builderBite = magicItems().snacks().builderBite().first()!
```

| Method         | Signature                                          | Description            |
| -------------- | -------------------------------------------------- | ---------------------- |
| `byEffectType` | `byEffectType(type: MagicSnack['effect']['type'])` | Filter by effect type. |

---

## Utilities (3)

`shovelOfObstacles` · `builderStarJar` · `wallRing`

One-off utility effects: moving an obstacle, resetting the Builder Base star bonus, or upgrading a single wall piece without spending resources.

```typescript
import { magicItems } from 'clash-of-clans-data'

const wallRing = magicItems().utilities().wallRing().first()!
console.log(wallRing.effect) // { type: 'wall-upgrade', ... }
```

| Method         | Signature                                            | Description            |
| -------------- | ---------------------------------------------------- | ---------------------- |
| `byEffectType` | `byEffectType(type: MagicUtility['effect']['type'])` | Filter by effect type. |

---

## The `MagicItemEffect` union

Every magic item's `effect` field is a discriminated union keyed on `type`, so narrowing on `effect.type` gives you the exact effect shape:

```typescript
type MagicItemEffect =
  | TimeReductionEffect
  | CombatBoostEffect
  | ClanCastleEffect
  | InstantCompleteEffect
  | InstantUpgradeEffect
  | UnitLevelBoostEffect
  | ResourceCollectorBoostEffect
  | ClockTowerBoostEffect
  | SuperTroopEffect
  | WallUpgradeEffect
  | ObstacleMoveEffect
  | StarBonusResetEffect
```

```typescript
import { magicItems } from 'clash-of-clans-data'

for (const item of magicItems().potions().get()) {
  if (item.effect.type === 'unit-level-boost') {
    console.log(`${item.name} boosts for ${item.effect.durationHours}h`)
  }
}
```

---

## Next steps

- [Calculators](/docs/calculators): the time-reduction math behind potions and snacks
- [Clan Capital buildings & leagues](/docs/capital-buildings): the Forge, where equipment (not magic items) is crafted
- [TypeScript integration](/docs/typescript): full type reference for `MagicItem` and its effect union
