export type Color =
  | 'RED'
  | 'ORANGE'
  | 'YELLOW'
  | 'GREEN'
  | 'BLUE'
  | 'INDIGO'
  | 'VIOLET'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'WHITE'
  | 'GRAY'
  | 'BLACK'
  | 'DARKER_THAN_BLACK';

export const ALL_COLORS: Color[] = [
  'RED',
  'ORANGE',
  'YELLOW',
  'GREEN',
  'BLUE',
  'INDIGO',
  'VIOLET',
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'WHITE',
  'GRAY',
  'BLACK',
  'DARKER_THAN_BLACK',
];

export interface Barn {
  id: number;
  name: string;
  color: Color;
  capacity: number;
}

export interface Animal {
  id: number;
  name: string;
  favoriteColor: Color;
  barn: Barn;
}
