import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';
import { Usuarios } from '../../../models/Usuarios';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditaroles',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './creaeditaroles.component.html',
  styleUrl: './creaeditaroles.component.css'
})

export class CreaeditarolesComponent implements OnInit {

form: FormGroup = new FormGroup({})

listarUsuarios: Usuarios[] = [];

roles: Roles = new Roles

constructor(
  private formBuilder: FormBuilder,
  private rS: RolesService,
  private uS: UsuarioService,
  private router: Router,
){}

ngOnInit():void{
  this.form=  this.formBuilder.group({

    hrole:['', Validators.required],
    husuario: ['', Validators.required],
  
  })

  this.uS.list().subscribe((data)=>{
    this.listarUsuarios = data
  })
}

aceptar():void{
  if(this.form.valid){
    this.roles.rol= this.form.value.hrole
    this.roles.user.idUsuario= this.form.value.husuario

    this.rS.insert(this.roles).subscribe(data=>{
      this.rS.list().subscribe(data=>{
        this.rS.setList(data)
      });
    });
    this.router.navigate(['roles']);
  } 
}

}
