import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../models/animal.model';
import { Barn } from '../../models/barn.model';

interface BarnGroup {
  barn: Barn;
  animals: Animal[];
}

@Component({
  selector: 'app-barn-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barn-list.component.html',
  styleUrl: './barn-list.component.css',
})
export class BarnListComponent {
  @Input() animals: Animal[] = [];
  @Output() remove = new EventEmitter<number>();

  get groups(): BarnGroup[] {
    const byBarn = new Map<number, BarnGroup>();
    for (const animal of this.animals) {
      const existing = byBarn.get(animal.barn.id);
      if (existing) {
        existing.animals.push(animal);
      } else {
        byBarn.set(animal.barn.id, { barn: animal.barn, animals: [animal] });
      }
    }
    return Array.from(byBarn.values()).sort((a, b) => a.barn.id - b.barn.id);
  }

  onRemove(id: number): void {
    this.remove.emit(id);
  }
}
