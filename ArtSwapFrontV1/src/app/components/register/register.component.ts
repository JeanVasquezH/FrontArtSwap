import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(public route: ActivatedRoute){}

  /*
  encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  */ 

  /*
  register() {
    const usuario = new Usuarios();
    usuario.username = this.form.value.username;
    usuario.password = this.encryptPassword(this.form.value.password); // Encriptar antes de enviar
    usuario.enable = true;

    this.usuarioService.insert(usuario).subscribe(() => {
      console.log('Usuario registrado con éxito');
    });
  */ 
}
