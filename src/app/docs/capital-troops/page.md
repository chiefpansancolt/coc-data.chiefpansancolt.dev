---
title: Clan Capital Troops & Spells
nextjs:
  metadata:
    title: clash-of-clans-data - Clan Capital Troops & Spells
    description: Query Raid Weekend troops and spells trained and brewed in the Clan Capital.
---

Every troop and spell used during Raid Weekend, trained and brewed in Clan Capital districts. {% .lead %}

---

## Troops

`clanCapital().troops()` returns a `ClanCapitalTroops` query over all 17 Raid Weekend troops.

```typescript
import { clanCapital } from 'clash-of-clans-data'

const superBarbarian = clanCapital().troops().superBarbarian().first()!
console.log(superBarbarian.housingSpace)
```

### Entities (17)

`superBarbarian` · `sneakyArcher` · `superGiant` · `battleRam` · `minionHorde` · `superWizard` · `rocketBalloon` · `skeletonBarrels` · `flyingFortress` · `raidCart` · `powerPekka` · `hogRaiders` · `infernoDragon` · `megaSparky` · `mountainGolem` · `superDragon` · `superMiner`

Each entity has its own accessor: this namespace does not add category-specific filters beyond the shared [terminal methods](/docs/core-concepts).

---

## Spells

`clanCapital().spells()` returns a `ClanCapitalSpells` query over all 7 Raid Weekend spells.

### Entities (7)

`healingSpell` · `jumpSpell` · `lightningSpell` · `frostSpell` · `rageSpell` · `graveyardSpell` · `endlessHasteSpell`

```typescript
import { clanCapital } from 'clash-of-clans-data'

const rage = clanCapital().spells().rageSpell().first()!
```

---

## Next steps

- [Defenses & traps](/docs/capital-defenses): what these troops and spells attack
- [Buildings & leagues](/docs/capital-buildings): the Barracks and Spell Factories that produce them
- [Home Village troops](/docs/home-troops): the Home Village equivalent of this page
