import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EventoPorPersonaDTO } from '../../../models/EventoPorPersonaDTO';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Evento } from '../../../models/Evento';

@Component({
  selector: 'app-reportereventopersona',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule,MatPaginatorModule],
  templateUrl: './reportereventopersona.component.html',
  styleUrl: './reportereventopersona.component.css'
})
export class ReportereventopersonaComponent implements OnInit{

  displayedColumns:string[]=['c1','c2','c3','c4','c5'];
  dataSource: MatTableDataSource<EventoPorPersonaDTO> = new MatTableDataSource();

  constructor(private eS: EventoService){
  }

  ngOnInit(): void {
    
    this.eS.geteventopersona().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.geteventopersona().subscribe((data)=>{
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
