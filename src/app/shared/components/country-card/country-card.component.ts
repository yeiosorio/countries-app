import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Country } from '@core/interfaces/country.interface';
import { NgOptimizedImage } from '@angular/common';
import { FavoritesService } from '@core/services/favorites.service';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent {
  @Input({ required: true }) country!: Country;
  
  private favoritesService = inject(FavoritesService);

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggleFavorite(this.country);
  }

  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.country.cca3);
  }
} 