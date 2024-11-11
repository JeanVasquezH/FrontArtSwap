import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../services/roles.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Roles } from '../../../models/Roles';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarroles',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css'
})
export class ListarrolesComponent implements OnInit{

  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();  
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private rS: RolesService){}

  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

}
