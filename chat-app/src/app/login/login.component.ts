import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  FormularioRegistro: FormGroup;


  constructor(private userService: UserService, private router: Router) {
    this.FormularioRegistro = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    this.FormularioRegistro.valueChanges.subscribe((valor) => {
      console.log(valor);
    });
  }

  ngOnDestroy(): void {
    console.log('onDestroy');
  }

  enviar() {
    if (this.FormularioRegistro.invalid) {
      console.error("Formulario inválido. Verifica los datos.");
      return;
    }
  
    this.userService.login(this.FormularioRegistro.value)
      .then(respuesta => {
        console.log('Login exitoso, navegando a main...');
        this.router.navigate(['/main']);
      })
      .catch(error => {
        console.error('Error en el login:', error);
        alert("Error en el login: " + error.message); // Muestra el error al usuario
      });
  }
  

  irARegister() {
    this.router.navigateByUrl('/register').then(success => {
      if (success) {
        console.log('Redirigido a /register correctamente');
      } else {
        console.error('Error en la redirección');
      }
    }).catch(error => {
      console.error('Error en la navegación:', error);
    });
  }
  

loginWithGoogle() {
  this.userService.loginWithGoogle()
    .then(respuesta => {
      console.log('Login con Google exitoso');
      this.router.navigate(['/main']);
    })
    .catch(error => {
      console.error('Error en el login con Google:', error);
      alert("Error en el login con Google: " + error.message);
    });
}


}