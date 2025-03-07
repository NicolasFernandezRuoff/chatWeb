import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../service/chat-service.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/mensaje';
import { Auth } from '@angular/fire/auth'; // 👈 Importamos la autenticación
import { FriendsService } from '../service/friends.service';


@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  selectedFriendUid: string | null = null;
  chatId: string = '';

  constructor(
    private amigoService: FriendsService,
    private messagesService: ChatServiceService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.amigoService.amigoSeleccionado$.subscribe(amigoUid => {
      if (amigoUid) {
        this.selectedFriendUid = amigoUid;
        this.generarChatId();
        this.cargarMensajes();
      }
    });
  }

  generarChatId() {
    const userId = this.auth.currentUser?.uid;
    if (userId && this.selectedFriendUid) {
      this.chatId = userId < this.selectedFriendUid 
        ? `${userId}_${this.selectedFriendUid}` 
        : `${this.selectedFriendUid}_${userId}`;
      console.log("Chat ID generado:", this.chatId);
    }
  }

  cargarMensajes() {
    if (this.chatId) {
      this.messagesService.getMensaje(this.chatId).subscribe(messages => {
        this.messages = messages;
      });
    }
  }

  sendMessage() {
    if (this.newMessage.trim() !== '' && this.chatId) {
      this.messagesService.sendMessage(this.chatId, this.newMessage);
      this.newMessage = '';
    }
  }
}