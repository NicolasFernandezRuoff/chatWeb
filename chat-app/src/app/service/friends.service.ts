import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, updateDoc, arrayUnion, arrayRemove, addDoc } from '@angular/fire/firestore';
import { getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  constructor(private firestore: Firestore) {}
  
  // Enviar solicitud de amistad
  async sendFriendRequest(from: string, to: string) {
    try {
      console.log(`📩 Enviando solicitud de: ${from} a ${to}`);
      const friendRequestsRef = collection(this.firestore, 'friendRequests');
      const request = await addDoc(friendRequestsRef, { from, to, status: 'pending' });
      console.log('✅ Solicitud enviada con ID:', request.id);
    } catch (error) {
      console.error('❌ Error al enviar solicitud:', error);
    }
  }
  

  // Aceptar solicitud de amistad
  async acceptFriendRequest(requestId: string) {
    try {
      const requestRef = doc(this.firestore, 'friendRequests', requestId);
      const requestSnap = await getDoc(requestRef);

      if (requestSnap.exists()) {
        const { from, to } = requestSnap.data();

        // Actualizar el estado de la solicitud
        await updateDoc(requestRef, { status: 'accepted' });

        // Agregar ambos usuarios a la lista de amigos
        await this.addFriend(from, to);
        console.log('✅ Amistad aceptada:', from, to);
        await this.addFriend(to, from);
        console.log('✅ Amistad aceptada:', to, from);
      }
    } catch (error) {
      console.error('Error al aceptar solicitud:', error);
    }
  }

  // Rechazar solicitud de amistad
  async rejectFriendRequest(requestId: string) {
    try {
      const requestRef = doc(this.firestore, 'friendRequests', requestId);
      await updateDoc(requestRef, { status: 'rejected' });
    } catch (error) {
      console.error('Error al rechazar solicitud:', error);
    }
  }

  // Eliminar un amigo
  async removeFriend(userId: string, friendId: string) {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      const friendRef = doc(this.firestore, 'users', friendId);

      await updateDoc(userRef, { friends: arrayRemove(friendId) });
      await updateDoc(friendRef, { friends: arrayRemove(userId) });
    } catch (error) {
      console.error('Error al eliminar amigo:', error);
    }
  }

  // Agregar un usuario a la lista de amigos
  private async addFriend(userId: string, friendId: string) {
    try {
      console.log('📌 Buscando usuario para agregar amigo:', userId);
      const userRef = doc(this.firestore, 'users', userId);
      console.log('🔍 Buscando usuario:', userRef);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        console.error(`❌ No se encontró el usuario con ID: ${userId}`);
        return;
      }
  
      console.log('✅ Usuario encontrado, agregando amigo:', friendId);
      await updateDoc(userRef, { friends: arrayUnion(friendId) });
      console.log('👥 Amigo agregado:', friendId, 'a', userId);
    } catch (error) {
      console.error('Error al agregar amigo:', error);
    }
  }
  // Obtener datos de un usuario por su ID
  async getUserDoc(userId: string) {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      const userSnap = await getDoc(userRef);
      return userSnap.exists() ? userSnap.data() : null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }

  // Obtener la lista de amigos del usuario
  async getUserFriends(userId: string): Promise<string[]> {
    const userDoc = await this.getUserDoc(userId);
    return userDoc ? userDoc['friends'] || [] : [];
  }

  // Obtener solicitudes de amistad pendientes
  async getFriendRequests(userId: string): Promise<{ id: string, from: string, fromName: string }[]> {
    try {
      const friendRequestsRef = collection(this.firestore, 'friendRequests');
      const q = query(friendRequestsRef, where('to', '==', userId), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);

      const requests = [];
      for (const docSnap of querySnapshot.docs) {
        const { from } = docSnap.data();
        const fromUser = await this.getUserDoc(from);
        requests.push({
          id: docSnap.id,
          from,
          fromName: fromUser ? fromUser['email'] : 'Usuario desconocido'
        });
      }

      return requests;
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
      return [];
    }
  }

  // Obtener usuario por email
  async getUserByEmail(email: string): Promise<{ uid: string } | null> {
    try {
      console.log('📌 Buscando usuario con email:', email);
      
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
  
      console.log('🔍 Resultado completo de la consulta:', querySnapshot.docs.map(doc => doc.data()));
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        console.log('✅ Usuario encontrado:', userDoc.data());
        return { uid: userDoc.id, ...userDoc.data() };
      } else {
        console.warn('⚠️ Usuario no encontrado');
      }
    } catch (error) {
      console.error('❌ Error al buscar usuario por email:', error);
    }
    return null;
  }

  
  
}
