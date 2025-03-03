import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from '../../service/chat-service.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../models/mensaje';
import { Auth } from '@angular/fire/auth'; // 👈 Importamos la autenticación


@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatId!: string;
  messages: Message[] = [];
  newMessage: string = '';

  constructor(
    private messagesService: ChatServiceService,
    private route: ActivatedRoute,
    private auth: Auth // 👈 Inyectamos la autenticación
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const amigoId = params.get('amigoId'); // Aquí llega el id del amigo
      const userId = this.auth.currentUser?.uid; // Tu id actual

      if (amigoId && userId) {
        //this.chatId = this.userService.getChatId(userId, amigoId); // Generamos el chatId
        console.log("chatId generado: ", this.chatId);

        this.messagesService.getMensaje(this.chatId).subscribe(messages => {
          this.messages = messages;
        });
      }
    });
  }


  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messagesService.sendMessage(this.chatId, this.newMessage);
      this.newMessage = '';
    }
  }
}
