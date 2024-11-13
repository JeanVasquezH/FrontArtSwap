import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Resenha } from '../../../models/Resenha';
import { ResenhaService } from '../../../services/resenha.service';


@Component({
  selector: 'app-listarresenha',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginatorModule, MatSort],
  templateUrl: './listarresenha.component.html',
  styleUrl: './listarresenha.component.css'
})
export class ListarresenhaComponent implements OnInit {
  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion01', 'accion02'];
  dataSource: MatTableDataSource<Resenha> = new MatTableDataSource();

  constructor(private cS: ResenhaService){}

  ngOnInit(): void {
    
    this.cS.list().subscribe(data=>{
      console.log(data);
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
