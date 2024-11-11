import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../models/Usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comunidad } from '../../../models/Comunidad';
import { ComunidadService } from '../../../services/comunidad.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-creaeditausuario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    CommonModule // Importa CommonModule para que ngFor funcione
  ],
  templateUrl: './creaeditausuario.component.html',
  styleUrls: ['./creaeditausuario.component.css'] // Corregido 'styleUrl' a 'styleUrls'
})
export class CreaeditausuarioComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  listarComunidades: Comunidad[] = [];
  user: Usuarios = new Usuarios();
  
  constructor(
    private formBuilder: FormBuilder,
    private cS: ComunidadService,
    private uS: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnombre: ['', Validators.required],
      henable: [false, Validators.required],
      hpassword: ['', Validators.required],
      husername: ['', Validators.required],
      hcomunid: ['', Validators.required],
    });

    this.cS.list().subscribe((data) => {
      this.listarComunidades = data;
    });
  }

  // Función trackById para optimizar el ngFor
  trackById(index: number, item: Comunidad): number {
    return item.idComunidad;  // Devolver un valor único de cada elemento
  }

  aceptar(): void {
    if (this.form.valid) {
      this.user.nombre = this.form.value.hnombre;
      this.user.enable = this.form.value.henable;
      this.user.password = this.form.value.hpassword;
      this.user.username = this.form.value.husername;
      this.user.comunid.idComunidad = this.form.value.hcomunid;

      this.uS.insert(this.user).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['usuarios']);
    }
  }
}

