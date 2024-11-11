import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuarios } from '../../../models/Usuarios';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();

  constructor(private uS: UsuarioService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      
      this.dataSource = new MatTableDataSource(data);
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
