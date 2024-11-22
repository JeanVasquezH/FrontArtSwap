import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Evento } from '../../../models/Evento';
import { ObraArte } from '../../../models/ObraArte';
import { Usuarios } from '../../../models/Usuarios';
import { UsuarioService } from '../../../services/usuario.service';
import { ObraarteService } from '../../../services/obraarte.service';
import { EventoService } from '../../../services/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaevento',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule,MatFormFieldModule,ReactiveFormsModule, MatInputModule,MatSelectModule,MatButtonModule,CommonModule],
  templateUrl: './creaeditaevento.component.html',
  styleUrl: './creaeditaevento.component.css'
})
export class CreaeditaeventoComponent implements OnInit {

  form:FormGroup=new FormGroup({});
  evento: Evento = new Evento();
  listaUsuarios:Usuarios[]=[];
  listaobra: ObraArte[]=[];
  maint:Evento=new Evento()
  id:number = 0
  listatipo: { value: string; viewValue: string }[] = [
    { value: 'Virtual', viewValue: 'Virtual' },
    { value: 'Presencial', viewValue: 'Presencial' },
  ];
  listaubicacion: { value: string; viewValue: string }[] = [
    { value: 'Cercado de Lima', viewValue: 'Cercado de Lima' },
    { value: 'Surco', viewValue: 'Surco' },
    { value: 'Miraflores', viewValue: 'Miraflores' },
    { value: 'San Miguel', viewValue: 'San Miguel' },
    { value: 'San Miguel', viewValue: 'San Miguel' },
    { value: 'Chorrillos', viewValue: 'Chorrillos' },
  ];

  constructor(
    private formBuilder:FormBuilder, 
    private uS: UsuarioService,
    private oS: ObraarteService,
    private eS: EventoService,
    private router:Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      hdescripcion:['',Validators.required],
      hfechaInicio:['',Validators.required],
      hfechaFin:['',Validators.required],
      htipo:['',Validators.required],
      hubicacion:['',Validators.required],
      hvaloracion:['',Validators.required],
      husuario:['',Validators.required],
      hobra:['',Validators.required],
    })
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
    this.oS.list().subscribe(data=>{
      this.listaobra=data
    })
  }
  aceptar():void {
    if (this.form.valid){
      this.maint.descripcion=this.form.value.hdescripcion;
      this.maint.fechaInicio=this.form.value.hfechaInicio;
      this.maint.fechaFin=this.form.value.hfechaFin;
      this.maint.tipo=this.form.value.htipo;
      this.maint.ubicacion=this.form.value.hubicacion;
      this.maint.valoracion=this.form.value.hvaloracion;
      this.maint.usua.idUsuario=this.form.value.husuario;
      this.maint.obraArt.idObraArte=this.form.value.hobra;

      this.eS.insert(this.maint).subscribe(data=>{
        this.eS.list().subscribe(data=>{
          this.eS.setList(data)
        });
      });
      this.router.navigate (['eventos']);
    }
  }

}