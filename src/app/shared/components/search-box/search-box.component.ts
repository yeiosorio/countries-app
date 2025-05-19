import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Input() placeholder = 'Buscar país...';
  @Output() onSearch = new EventEmitter<string>();

  private readonly DEBOUNCE_TIME = 300;
  private readonly MIN_CHARS = 3;
  private debounceTimer?: number;
  
  searchTerm: string = '';

  onInputChange(value: string): void {
    this.searchTerm = value;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    if (value.length === 0 || value.length >= this.MIN_CHARS) {
      this.debounceTimer = window.setTimeout(() => {
        this.onSearch.emit(value.trim());
      }, this.DEBOUNCE_TIME);
    }
  }

  onEnterPress(): void {
    const value = this.searchTerm;
    if (value.length >= this.MIN_CHARS || value.length === 0) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.onSearch.emit(value.trim());
    }
  }
} 