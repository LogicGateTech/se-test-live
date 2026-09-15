import { Animal, Barn, Color } from './models';

/**
 * NOTE FOR SDET CANDIDATES: this file (and the rest of mock-server/) is already fully
 * implemented -- you are not asked to change the business logic here. It's a small in-memory
 * stand-in for a real backend, implementing the same barn/animal rules documented below, so the
 * Angular app has something real to talk to.
 *
 * Rules for how animals are organized into barns of the same color:
 *
 *   An animal moves to the farm. The new animal must have a barn to inhabit, and the barn must
 *   match the animal's favorite color. If no such barn exists, a new one is built (capacity 20,
 *   empty). No barn may exceed its capacity. Animals are distributed between barns of the same
 *   color to keep as much free space as possible spread evenly across barns.
 *
 *     Barns [ {color: YELLOW, animals: [20]} ]
 *     -> add(YELLOW) -> Barns [ {10}, {11} ]     (new barn built, redistributed)
 *     -> add(YELLOW) -> Barns [ {11}, {11} ]     (room existed, redistributed to stay even)
 *
 *   An animal leaves the farm. Barns of the same color should stay evenly distributed. If the
 *   remaining animals of that color can all fit into fewer barns without exceeding capacity,
 *   the extra barn(s) must be destroyed and the rest redistributed.
 *
 *     Barns [ {15},{15},{16},{16} ]  (RED, total 62)
 *     -> remove -> Barns [ {15},{15},{15},{16} ]     (61 total, still needs 4 barns)
 *     -> remove -> Barns [ {20},{20},{20} ]          (60 total, fits in 3 -- one barn destroyed)
 */

const BARN_CAPACITY = 20;

let barns: Barn[] = [];
let animals: Animal[] = [];
let nextBarnId = 1;
let nextAnimalId = 1;

function barnsByColor(color: Color): Barn[] {
  return barns.filter((barn) => barn.color === color);
}

function animalsByColor(color: Color): Animal[] {
  return animals.filter((animal) => animal.favoriteColor === color);
}

function resolveBarnCount(currentBarnCount: number, total: number): number {
  let barnCount = currentBarnCount;

  // Consolidate: shrink the barn count while the animals still fit in one fewer barn.
  while (barnCount > 1 && (barnCount - 1) * BARN_CAPACITY > total) {
    barnCount--;
  }

  // Grow: make sure there's enough room for everyone.
  const minimumRequired = total === 0 ? 0 : Math.ceil(total / BARN_CAPACITY);
  return Math.max(barnCount, minimumRequired);
}

function redistribute(barnsForColor: Barn[], animalsForColor: Animal[]): void {
  if (barnsForColor.length === 0) {
    return;
  }

  const barnCount = barnsForColor.length;
  const total = animalsForColor.length;
  const base = Math.floor(total / barnCount);
  const remainder = total % barnCount;

  let index = 0;
  for (let i = 0; i < barnCount; i++) {
    const occupancy = base + (i < remainder ? 1 : 0);
    const barn = barnsForColor[i];
    for (let j = 0; j < occupancy; j++) {
      animalsForColor[index].barn = barn;
      index++;
    }
  }
}

export function findAll(): Animal[] {
  return animals;
}

export function addToFarm(name: string, favoriteColor: Color): Animal {
  let colorBarns = barnsByColor(favoriteColor);
  const colorAnimals = animalsByColor(favoriteColor);

  const newAnimal = { id: nextAnimalId++, name, favoriteColor } as Animal;
  const newTotal = colorAnimals.length + 1;
  const targetBarnCount = resolveBarnCount(colorBarns.length, newTotal);

  if (targetBarnCount > colorBarns.length) {
    const barnsToCreate = targetBarnCount - colorBarns.length;
    for (let i = 0; i < barnsToCreate; i++) {
      const barn: Barn = {
        id: nextBarnId++,
        name: `${favoriteColor} Barn ${colorBarns.length + 1}`,
        color: favoriteColor,
        capacity: BARN_CAPACITY,
      };
      barns.push(barn);
      colorBarns = [...colorBarns, barn];
    }
  }

  const allAnimalsOfColor = [...colorAnimals, newAnimal];
  animals.push(newAnimal);
  redistribute(colorBarns, allAnimalsOfColor);

  return newAnimal;
}

export function removeFromFarm(id: number): boolean {
  const animal = animals.find((existing) => existing.id === id);
  if (!animal) {
    return false;
  }

  const color = animal.favoriteColor;
  const colorBarns = barnsByColor(color);
  const remaining = animalsByColor(color).filter((existing) => existing.id !== id);

  animals = animals.filter((existing) => existing.id !== id);

  const targetBarnCount = resolveBarnCount(colorBarns.length, remaining.length);

  if (targetBarnCount < colorBarns.length) {
    const barnsToKeep = colorBarns.slice(0, targetBarnCount);
    const barnsToDestroy = colorBarns.slice(targetBarnCount);

    redistribute(barnsToKeep, remaining);

    const destroyIds = new Set(barnsToDestroy.map((barn) => barn.id));
    barns = barns.filter((barn) => !destroyIds.has(barn.id));
  } else {
    redistribute(colorBarns, remaining);
  }

  return true;
}

export function resetAll(): void {
  barns = [];
  animals = [];
  nextBarnId = 1;
  nextAnimalId = 1;
}
