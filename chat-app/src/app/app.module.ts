import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 👈 IMPORTANTE
import { provideAuth, getAuth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './main/chat/chat.component';
import { ChatServiceService } from './service/chat-service.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ChatComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({ 
      projectId: "login-2f435", 
      appId: "1:869898521111:web:c490e53ebd4573b4c76a52", 
      storageBucket: "login-2f435.firebasestorage.app", 
      apiKey: "AIzaSyDPmpyKVTrQx9z4ZETeG-NjDZbtQ4Zqkgs", 
      authDomain: "login-2f435.firebaseapp.com", 
      messagingSenderId: "869898521111" 
    })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()) // 👈 Agregar esta línea
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
