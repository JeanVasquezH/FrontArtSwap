import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../models/Usuarios';
import { Intercambio } from '../../../models/Intercambio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObraArte } from '../../../models/ObraArte';
import { ObraarteService } from '../../../services/obraarte.service';
import { UsuarioService } from '../../../services/usuario.service';
import { IntercambioService } from '../../../services/intercambio.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaintercambio',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule,MatFormFieldModule,ReactiveFormsModule, MatInputModule,MatSelectModule,MatButtonModule, CommonModule],
  templateUrl: './creaeditaintercambio.component.html',
  styleUrl: './creaeditaintercambio.component.css'
})
export class CreaeditaintercambioComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  listarusuario:Usuarios[]=[];
  listaobraarte: ObraArte[]=[];
  intercamb:Intercambio=new Intercambio()
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
    private iS: IntercambioService,
    private router:Router,
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      hfechaIntercambio:['',Validators.required],
      hestado:['',Validators.required],
      husuario:['',Validators.required],
      hobraarte:['',Validators.required],
    })
    this.uS.list().subscribe(data=>{
      this.listarusuario=data
    })
    this.oS.list().subscribe(data=>{
      this.listaobraarte=data
    })
  }
  aceptar():void {
    if (this.form.valid){
      this.intercamb.fechaIntercambio =this.form.value.hfechaIntercambio ;
      this.intercamb.estado=this.form.value.hestado;
      this.intercamb.usuario.idUsuario=this.form.value.husuario;
      this.intercamb.obraArte.idObraArte=this.form.value.hobraarte;

      this.iS.insert(this.intercamb).subscribe(data=>{
        this.iS.list().subscribe(data=>{
          this.iS.setList(data)
        });
      });
      this.router.navigate (['intercambios']);
    }
  }
}
