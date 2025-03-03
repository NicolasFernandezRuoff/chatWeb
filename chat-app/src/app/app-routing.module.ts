import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path : '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent , ...canActivate(() => redirectUnauthorizedTo(['/register']))}, // Asegúrate de que existe
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
