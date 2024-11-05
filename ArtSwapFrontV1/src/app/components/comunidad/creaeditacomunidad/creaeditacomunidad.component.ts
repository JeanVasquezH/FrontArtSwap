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
  styleUrl: './creaeditacomunidad.component.css'
})
export class CreaeditacomunidadComponent implements OnInit{
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
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hfecha: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.comunidad.idComunidad = this.form.value.hcodigo;
      this.comunidad.nombre = this.form.value.hnombre;
      this.comunidad.descripcion = this.form.value.hdescripcion;
      this.comunidad.fechaCreacion = this.form.value.hfecha;
      if (this.edicion) {
        //update
        this.cS.update(this.comunidad).subscribe(data=> {
          this.cS.list().subscribe(data=>{
            this.cS.setList(data)
          })
        });
      } else {
        //insertar
        this.cS.insert(this.comunidad).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['comunidades']);
  }
  init() {
    if (this.comunidad) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idComunidad),
          hnombre: new FormControl(data.nombre),
          hmarca: new FormControl(data.descripcion),
          hfecha: new FormControl(data.fechaCreacion),
        });
      });
    }
  }

}
