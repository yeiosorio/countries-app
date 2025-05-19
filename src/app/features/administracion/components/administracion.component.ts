import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '@core/services/favorites.service';
import { CountryCardComponent } from '@shared/components/country-card/country-card.component';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [CommonModule, CountryCardComponent],
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent {
  private favoritesService = inject(FavoritesService);
  
  // Señales computadas del servicio
  protected favorites = this.favoritesService.favoritesCountries;
  protected favoritesCount = this.favoritesService.favoritesCount;
} 