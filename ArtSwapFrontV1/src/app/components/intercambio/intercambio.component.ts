import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarintercambioComponent } from './listarintercambio/listarintercambio.component';

@Component({
  selector: 'app-intercambio',
  standalone: true,
  imports: [ListarintercambioComponent, RouterOutlet],
  templateUrl: './intercambio.component.html',
  styleUrl: './intercambio.component.css'
})
export class IntercambioComponent {
  constructor(public route: ActivatedRoute) {}
}
