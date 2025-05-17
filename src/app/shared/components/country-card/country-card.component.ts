import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '@core/interfaces/country.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent {
  @Input({ required: true }) country!: Country;
} 