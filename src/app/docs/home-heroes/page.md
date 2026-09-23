---
title: Home Village Heroes, Equipment & Pets
nextjs:
  metadata:
    title: clash-of-clans-data - Home Village Heroes, Equipment & Pets
    description: Query Home Village heroes, hero equipment, pets, and Guardians by hero, rarity, Town Hall level, and more.
---

Heroes, the equipment they wear, the pets that fight alongside them, and the Guardians unlocked through the Hero Hall. {% .lead %}

---

## Heroes

`home().heroes()` returns a `HomeVillageHeroes` query over all 6 heroes.

```typescript
import { home } from 'clash-of-clans-data'

const barbarianKing = home().heroes().barbarianKing().first()!
console.log(barbarianKing.attackType)
console.log(barbarianKing.levels.length)
```

### Entities (6)

`barbarianKing` · `archerQueen` · `grandWarden` · `royalChampion` · `minionPrince` · `dragonDuke`

### Filters

| Method       | Signature                   | Description                                            |
| ------------ | --------------------------- | ------------------------------------------------------ |
| `byHeroHall` | `byHeroHall(level: number)` | Filter to heroes available at a given Hero Hall level. |

### Type shape

```typescript
interface HomeHero {
  id: string
  name: string
  preferredTarget: string
  attackType: string
  movementSpeed: number
  attackSpeed: number
  range: number
  searchRadius: number
  specialAbility?: string
  images: { icon: string }
  levels: HomeHeroLevel[]
}

interface HomeHeroLevel {
  level: number
  damagePerSecond: number
  damagePerHit: number
  hitpoints: number
  healthRecovery: number
  heroHallLevelRequired: number
  upgradeCost: number
  upgradeCostResource: ResourceType
  upgradeTime: BuildTime
}
```

---

## Hero equipment

`home().heroEquipment()` returns a `HomeVillageHeroEquipment` query over all 42 equipment items forged at the Blacksmith.

### Entities (42)

`archerPuppet` · `giantArrow` · `barbarianPuppet` · `rageVial` · `electroBoots` · `earthquakeBoots` · `vampstache` · `giantGauntlet` · `stunBlaster` · `spikyBall` · `snakeBracelet` · `stickHorse` · `invisibilityVial` · `healerPuppet` · `frostFlake` · `frozenArrow` · `magicMirror` · `actionFigure` · `henchmenPuppet` · `darkOrb` · `metalPants` · `nobleIron` · `darkCrown` · `meteorStaff` · `eternalTome` · `lifeGem` · `rageGem` · `healingTome` · `flameBlower` · `fireHeart` · `fireball` · `lavaloonPuppet` · `heroicTorch` · `royalGem` · `seekingShield` · `hogRiderPuppet` · `hasteVial` · `rocketBackpack` · `electroFangs` · `monolithArrow` · `revengeDeck` · `rocketSpear`

### Filters

| Method         | Signature                           | Description                                     |
| -------------- | ----------------------------------- | ----------------------------------------------- |
| `byHero`       | `byHero(heroId: string)`            | Filter to equipment usable by the given hero.   |
| `byRarity`     | `byRarity(rarity: EquipmentRarity)` | Filter by rarity tier (`'common'` or `'epic'`). |
| `byBlacksmith` | `byBlacksmith(level: number)`       | Filter by Blacksmith level requirement.         |

### Examples

```typescript
import { home } from 'clash-of-clans-data'

// All epic equipment for the Archer Queen
const queenEpics = home()
  .heroEquipment()
  .byHero('archer-queen')
  .byRarity('epic')
  .get()

const eternalTome = home().heroEquipment().eternalTome().first()!
```

---

## Pets

`home().pets()` returns a `HomeVillagePets` query over all 12 pets raised in the Pet House.

### Entities (12)

`lassi` · `electroOwl` · `mightyYak` · `unicorn` · `frosty` · `diggy` · `poisonLizard` · `phoenix` · `spiritFox` · `angryJelly` · `sneezy` · `greedyRaven`

### Filters

| Method       | Signature                   | Description                            |
| ------------ | --------------------------- | -------------------------------------- |
| `byPetHouse` | `byPetHouse(level: number)` | Filter by Pet House level requirement. |
| `byTownHall` | `byTownHall(level: number)` | Filter by Town Hall availability.      |

### Examples

```typescript
import { home } from 'clash-of-clans-data'

const th13Pets = home().pets().byTownHall(13).get()
const phoenix = home().pets().phoenix().first()!
```

---

## Guardians

`home().guardians()` returns a `HomeVillageGuardians` query over the Guardians unlocked through the Hero Hall.

### Entities (3)

`longshot` · `smasher` · `logger`

### Filters

| Method           | Signature                      | Description                       |
| ---------------- | ------------------------------ | --------------------------------- |
| `byGuardianType` | `byGuardianType(type: string)` | Filter by guardian type.          |
| `byTownHall`     | `byTownHall(level: number)`    | Filter by Town Hall availability. |

### Examples

```typescript
import { home } from 'clash-of-clans-data'

const longshot = home().guardians().longshot().first()!
```

---

## Next steps

- [Troops, spells & siege machines](/docs/home-troops): the army these heroes lead
- [Buildings](/docs/home-buildings): the Hero Hall, Blacksmith, and Pet House that unlock these entities
- [TypeScript integration](/docs/typescript): full type reference for `HomeHero`, `HeroEquipment`, and `HomePet`
