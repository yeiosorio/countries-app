import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Country } from '../models/country.interface';
import { CountriesService } from '@core/services/countries.service';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pais.component.html',
  styleUrls: ['./detalle-pais.component.scss']
})
export class DetallePaisComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);
  private title = inject(Title);
  private meta = inject(Meta);
  private platformId = inject(PLATFORM_ID);

  pais$: Observable<Country> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      if (!id) {
        return throwError(() => new Error('ID no proporcionado'));
      }
      return this.countriesService.getCountryByCode(id);
    }),
    tap(pais => {
      // Configuración de SEO
      this.title.setTitle(`${pais.name.common} - Detalles del País`);
      this.meta.updateTag({ 
        name: 'description', 
        content: `Información detallada sobre ${pais.name.common}, incluyendo capital, población, idiomas y más.` 
      });
      
      // Guardar en localStorage solo en el navegador
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('ultimoPaisVisitado', pais.name.common);
      }
    }),
    catchError(error => {
      console.error('Error al cargar el país:', error);
      this.router.navigate(['/']);
      return throwError(() => error);
    })
  );

  volver(): void {
    this.router.navigate(['/']);
  }
} 