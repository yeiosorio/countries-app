import { Injectable, computed, signal } from '@angular/core';
import { Country } from '@core/interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly favoritesSignal = signal<Set<string>>(new Set());
  private readonly favoritesCountriesSignal = signal<Country[]>([]);

  // Señales computadas
  readonly favorites = computed(() => Array.from(this.favoritesSignal()));
  readonly favoritesCount = computed(() => this.favoritesSignal().size);
  readonly favoritesCountries = computed(() => this.favoritesCountriesSignal());

  constructor() {
    this.loadFavoritesFromStorage();
  }

  toggleFavorite(country: Country): void {
    const favorites = new Set(this.favoritesSignal());
    
    if (favorites.has(country.cca3)) {
      favorites.delete(country.cca3);
      this.favoritesCountriesSignal.update(countries => 
        countries.filter(c => c.cca3 !== country.cca3)
      );
    } else {
      favorites.add(country.cca3);
      this.favoritesCountriesSignal.update(countries => [...countries, country]);
    }

    this.favoritesSignal.set(favorites);
    this.saveFavoritesToStorage();
  }

  isFavorite(countryCode: string): boolean {
    return this.favoritesSignal().has(countryCode);
  }

  private loadFavoritesFromStorage(): void {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      const storedCountries = localStorage.getItem('favoriteCountries');
      
      if (storedFavorites) {
        this.favoritesSignal.set(new Set(JSON.parse(storedFavorites)));
      }
      
      if (storedCountries) {
        this.favoritesCountriesSignal.set(JSON.parse(storedCountries));
      }
    } catch (error) {
      console.error('Error loading favorites from storage:', error);
    }
  }

  private saveFavoritesToStorage(): void {
    try {
      localStorage.setItem('favorites', JSON.stringify(Array.from(this.favoritesSignal())));
      localStorage.setItem('favoriteCountries', JSON.stringify(this.favoritesCountriesSignal()));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
    }
  }
} 