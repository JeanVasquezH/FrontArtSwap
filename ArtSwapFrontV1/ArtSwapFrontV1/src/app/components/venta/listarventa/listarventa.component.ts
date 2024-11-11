import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Venta } from '../../../models/Venta';
import { VentaService } from '../../../services/venta.service';

@Component({
  selector: 'app-listarventa',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginatorModule],
  templateUrl: './listarventa.component.html',
  styleUrl: './listarventa.component.css'
})
export class ListarventaComponent implements OnInit{
  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion01', 'accion02'];
  dataSource: MatTableDataSource<Venta> = new MatTableDataSource();

  constructor(private vS: VentaService){}

  ngOnInit(): void {
    
    this.vS.list().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.vS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.vS.delete(id).subscribe(() => {
       this.vS.list().subscribe((data) => {
          this.vS.setList(data);
       });
    });
 }

}
