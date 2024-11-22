import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { Comunidad } from '../../../models/Comunidad';
import { ComunidadService } from '../../../services/comunidad.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

// Definimos el formato de fecha que queremos (DD/MM/YYYY)
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'l',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-creaeditacomunidad',
  standalone: true,
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideNativeDateAdapter(),
  ],
  imports: [MatDatepickerModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, CommonModule],
  templateUrl: './creaeditacomunidad.component.html',
  styleUrls: ['./creaeditacomunidad.component.css']
})
export class CreaeditacomunidadComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  comunidad: Comunidad = new Comunidad();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cS: ComunidadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Aseguramos que solo tome la fecha, sin horas.

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', [Validators.required, Validators.maxLength(20), this.wordLimitValidator(20)]],
      hdescripcion: ['', [Validators.required, Validators.maxLength(250), this.wordLimitValidator(50)]],
      hfecha: ['', [Validators.required, this.dateTodayValidator(today)]],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.comunidad.idComunidad = this.form.value.hcodigo;
      this.comunidad.nombre = this.form.value.hnombre;
      this.comunidad.descripcion = this.form.value.hdescripcion;
      this.comunidad.fechaCreacion = this.form.value.hfecha;

      if (this.edicion) {
        this.cS.update(this.comunidad).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.comunidad).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['comunidades']);
    }
  }

  init() {
    if (this.edicion && this.id) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.idComunidad,
          hnombre: data.nombre,
          hdescripcion: data.descripcion,
          hfecha: data.fechaCreacion,
        });
      });
    }
  }

  wordLimitValidator(maxWords: number) {
    return (control: any) => {
      if (!control.value) return null;
      const wordCount = control.value.split(/\s+/).filter((word: any) => word).length;
      return wordCount > maxWords ? { wordLimit: { maxWords, actualWords: wordCount } } : null;
    };
  }

  dateTodayValidator(today: Date) {
    return (control: any) => {
      if (!control.value) return null;
      const selectedDate = new Date(control.value);
      selectedDate.setHours(0, 0, 0, 0);
      return selectedDate.getTime() !== today.getTime() ? { invalidDate: true } : null;
    };
  }
}