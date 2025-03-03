import { Component } from '@angular/core';
import { UserService } from '../service/user.service';  // <-- Verifica que la ruta es correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  
  constructor(private userService: UserService, private router: Router) {}

  logout() {
    console.log('Deslogeando...');
    this.userService.logOut() // <--- Aquí ya debería reconocer `logOut()`
      .then(() => {
        console.log('Deslogeado exitosamente');
        this.router.navigate(['/login']);
      })
      .catch((error: any) => {  // <-- Le agregamos `: any` para evitar el otro error
        console.error('Error en el deslogeo:', error);
      });
  }
}
