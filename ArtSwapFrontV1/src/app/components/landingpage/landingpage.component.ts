import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  onJoinButtonClick() {
    alert("Gracias por unirte a ArtSawp. ¡Explora, conecta y comparte tu arte!");
  }
}
