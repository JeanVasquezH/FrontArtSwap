import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { CantmetodopagoDTO } from '../../../models/CantmetodopagoDTO';
import { MetodopagoService } from '../../../services/metodopago.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-cant-metodospago',
  standalone: true,
  imports: [BaseChartDirective,MatTableModule, MatIconModule, RouterModule,MatPaginatorModule],
  templateUrl: './cant-metodospago.component.html',
  styleUrl: './cant-metodospago.component.css'
})
export class CantMetodospagoComponent implements OnInit{

  displayedColumns:string[]=['c1','c2'];
  dataSource: MatTableDataSource<CantmetodopagoDTO> = new MatTableDataSource();

  constructor(private eS: MetodopagoService){
  }

  ngOnInit(): void {
    
    this.eS.getmetodopagopersona().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.getmetodopagopersona ().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  
  }
  eliminar(id: number) {
    this.eS.delete(id).subscribe(() => {
       this.eS.list().subscribe((data) => {
          this.eS.setlist(data);
       });
    });
 }

}
