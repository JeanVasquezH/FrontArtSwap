import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Favorito } from '../../../models/Favorito';
import { FavoritoService } from '../../../services/favorito.service';

@Component({
  selector: 'app-listarfavorito',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginatorModule],
  templateUrl: './listarfavorito.component.html',
  styleUrl: './listarfavorito.component.css'
})
export class ListarfavoritoComponent implements OnInit {
  displayedColumns:string[]=['c1','c2','c3','c4','accion01', 'accion02'];
  dataSource: MatTableDataSource<Favorito> = new MatTableDataSource();

  constructor(private fS: FavoritoService){}

  ngOnInit(): void {
    
    this.fS.list().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.fS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.fS.delete(id).subscribe(() => {
       this.fS.list().subscribe((data) => {
          this.fS.setList(data);
       });
    });
 }
  

}
