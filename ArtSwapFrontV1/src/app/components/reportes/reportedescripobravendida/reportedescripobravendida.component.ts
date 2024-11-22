import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { VentaService } from '../../../services/venta.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DescripcionVentasObraArteDTO } from '../../../models/DescripcionVentasObraArteDTO';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-reportedescripobravendida',
  standalone: true,
  imports: [BaseChartDirective,MatTableModule, MatIconModule, RouterModule,MatPaginatorModule],
  templateUrl: './reportedescripobravendida.component.html',
  styleUrl: './reportedescripobravendida.component.css'
})
export class ReportedescripobravendidaComponent {
  displayedColumns:string[]=['c1','c2','c3','c4','c5'];
  dataSource: MatTableDataSource<DescripcionVentasObraArteDTO> = new MatTableDataSource();

  constructor(private eS: VentaService){
  }

  ngOnInit(): void {
    
    this.eS.getventaobraarte().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.getventaobraarte().subscribe((data)=>{
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
