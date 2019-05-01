export class Character {
  name = 'new character';
  class = '';
  age = 0;
  level = 0;
  gender = 'not assumed';
  race = '';
  hair_color = '';
  eyes_color = '';
  appearance = 0;
  size = 0;
  base_stats: {
    agility: BaseStat, constitution: BaseStat, dexterity: BaseStat, strength: BaseStat,
    intelligence: BaseStat, perception: BaseStat, power: BaseStat, will: BaseStat
  } = {
    'agility':  new BaseStat(), 'constitution': new BaseStat(), 'dexterity': new BaseStat(), 'strength': new BaseStat(),
    'intelligence': new BaseStat(), 'perception': new BaseStat(), 'power': new BaseStat(), 'will': new BaseStat()};
  secondary_stats: SecondaryStat[] = [];
}
export class BaseStat {
  base = 5;
  actual = 5;
  mod = 0;
}

export class SecondaryStat {
  name = '';
  base = 0;
  special = 0;
  class = 0;
  upgrade_cost = 2;
  category = '';
  base_stat_mod = ''; // name of the stat used for computing this stat modifier
}

