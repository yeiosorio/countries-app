import { 
  Component, 
  signal, 
  OnInit, 
  ViewChild, 
  ElementRef, 
  NgZone,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Country } from '@core/interfaces/country.interface';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { RegionFilterComponent, Region } from '@shared/components/region-filter/region-filter.component';
import { CountriesService } from '@core/services/countries.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchBoxComponent,
    RegionFilterComponent
  ],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  private readonly countriesService = inject(CountriesService);
  private readonly platformId = inject(PLATFORM_ID);
  private _allCountries: Country[] = [];
  
  filteredCountries = signal<Country[]>([]);
  currentSearchTerm = signal('');
  currentRegion = signal<Region>('all');
  isLoading = signal(true);
  error = signal<string | null>(null);

  @ViewChild('countriesList') countriesList?: ElementRef;

  constructor(private ngZone: NgZone) {
    // Inicializar estados
    this.isLoading.set(true);
    this.error.set(null);
  }

  async ngOnInit() {
    try {
      // Si estamos en el servidor, no necesitamos el ngZone
      if (isPlatformBrowser(this.platformId)) {
        await this.ngZone.run(async () => {
          await this.loadCountries();
        });
      } else {
        await this.loadCountries();
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  private async loadCountries(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      const countries = await this.countriesService.getAllCountries();
      this.countries = countries;
    } finally {
      this.isLoading.set(false);
    }
  }

  private handleError(err: unknown): void {
    console.error('Error cargando países:', err);
    this.error.set('Error al cargar los países. Por favor, intente nuevamente.');
    this.isLoading.set(false);
  }

  set countries(value: Country[]) {
    this._allCountries = value;
    this.filterCountries();
  }

  trackByCountry(_: number, country: Country): string {
    return country.cca3;
  }

  onSearch(term: string): void {
    this.currentSearchTerm.set(term);
    this.filterCountries();
  }

  onRegionChange(region: Region): void {
    this.currentRegion.set(region);
    this.filterCountries();
  }

  private filterCountries(): void {
    let filtered = [...this._allCountries];
    
    if (this.currentRegion() !== 'all') {
      filtered = filtered.filter(country => 
        country.region.toLowerCase() === this.currentRegion().toLowerCase()
      );
    }

    if (this.currentSearchTerm()) {
      const searchTerm = this.currentSearchTerm().toLowerCase();
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm) ||
        country.name.official.toLowerCase().includes(searchTerm)
      );
    }

    this.filteredCountries.set(filtered);
  }

  async retryLoad(): Promise<void> {
    await this.loadCountries();
  }
} 