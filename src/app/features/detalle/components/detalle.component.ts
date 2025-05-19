import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CountriesService } from '@core/services/countries.service';
import { Country } from '@core/interfaces/country.interface';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);
  
  country: Country | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCountry(id);
    }
  }

  private async loadCountry(id: string) {
    try {
      const countries = await this.countriesService.getAllCountries();
      this.country = countries.find(c => c.cca3 === id) || null;
    } catch (error) {
      console.error('Error cargando el país:', error);
    }
  }

  getLanguages(languages: Record<string, string> | undefined): string {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  }

  getCurrencies(currencies: Record<string, { name: string, symbol: string }> | undefined): string {
    if (!currencies) return 'N/A';
    return Object.values(currencies)
      .map(currency => `${currency.name} (${currency.symbol})`)
      .join(', ');
  }
} 