import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Metodopago } from '../../../models/Metodopago';
import { ObraarteService } from '../../../services/obraarte.service';
import { MetodopagoService } from '../../../services/metodopago.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from '../../../services/venta.service';
import { Venta } from '../../../models/Venta';
import { ObraArte } from '../../../models/ObraArte';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditaventa',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditaventa.component.html',
  styleUrl: './creaeditaventa.component.css',
})
export class CreaeditaventaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listametodopago: Metodopago[] = [];
  listaobraarte: ObraArte[] = [];
  maint: Venta = new Venta();
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private oS: ObraarteService,
    private mS: MetodopagoService,
    private vS: VentaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hfechaVenta: ['', Validators.required],
      hprecio: ['', Validators.required],
      hobraarte: ['', Validators.required],
      hmetodopago: ['', Validators.required],
    });

    this.mS.list().subscribe((data) => {
      this.listametodopago = data;
    });
    this.oS.list().subscribe((data) => {
      this.listaobraarte = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.maint.fechaVenta = this.form.value.hfechaVenta;
      this.maint.precio = this.form.value.hprecio;
      this.maint.obraArt.idObraArte = this.form.value.hobraarte;
      this.maint.metodoPag.idMetodoPago = this.form.value.hmetodopago;

      this.vS.insert(this.maint).subscribe((data) => {
        this.vS.list().subscribe((data) => {
          this.vS.setList(data);
        });
      });
      this.router.navigate(['ventas']);
    }
  }
}

