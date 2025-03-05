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
import { connectFirestoreEmulator } from 'firebase/firestore';
import { environment } from '../environments/environment';



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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.firebase.emulator) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
        console.log("🔥 Firestore Emulator conectado en localhost:8080");
      }
      return firestore;
    }),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.firebase.emulator) {
        console.log("🔑 Autenticación habilitada con Firebase Emulator");
      }
      return auth;
   })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
