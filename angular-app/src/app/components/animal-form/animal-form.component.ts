import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Add-animal form.
 *
 * NOTE: the color list below is intentionally maintained locally in this
 * component rather than imported from a shared constant, matching how the
 * original UI prototype was built before a shared model layer existed.
 */
@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animal-form.component.html',
  styleUrl: './animal-form.component.css',
})
export class AnimalFormComponent {
  @Output() add = new EventEmitter<{ name: string; favoriteColor: string }>();

  name = '';
  favoriteColor = '';

  colors: string[] = [
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
  ];

  errorMessage = '';

  onSubmit(): void {
    if (!this.name.trim() || !this.favoriteColor) {
      this.errorMessage = 'Name and favorite color are required.';
      return;
    }
    this.errorMessage = '';
    this.add.emit({ name: this.name.trim(), favoriteColor: this.favoriteColor });
    this.name = '';
    this.favoriteColor = '';
  }
}
