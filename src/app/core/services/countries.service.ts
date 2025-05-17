import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '@core/interfaces/country.interface';
import { environment } from '@env/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  async getAllCountries(): Promise<Country[]> {
    try {
      return await firstValueFrom(this.http.get<Country[]>(`${this.baseUrl}/all`));
    } catch (error) {
      console.error('Error al obtener países:', error);
      throw new Error('No se pudieron obtener los países');
    }
  }

  async getCountryByCode(code: string): Promise<Country> {
    try {
      const countries = await firstValueFrom(
        this.http.get<Country[]>(`${this.baseUrl}/alpha/${code}`)
      );
      if (!countries?.length) {
        throw new Error(`No se encontró el país con código ${code}`);
      }
      return countries[0];
    } catch (error) {
      console.error(`Error al obtener país ${code}:`, error);
      throw new Error(`No se pudo obtener el país con código ${code}`);
    }
  }

  async searchCountries(term: string): Promise<Country[]> {
    try {
      return await firstValueFrom(
        this.http.get<Country[]>(`${this.baseUrl}/name/${term}`)
      );
    } catch (error) {
      console.error(`Error al buscar países con término "${term}":`, error);
      throw new Error(`No se encontraron países que coincidan con "${term}"`);
    }
  }
} 