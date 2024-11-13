import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarsubastaComponent } from './listarsubasta/listarsubasta.component';

@Component({
  selector: 'app-subasta',
  standalone: true,
  imports: [ListarsubastaComponent, RouterOutlet],
  templateUrl: './subasta.component.html',
  styleUrl: './subasta.component.css'
})
export class SubastaComponent {
  constructor(public route: ActivatedRoute){}
}
