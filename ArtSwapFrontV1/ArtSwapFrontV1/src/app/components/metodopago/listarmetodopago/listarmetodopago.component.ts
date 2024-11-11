import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MetodopagoService } from '../../../services/metodopago.service';
import { Metodopago } from '../../../models/Metodopago';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarmetodopago',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarmetodopago.component.html',
  styleUrl: './listarmetodopago.component.css'
})
export class ListarmetodopagoComponent implements OnInit {
  dataSource: MatTableDataSource<Metodopago> = new MatTableDataSource();
  displayedColumns:string[]=['id','Tipo','Descripcion','accion01', 'accion02'];
  constructor(private mS: MetodopagoService) {}

  ngOnInit(): void {
    this.mS.list().subscribe(data=>{
      console.log(data);
      this.dataSource=new MatTableDataSource(data);
    });
    this.mS.getlist().subscribe((data)=>{
      this.dataSource= new MatTableDataSource(data);
    })
  }

  eliminar(id: number){
    this.mS.delete(id).subscribe((data)=>{
      this.mS.list().subscribe((data)=>{
        this.mS.setlist(data);
      });
    });
  }

}
