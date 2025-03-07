import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, orderBy, collectionData } from '@angular/fire/firestore';
import { Auth, User, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Message } from '../models/mensaje';


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor( private firestore: Firestore, private auth:Auth ) { }

  getMensaje(chatId: string): Observable<Message[]> {
    const mensajesCollection = collection(this.firestore, `chats/${chatId}/messages`);
    const q = query(mensajesCollection, orderBy('timestamp')); // query(Algo, ordenBy('algo')) sirve para obtener los mensajes ordenados por tiempo el "timestamp" es el tiempo en el que se envió el mensaje
    return collectionData(q, {idField: 'id'}) as Observable<Message[]>;
  }

  async sendMessage(chatId: string, contenido: string) {
    const currentUser = this.auth.currentUser;
    if (!currentUser) return; // Si no hay usuario autenticado, salir

    const message: Message = {
      chatId,
      usuarioId: currentUser.uid, // ID del usuario autenticado
      contenido,
      timestamp: Date.now()
    };

    const messagesRef = collection(this.firestore, `chats/${chatId}/messages`);
    await addDoc(messagesRef, message);
  }


}