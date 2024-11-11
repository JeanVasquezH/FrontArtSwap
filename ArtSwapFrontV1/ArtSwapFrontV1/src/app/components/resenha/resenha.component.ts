import { Component } from '@angular/core';
import { ListarresenhaComponent } from "./listarresenha/listarresenha.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-resenha',
  standalone: true,
  imports: [ListarresenhaComponent, RouterOutlet],
  templateUrl: './resenha.component.html',
  styleUrl: './resenha.component.css'
})
export class ResenhaComponent {
  constructor(public route: ActivatedRoute){}

}
