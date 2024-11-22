import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { ObraArte } from '../../../models/ObraArte';
import { Resenha } from '../../../models/Resenha';
import { ObraarteService } from '../../../services/obraarte.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ResenhaService } from '../../../services/resenha.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditaobraarte',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, CommonModule,ReactiveFormsModule],
  templateUrl: './creaeditaobraarte.component.html',
  styleUrls: ['./creaeditaobraarte.component.css']
})
export class CreaeditaobraarteComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  obraarte: ObraArte = new ObraArte();
  listaUsuarios: Usuarios[] = [];
  listaResenha: Resenha[] = [];
  maint: ObraArte = new ObraArte();
  id: number = 0;

  listaEstado: { value: string; viewValue: string }[] = [
    { value: 'Disponible', viewValue: 'Disponible' },
    { value: 'Vendido', viewValue: 'Vendido' },
  ];

  listaDescrip: { value: string; viewValue: string }[] = [
    { value: 'Minimalismo', viewValue: 'Minimalismo' },
    { value: 'Abstracción', viewValue: 'Abstracción' },
    { value: 'Futurismo', viewValue: 'Futurismo' },
    { value: 'Romanticismo', viewValue: 'Romanticismo' },
    { value: 'Realismo', viewValue: 'Realismo' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private oS: ObraarteService,
    private rS: ResenhaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      htitulo: ['', Validators.required],
      himagenobra: ['', [Validators.required, Validators.pattern('https?://.+')]],
      hdescripcion: ['', Validators.required],
      hfechaCreacion: ['', Validators.required],
      hestado: ['', Validators.required],
      hprecio: ['', Validators.required],
      hvaloracion: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      husuario: ['', Validators.required],
      hresenha: ['', Validators.required],
    });

    this.uS.list().subscribe(data => this.listaUsuarios = data);
    this.rS.list().subscribe(data => this.listaResenha = data);
  }

  aceptar(): void {
    if (this.form.valid) {
      // Mapeo de los datos del formulario al modelo maint
      this.maint.titulo = this.form.value.htitulo;
      this.maint.imagenobra=this.form.value.himagenobra;
      this.maint.descripcion = this.form.value.hdescripcion;
      this.maint.fechaCreacion = this.form.value.hfechaCreacion;
      this.maint.estado = this.form.value.hestado;
      this.maint.precio = this.form.value.hprecio;
      this.maint.valoracion = this.form.value.hvaloracion;
      this.maint.resen.idResenha = this.form.value.hresenha;
      this.maint.usua.idUsuario = this.form.value.husuario;
  
      // Inserción con manejo de error
      this.oS.insert(this.maint).subscribe(
        () => {
          this.oS.list().subscribe(data => {
            this.oS.setList(data);
          });
          this.router.navigate(['obraartes']); // Navegación a la lista
        },
        error => {
          console.error('Error al guardar la obra de arte:', error); // Logs detallados
          alert('Hubo un error al guardar la obra de arte. Por favor, verifica los datos o tu conexión.');
        }
      );
    }
  }
  
}