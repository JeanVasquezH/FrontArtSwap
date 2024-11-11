import { Component } from '@angular/core';
import { ListarobraarteComponent } from "./listarobraarte/listarobraarte.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-obraarte',
  standalone: true,
  imports: [ListarobraarteComponent,RouterOutlet],
  templateUrl: './obraarte.component.html',
  styleUrl: './obraarte.component.css'
})
export class ObraarteComponent {
  
  constructor(public route: ActivatedRoute){}

}
