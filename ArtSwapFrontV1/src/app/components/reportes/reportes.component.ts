import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportereventopersonaComponent } from "./reportereventopersona/reportereventopersona.component";

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, ReportereventopersonaComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute  ) {}
}
