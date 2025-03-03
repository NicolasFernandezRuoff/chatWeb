import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, updateProfile } from '@angular/fire/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  register({ username, email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {        const user = userCredential.user;

        // Actualizar el displayName con el username
        return updateProfile(user, { displayName: username })
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        throw error;
      });
  }

  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  
  logOut(): Promise<void> {
    return signOut(this.auth);
  }


}
