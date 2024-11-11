import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Resenha } from '../../../models/Resenha';
import { Usuarios } from '../../../models/Usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { ResenhaService } from '../../../services/resenha.service';

@Component({
  selector: 'app-creaeditaresenha',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [MatDatepickerModule,MatFormFieldModule,ReactiveFormsModule, MatInputModule,MatSelectModule,MatButtonModule],
  templateUrl: './creaeditaresenha.component.html',
  styleUrl: './creaeditaresenha.component.css'
})
export class CreaeditaresenhaComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  listaUsuarios:Usuarios[]=[];
  maint:Resenha=new Resenha()
  constructor(
    private formBuilder:FormBuilder, 
    private uS: UsuarioService,
    private rS: ResenhaService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      hcalificacion:['',Validators.required],
      hcomentario:['',Validators.required],
      hfecha:['',Validators.required],
      husuario:['',Validators.required],
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
  }
  aceptar():void {
    if (this.form.valid){
      this.maint.calificacion=this.form.value.hcalificacion;
      this.maint.comentario=this.form.value.hcomentario;
      this.maint.fechaResena=this.form.value.hfecha;
      this.maint.usua.idUsuario=this.form.value.husuario;

      this.rS.insert(this.maint).subscribe(data=>{
        this.rS.list().subscribe(data=>{
          this.rS.setList(data)
        });
      });
      this.router.navigate (['resenha']);
    }
  }


}
