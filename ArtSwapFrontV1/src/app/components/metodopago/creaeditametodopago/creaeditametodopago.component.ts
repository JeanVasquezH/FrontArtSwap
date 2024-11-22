import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Metodopago } from '../../../models/Metodopago';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { MetodopagoService } from '../../../services/metodopago.service';

@Component({
  selector: 'app-creaeditametodopago',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule ,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditametodopago.component.html',
  styleUrl: './creaeditametodopago.component.css'
})
export class CreaeditametodopagoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  metodopago : Metodopago = new Metodopago();

  id: number = 0;
  edicion: boolean = false;

  listarMetodosPago:{value: String; viewValue: string}[]=[
    {value: 'yape', viewValue: 'yape'},
    {value: 'tarjeta de credito', viewValue: 'tarjeta de credito'},
    {value: 'efectivo', viewValue: 'efectivo'},
    {value: 'transferencia', viewValue: 'transferencia'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private mS: MetodopagoService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id = data['id'];
      this.edicion = data['id'] !=null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo:[''],
      htipo:['', Validators.required],
      hdescripcion:['',Validators.required],
    });
  }

  aceptar(){
    if(this.form.valid){
      this.metodopago.idMetodoPago= this.form.value.hcodigo;
      this.metodopago.tipo = this.form.value.htipo;
      this.metodopago.descripcion= this.form.value.hdescripcion;
      if(this.edicion){
        this.mS.update(this.metodopago).subscribe(data=>{
          this.mS.list().subscribe(data=>{
            this.mS.setlist(data)
          })
        });
      }else{
        this.mS.insert(this.metodopago).subscribe((data)=>{
          this.mS.list().subscribe((data)=>{
            this.mS.setlist(data);
          });
        });
      }
    }
    else{
      console.error("formulario invalido")
    }
    this.router.navigate(['metodoPagos']);
  }

  init(){
    if(this.edicion){
      this.mS.listId(this.id).subscribe((data)=>{
        this.form= new FormGroup({
          hcodigo: new FormControl(data.idMetodoPago),
          htipo: new FormControl(data.tipo),
          hdescripcion: new FormControl(data.descripcion),
        });
      });
    }
  }
}