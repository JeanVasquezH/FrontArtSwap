import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Evento } from '../../../models/Evento';
import { EventoService } from '../../../services/evento.service';

@Component({
  selector: 'app-listarevento',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginatorModule],
  templateUrl: './listarevento.component.html',
  styleUrl: './listarevento.component.css'
})
export class ListareventoComponent implements OnInit{
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','c8','c9','accion01', 'accion02'];
  dataSource: MatTableDataSource<Evento> = new MatTableDataSource();

  constructor(private eS: EventoService){}

  ngOnInit(): void {
    
    this.eS.list().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.eS.delete(id).subscribe(() => {
       this.eS.list().subscribe((data) => {
          this.eS.setList(data);
       });
    });
 }
}
