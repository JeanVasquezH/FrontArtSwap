import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ObraArte } from '../../../models/ObraArte';
import { ObraarteService } from '../../../services/obraarte.service';

@Component({
  selector: 'app-listarobraarte',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginatorModule, MatSort],
  templateUrl: './listarobraarte.component.html',
  styleUrl: './listarobraarte.component.css'
})
export class ListarobraarteComponent implements OnInit {
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','c8','c9','accion01', 'accion02'];
  dataSource: MatTableDataSource<ObraArte> = new MatTableDataSource();

  constructor(private oS: ObraarteService){}

  ngOnInit(): void {
    
    this.oS.list().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.oS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.oS.delete(id).subscribe(() => {
       this.oS.list().subscribe((data) => {
          this.oS.setList(data);
       });
    });
 }
  

}
