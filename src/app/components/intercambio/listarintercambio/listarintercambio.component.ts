import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IntercambioService } from '../../../services/intercambio.service';
import { Intercambio } from '../../../models/Intercambio';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarintercambio',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginatorModule],
  templateUrl: './listarintercambio.component.html',
  styleUrl: './listarintercambio.component.css'
})
export class ListarintercambioComponent {
  
  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion01', 'accion02'];
  dataSource: MatTableDataSource<Intercambio> = new MatTableDataSource();

  constructor(private iS: IntercambioService){}

  ngOnInit(): void {
   
    this.iS.list().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.iS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.iS.delete(id).subscribe(() => {
       this.iS.list().subscribe((data) => {
          this.iS.setList(data);
       });
    });
 }

}
