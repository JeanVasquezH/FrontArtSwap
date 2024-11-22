import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { ObraArte } from '../../../models/ObraArte';
import { Favorito } from '../../../models/Favorito';
import { ObraarteService } from '../../../services/obraarte.service';
import { UsuarioService } from '../../../services/usuario.service';
import { FavoritoService } from '../../../services/favorito.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creadifavorito',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [MatDatepickerModule,MatFormFieldModule,ReactiveFormsModule, MatInputModule,MatSelectModule,MatButtonModule,CommonModule],
  templateUrl: './creaditafavorito.component.html',
  styleUrl: './creaditafavorito.component.css'
})
export class creaedifavoritoComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  favorito: Favorito = new Favorito();
  listaUsuarios:Usuarios[]=[];
  listaobraarte: ObraArte[]=[];
  maint:Favorito=new Favorito()
  id:number = 0
  
  constructor(
    private formBuilder:FormBuilder,
    private fS: FavoritoService,
    private uS: UsuarioService,
    private oS: ObraarteService,
    private router:Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      
      hfecha:['',Validators.required],
      husuario:['',Validators.required],
      hobraarte:['',Validators.required],
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
    this.oS.list().subscribe(data=>{
      this.listaobraarte=data
    })
  }
  aceptar():void {
    if (this.form.valid){
      
      this.maint.fechaanadid=this.form.value.hfecha;
      this.maint.obraArt.idObraArte=this.form.value.hobraarte;
      this.maint.usuario.idUsuario=this.form.value.husuario;

      this.fS.insert(this.maint).subscribe(data=>{
        this.fS.list().subscribe(data=>{
          this.fS.setList(data)
        });
      });
      this.router.navigate (['favoritos']);
    }
  }

}
