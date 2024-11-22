import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
  constructor(public route: ActivatedRoute) {}
}

