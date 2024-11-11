import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Comunidad } from '../../../models/Comunidad';
import { ComunidadService } from '../../../services/comunidad.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditacomunidad',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditacomunidad.component.html',
  styleUrls: ['./creaeditacomunidad.component.css']
})
export class CreaeditacomunidadComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  comunidad: Comunidad = new Comunidad();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cS: ComunidadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtenemos el id desde los parámetros de la ruta
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];  // Se asegura de que el 'id' esté presente
      this.edicion = this.id != null;  // Determina si estamos en modo de edición
      this.init();  // Inicializa el formulario si es necesario
    });

    // Inicialización del formulario de comunidad
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hfecha: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      // Asigna los valores del formulario al objeto comunidad
      this.comunidad.idComunidad = this.form.value.hcodigo;
      this.comunidad.nombre = this.form.value.hnombre;
      this.comunidad.descripcion = this.form.value.hdescripcion;
      this.comunidad.fechaCreacion = this.form.value.hfecha;

      if (this.edicion) {
        // Si estamos en edición, actualizamos la comunidad
        this.cS.update(this.comunidad).subscribe(data => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data);  // Actualiza la lista de comunidades
          });
        });
      } else {
        // Si es una nueva comunidad, insertamos
        this.cS.insert(this.comunidad).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);  // Actualiza la lista de comunidades
          });
        });
      }
    }
    this.router.navigate(['comunidades']);  // Redirige a la lista de comunidades
  }

  init() {
    if (this.edicion && this.id) {
      // Solo realiza la llamada si estamos en edición y el 'id' está presente
      this.cS.listId(this.id).subscribe((data) => {
        // Actualiza los valores del formulario con los datos obtenidos
        this.form.patchValue({
          hcodigo: data.idComunidad,
          hnombre: data.nombre,
          hdescripcion: data.descripcion,
          hfecha: data.fechaCreacion,
        });
      });
    }
  }
}

