import { Component } from '@angular/core';
import { ListarfavoritoComponent } from "./listarfavorito/listarfavorito.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-favorito',
  standalone: true,
  imports: [ListarfavoritoComponent,RouterOutlet],
  templateUrl: './favorito.component.html',
  styleUrl: './favorito.component.css'
})
export class FavoritoComponent {
  
  constructor(public route: ActivatedRoute){}

}
