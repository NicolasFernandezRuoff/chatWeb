import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, updateProfile } from '@angular/fire/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private firestore: Firestore) { }
  async register({ username, email, password }: any) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    console.log('✅ Usuario autenticado:', user);
  
    await updateProfile(user, { displayName: username });
    console.log('✅ Perfil actualizado con username:', username);
  
    await setDoc(doc(this.firestore, 'users', user.uid), {
      uid: user.uid,
      email: email.toLowerCase(),
      username: username,
      friends: [],
    });
    console.log('🔥 Usuario guardado con ID fijo:', user.uid);
  }
  
  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;
  
      console.log('✅ Usuario autenticado con Google:', user);
  
      const userRef = doc(this.firestore, 'users', user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        console.log('🔥 Nuevo usuario con Google, guardándolo en Firestore...');
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email ? user.email.toLowerCase() : '',
          username: user.displayName,
          friends: [],
        });
        console.log('📌 Usuario guardado en Firestore:', user.uid);
      } else {
        console.log('🎯 Usuario ya existente con Google, no se guarda de nuevo.');
      }
    } catch (error) {
      console.error('❌ Error al iniciar sesión con Google:', error);
    }
  }

  
  logOut(): Promise<void> {
    return signOut(this.auth);
  }


}
