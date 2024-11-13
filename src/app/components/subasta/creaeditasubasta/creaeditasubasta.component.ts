import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subasta } from '../../../models/Subasta';
import { ObraArte } from '../../../models/ObraArte';
import { Usuarios } from '../../../models/Usuarios';
import { ObraarteService } from '../../../services/obraarte.service';
import { UsuarioService } from '../../../services/usuario.service';
import { SubastaService } from '../../../services/subasta.service';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditasubasta',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule,MatFormFieldModule,ReactiveFormsModule, MatInputModule,MatSelectModule,MatButtonModule, CommonModule],
  templateUrl: './creaeditasubasta.component.html',
  styleUrl: './creaeditasubasta.component.css'
})
export class CreaeditasubastaComponent implements OnInit{
  form:FormGroup=new FormGroup({});

  listaUsuario:Usuarios[]=[];
  listaObraArte: ObraArte[]=[];
  subast:Subasta=new Subasta()
  id:number = 0

  listarestados: { value: string; viewValue: string }[] = [
    { value: 'aceptado', viewValue: 'aceptado' },
    { value: 'rechazado', viewValue: 'rechazado' },
    { value: 'por confirmar', viewValue: 'por confirmar' },
  ];

  constructor(
    private formBuilder:FormBuilder, 
    private oS: ObraarteService,
    private uS: UsuarioService,
    private sS: SubastaService,
    private router:Router,
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      fechaRango: this.formBuilder.group({
        hfechaInicio: ['', Validators.required],
        hfechaFin: ['', Validators.required]
      }),
      hprecio:['',Validators.required],
      hestado:['',Validators.required],
      husuario:['',Validators.required],
      hobraArt:['',Validators.required],
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuario=data
    })
    this.oS.list().subscribe(data=>{
      this.listaObraArte=data
    })
  }
  aceptar():void {
    if (this.form.valid){
      this.subast.fechaInicio = this.form.value.fechaRango.hfechaInicio;
    this.subast.fechaFin = this.form.value.fechaRango.hfechaFin;
      this.subast.precio=this.form.value.hprecio;
      this.subast.estado=this.form.value.hestado;

      this.subast.usua.idUsuario=this.form.value.husuario;
      this.subast.obraArt.idObraArte=this.form.value.hobraArt;

      this.sS.insert(this.subast).subscribe(data=>{
        this.sS.list().subscribe(data=>{
          this.sS.setList(data)
        });
      });
      this.router.navigate (['subastas']);
    }
  }
}
