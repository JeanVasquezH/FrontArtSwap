import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ObraArte } from '../../../models/ObraArte';
import { ObraarteService } from '../../../services/obraarte.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarobraarte',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule, CommonModule],
  templateUrl: './listarobraarte.component.html',
  styleUrls: ['./listarobraarte.component.css'] // Corrección aquí
})
export class ListarobraarteComponent implements OnInit {
  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10',
    'accion01', 'accion02'
  ]; // Asegúrate de que coincidan con los nombres en el HTML
  dataSource = new MatTableDataSource<ObraArte>();

  constructor(private oS: ObraarteService) {}

  ngOnInit(): void {
    this.cargarObras();
  }

  cargarObras(): void {
    this.oS.list().subscribe(data => {
      console.log('Datos obtenidos:', data);

      // Procesar cada obra para extraer el ID de la URL
      data.forEach(obra => {
        if (obra.imagenobra) {
          console.log('Procesando URL de imagen:', obra.imagenobra);  // Log para depuración
          
          // Intentar extraer el ID de la URL de Google Drive
          const matchResult = obra.imagenobra.match(/[?&]id=([a-zA-Z0-9_-]+)/);
          if (matchResult) {
            const id = matchResult[1]; // El ID de la imagen de Google Drive
            console.log('ID extraído de la URL:', id);  // Log para depuración
            obra.imagenobra = id; // Reemplazar la URL completa con solo el ID
          } else {
            // Si no se puede extraer el ID, mostrar un error
            console.error('No se pudo extraer el ID de la URL de imagen:', obra.imagenobra);
          }
        }
      });

      this.dataSource.data = data; // Actualiza directamente la fuente de datos
    });
  }

  eliminar(id: number): void {
    this.oS.delete(id).subscribe(() => {
      console.log(`ObraArte con ID ${id} eliminada`);
      this.cargarObras(); // Recarga la lista tras la eliminación
    });
  }
}
