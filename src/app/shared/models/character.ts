export class Character {
  name = 'new character';
  class = '';
  age = 20;
  level = 1;
  gender = 'not assumed';
  race = '';
  hair_color = '';
  eyes_color = '';
  appearance = 0;
  size = 0;
  base_stats: BaseStat[] =
    [
      new BaseStat('agility', 'physical'),
      new BaseStat('constitution', 'physical'),
      new BaseStat('strength', 'physical'),
      new BaseStat('dexterity', 'physical'),
      new BaseStat(`intelligence`, 'intellect'),
      new BaseStat(`power`, 'intellect'),
      new BaseStat(`will`, 'intellect'),
      new BaseStat(`perception`, 'intellect')
    ];
  secondary_stats: SecondaryStat[] = [];
}
export class BaseStat {
  id: string;
  type: string;
  base: number;
  actual: number;
  mod: number;

  constructor(id: string, type: string) {
    this.id = id;
    this.type = type;
    this.base = 5;
    this.actual = 5;
    this.mod = 0;
  }
}

export class SecondaryStat {
  name: string;
  base: number;
  special: number;
  class: number;
  upgradeCost: number;
  category: string;
  baseStatMod: string; // name of the stat used for computing this stat modifier
  modMultiplier: number;

  constructor(category: string) {
    this.name = '';
    this.base = 0;
    this.special = 0;
    this.class = 0;
    this.upgradeCost = 2;
    this.category = category;
    this.baseStatMod = '';
    this.modMultiplier = 1;
  }
}

export function resetActualStats(char: Character) {
  for (let i = 0; i < char.base_stats.length; i++) {
   char.base_stats[i].actual = char.base_stats[i].base;
  }
  computeMods(char);
}

export function computeMods(char: Character) {
  let refTab = [-30, -20, -10, -5, 0, +5, +5, +10, +10, +15, +20, +20, +25, +25, +30, +35, +35, +40, +40, +45];
  for (let i = 0; i < char.base_stats.length; i++) {
    char.base_stats[i].mod = refTab[char.base_stats[i].actual - 1];
  }
}
