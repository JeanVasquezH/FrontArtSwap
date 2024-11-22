import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    CommonModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArtSwapFrontV1';

  role: string = '';

  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }

  isArtista(){
    return this.role === 'ARTISTA';
  }

  isAficionado() {
    return this.role === 'AFICIONADO';
  }

  isAdmin() {
    return this.role === 'ADMINISTRADOR';
  }

}
