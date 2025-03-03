import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  FormularioRegistro: FormGroup;
  emailLogeado: boolean = false;
  faltaEmail: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.FormularioRegistro = new FormGroup ({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    this.FormularioRegistro.valueChanges.subscribe((valor) => {
      console.log(valor);
    });
  }

  irALogin() {
    this.router.navigate(['/login']).then(() => {
      console.log('Navegación a /login exitosa');
    }).catch(error => {
      console.error('Error en la navegación:', error);
    });
  }
  


  ngOnDestroy(): void {
    console.log('onDestroy');
  }


  enviar() {
    this.userService.register(this.FormularioRegistro.value)
    .then(respuesta => {
      console.log('Registro exitoso, navegando a login...');
      this.router.navigate(['/login']);
    })
    .catch(error => {
      console.error('Error en el registro:', error);
      if (error.code === 'auth/email-already-in-use') {
        this.emailLogeado = true;
      } else if (error.code === 'auth/invalid-email') {
        this.faltaEmail = true;
      }
    });
  }

  hasErrors(control: string, errorType: string) {
    return this.FormularioRegistro.get(control)?.hasError(errorType) && this.FormularioRegistro.get(control)?.touched;
  }

  registerWithGoogle() {
    this.userService.loginWithGoogle()
      .then(respuesta => {
        console.log('Registro con Google exitoso');
        this.router.navigate(['/main']);
      })
      .catch(error => {
        console.error('Error en el registro con Google:', error);
        alert("Error en el registro con Google: " + error.message);
      });
  }
  
}
