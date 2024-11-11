import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditaobraarte',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [MatDatepickerModule,MatFormFieldModule,ReactiveFormsModule, MatInputModule,MatSelectModule,MatButtonModule,CommonModule],
  templateUrl: './creaeditaobraarte.component.html',
  styleUrl: './creaeditaobraarte.component.css'
})
export class CreaeditaobraarteComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  obraarte: ObraArte = new ObraArte();
  listaUsuarios:Usuarios[]=[];
  listaResenha: Resenha[]=[];
  maint:ObraArte=new ObraArte()
  id:number = 0
  listaEstado: { value: string; viewValue: string }[] = [
    { value: 'Disponible', viewValue: 'Disponible' },
    { value: 'Vendido', viewValue: 'Vendido' },
  ];
  constructor(
    private formBuilder:FormBuilder, 
    private uS: UsuarioService,
    private oS: ObraarteService,
    private rS: ResenhaService,
    private router:Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      htitulo:['',Validators.required],
      hdescripcion:['',Validators.required],
      hfechaCreacion:['',Validators.required],
      hestado:['',Validators.required],
      hprecio:['',Validators.required],
      hvaloracion:['',Validators.required],
      husuario:['',Validators.required],
      hresenha:['',Validators.required],
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
    this.rS.list().subscribe(data=>{
      this.listaResenha=data
    })
  }
  aceptar():void {
    if (this.form.valid){
      this.maint.titulo=this.form.value.htitulo;
      this.maint.descripcion=this.form.value.hdescripcion;
      this.maint.fechaCreacion=this.form.value.hfechaCreacion;
      this.maint.estado=this.form.value.hestado;
      this.maint.precio=this.form.value.hprecio;
      this.maint.valoracion=this.form.value.hvaloracion;
      this.maint.resen.idResenha=this.form.value.hresenha;
      this.maint.usua.idUsuario=this.form.value.husuario;

      this.oS.insert(this.maint).subscribe(data=>{
        this.oS.list().subscribe(data=>{
          this.oS.setList(data)
        });
      });
      this.router.navigate (['obraartes']);
    }
  }

}
