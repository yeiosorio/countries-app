import {
  Component,
  signal,
  OnInit,
  ViewChild,
  ElementRef,
  inject,
  PLATFORM_ID,
  computed,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Country } from '@core/interfaces/country.interface';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { RegionFilterComponent, Region } from '@shared/components/region-filter/region-filter.component';
import { CountriesService } from '@core/services/countries.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CountryCardComponent } from '@shared/components/country-card/country-card.component';

const ITEMS_PER_PAGE = 50;
const ITEM_SIZE = 400; // Altura ajustada para el grid
const GRID_COLUMNS = 3; // Número aproximado de columnas en el grid

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ScrollingModule,
    SearchBoxComponent,
    RegionFilterComponent,
    CountryCardComponent
  ],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  private readonly countriesService = inject(CountriesService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);
  private _allCountries: Country[] = [];

  filteredCountries = signal<Country[]>([]);
  currentSearchTerm = signal('');
  currentRegion = signal<Region>('all');
  isLoading = signal(true);
  error = signal<string | null>(null);
  isBrowser = signal(isPlatformBrowser(this.platformId));

  // Virtual Scroll
  useVirtualScroll = computed(() => 
    this.isBrowser() && 
    this.filteredCountries().length > ITEMS_PER_PAGE
  );
  
  readonly itemSize = ITEM_SIZE;

  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;

  constructor() {
    this.initializeState();
  }

  private initializeState(): void {
    this.isLoading.set(true);
    this.error.set(null);
  }

  async ngOnInit() {
    try {
      if (isPlatformBrowser(this.platformId)) {
        await this.ngZone.run(async () => {
          await this.loadCountries();
        });
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
      this.cdr.detectChanges();
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

  onSearch(term: string): void {
    this.currentSearchTerm.set(term);
    this.filterCountries();
    this.scrollToTop();
  }

  onRegionChange(region: Region): void {
    this.currentRegion.set(region);
    this.filterCountries();
    this.scrollToTop();
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
    this.cdr.detectChanges();
  }

  private scrollToTop(): void {
    if (this.viewport && isPlatformBrowser(this.platformId)) {
      this.viewport.scrollToIndex(0);
      this.cdr.detectChanges();
    }
  }

  async retryLoad(): Promise<void> {
    await this.loadCountries();
  }
}
