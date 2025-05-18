import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type Region = 'all' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-region-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.scss']
})
export class RegionFilterComponent {
  @Output() onRegionChange = new EventEmitter<Region>();

  selectedRegion = signal<Region>('all');
  
  regions: Region[] = ['all', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  onSelect(region: Region): void {
    this.selectedRegion.set(region);
    this.onRegionChange.emit(region);
  }
} 