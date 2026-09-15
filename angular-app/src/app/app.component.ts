import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from './models/animal.model';
import { AnimalService } from './services/animal.service';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { BarnListComponent } from './components/barn-list/barn-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AnimalFormComponent, BarnListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  animals: Animal[] = [];
  loadError = '';

  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.animalService.getAll().subscribe({
      next: (animals) => {
        this.animals = animals;
        this.loadError = '';
      },
      error: () => {
        this.loadError = 'Unable to load animals from the server.';
      },
    });
  }

  onAdd(payload: { name: string; favoriteColor: string }): void {
    this.animalService.add(payload.name, payload.favoriteColor).subscribe({
      next: () => this.refresh(),
      error: () => {
        this.loadError = 'Unable to add that animal.';
      },
    });
  }

  onRemove(id: number): void {
    this.animalService.remove(id).subscribe({
      next: () => {
        this.animals = this.animals.filter((a) => a.id !== id);
      },
      error: () => {
        this.loadError = 'Unable to remove that animal.';
      },
    });
  }
}
