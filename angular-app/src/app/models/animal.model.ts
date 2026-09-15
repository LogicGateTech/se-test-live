import { Barn } from './barn.model';

export interface Animal {
  id: number;
  name: string;
  favoriteColor: string;
  barn: Barn;
}
