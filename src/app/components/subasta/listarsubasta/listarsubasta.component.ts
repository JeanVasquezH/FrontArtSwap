import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subasta } from '../../../models/Subasta';
import { SubastaService } from '../../../services/subasta.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarsubasta',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginatorModule],
  templateUrl: './listarsubasta.component.html',
  styleUrl: './listarsubasta.component.css'
})
export class ListarsubastaComponent implements OnInit{
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','accion01', 'accion02'];
  dataSource: MatTableDataSource<Subasta> = new MatTableDataSource();

  constructor(private sS: SubastaService){}

  ngOnInit(): void {
   
    this.sS.list().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.sS.delete(id).subscribe(() => {
       this.sS.list().subscribe((data) => {
          this.sS.setList(data);
       });
    });
 }
}
