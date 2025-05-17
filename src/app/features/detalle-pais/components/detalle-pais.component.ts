import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../models/country.interface';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pais.component.html',
  styleUrls: ['./detalle-pais.component.scss']
})
export class DetallePaisComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  pais?: Country;

  ngOnInit(): void {
    // Aquí implementaremos la lógica para obtener los detalles del país
    // usando el ID o código del país desde los parámetros de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Llamada al servicio para obtener los detalles del país
    }
  }

  volver(): void {
    this.router.navigate(['/listado']);
  }
} 