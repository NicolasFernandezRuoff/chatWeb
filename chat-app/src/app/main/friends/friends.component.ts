import { Component } from '@angular/core';

@Component({
  selector: 'app-friends',
  standalone: false,
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  friends = ['Amigo 1', 'Amigo 2', 'Amigo 3'];
}
