import { Component } from '@angular/core';
import { UserService } from '../service/user.service';  // <-- Verifica que la ruta es correcta
import { Router } from '@angular/router';
import { FriendsService } from '../service/friends.service';
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  userId: string = '';
  friends: string[] = [];
  friendRequests: { id: string, from: string, fromName: string }[] = [];
  searchEmail: string = '';
  friendsPanelVisible = false;
  friendsrequest = false;

  constructor(private userService: UserService, private router: Router, private friendsService: FriendsService, private auth: Auth) {}


  ngOnInit() {
    user(this.auth).subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.loadFriends();
        this.loadFriendRequests();
      }
    });
  }

  
  async sendFriendRequest() {
    if (this.searchEmail.trim() !== '') {
      console.log('Buscando usuario con email:', this.searchEmail.trim().toLowerCase());
      
      const userTo = await this.friendsService.getUserByEmail(this.searchEmail.trim().toLowerCase());
      
      if (userTo) {
        console.log('Usuario encontrado:', userTo);
        await this.friendsService.sendFriendRequest(this.userId, userTo.uid);
        if (this.userId === userTo.uid) {
          alert('No puedes enviarte una solicitud a ti mismo'); // Cambiar en un futuro por un div lindo

        }if(this.friends.includes(userTo.uid)) {
          alert('Ya eres amigo de este usuario')
        } else {
          alert(`Solicitud enviada a ${this.searchEmail}`);
          this.searchEmail = '';
          this.loadFriendRequests();
        }
      } else {
        alert('Usuario no encontrado');
      }
    }
  }
  
  async loadFriends() {
    this.friends = await this.friendsService.getUserFriends(this.userId);
  }

  async loadFriendRequests() {
    this.friendRequests = await this.friendsService.getFriendRequests(this.userId);
  }

  async acceptRequest(requestId: string) {
    await this.friendsService.acceptFriendRequest(requestId);
    this.loadFriends();
    this.loadFriendRequests();
  }

  async rejectRequest(requestId: string) {
    await this.friendsService.rejectFriendRequest(requestId);
    this.loadFriendRequests();
  }

  async removeFriend(friendId: string) {
    await this.friendsService.removeFriend(this.userId, friendId);
    this.loadFriends();
  }


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

  toggleFriendsPanelFriends() {
    this.friendsPanelVisible = !this.friendsPanelVisible;
  }
  toggleFriendsPanelRequest(){
    this.friendsrequest = !this.friendsrequest;
  }

    

}
