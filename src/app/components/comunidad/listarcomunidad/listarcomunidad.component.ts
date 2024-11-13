import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ComunidadService } from '../../../services/comunidad.service';
import { Comunidad } from '../../../models/Comunidad';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarcomunidad',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginatorModule],
  templateUrl: './listarcomunidad.component.html',
  styleUrl: './listarcomunidad.component.css'
})
export class ListarcomunidadComponent implements OnInit {
  displayedColumns:string[]=['c1','c2','c3','c4','accion01', 'accion02'];
  dataSource: MatTableDataSource<Comunidad>=new MatTableDataSource()

  constructor(private cS: ComunidadService){}

  ngOnInit(): void {
    this.cS.list().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

}
