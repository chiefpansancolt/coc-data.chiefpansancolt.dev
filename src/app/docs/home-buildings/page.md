---
title: Home Village Buildings
nextjs:
  metadata:
    title: clash-of-clans-data - Home Village Buildings
    description: Query Home Village resource buildings, army buildings, other buildings, and the Town Hall.
---

The support buildings that produce resources, train your army, and house your heroes: plus the Town Hall itself. {% .lead %}

---

## Resource buildings

`home().resourceBuildings()` returns a `HomeVillageResourceBuildings` query. The Clan Castle has its own nested query, returned by `.clanCastle()`.

```typescript
import { home } from 'clash-of-clans-data'

const goldMine = home().resourceBuildings().goldMine().first()!
const clanCastle = home().resourceBuildings().clanCastle().first()!
```

### Entities (7)

`goldMine` · `elixirCollector` · `goldStorage` · `elixirStorage` · `darkElixirDrill` · `darkElixirStorage` · `clanCastle`

### Filters

| Method       | Signature                   | Description                       |
| ------------ | --------------------------- | --------------------------------- |
| `byTownHall` | `byTownHall(level: number)` | Filter by Town Hall availability. |

---

## Army buildings

`home().armyBuildings()` returns a `HomeVillageArmyBuildings` query. Several entries return their own dedicated query class instead of a plain building.

```typescript
import { home } from 'clash-of-clans-data'

const laboratory = home().armyBuildings().laboratory().first()!
const heroHall = home().armyBuildings().heroHall().first()!
```

### Entities (11)

`armyCamp` · `barracks` · `darkBarracks` · `laboratory` · `spellFactory` · `darkSpellFactory` · `heroBanner` · `heroHall` · `blacksmith` · `workshop` · `petHouse`

### Filters

| Method       | Signature                   | Description                       |
| ------------ | --------------------------- | --------------------------------- |
| `byTownHall` | `byTownHall(level: number)` | Filter by Town Hall availability. |

---

## Other buildings

`home().otherBuildings()` returns a `HomeVillageOtherBuildings` query covering Bob's Hut and the Helper Hut.

```typescript
import { home } from 'clash-of-clans-data'

const helpers = home().otherBuildings().helpers()
const alchemist = helpers.alchemist().first()!
```

### Entities

`bobsHut` · `helperHut` · `helpers()` (a nested `HomeVillageHelpers` query over the four Helper Hut assistants: `labAssistant` · `buildersApprentice` · `alchemist` · `prospector`)

### Filters

| Method       | Signature                   | Description                       |
| ------------ | --------------------------- | --------------------------------- |
| `byTownHall` | `byTownHall(level: number)` | Filter by Town Hall availability. |

Each Helper Hut assistant powers a matching [calculator](/docs/calculators): see `calculators().helpers()` for the Lab Assistant, Builder's Apprentice, Alchemist, and Prospector calculations.

---

## Town Hall

`home().townHall()` returns a `HomeVillageTownHall` query over Town Hall level data: hitpoints, weapon stats at higher levels, and what each level unlocks.

```typescript
import { home } from 'clash-of-clans-data'

const townHall = home().townHall().first()!
const th12 = townHall.levels.find((l) => l.level === 12)
```

---

## Next steps

- [Defenses & traps](/docs/home-defenses): what these buildings protect
- [Troops, spells & siege machines](/docs/home-troops): what the Barracks, Laboratory, and Workshop produce
- [Heroes, equipment & pets](/docs/home-heroes): what the Hero Hall, Blacksmith, and Pet House unlock
- [Calculators](/docs/calculators): Helper Hut boost calculations that pair with `otherBuildings().helpers()`
