import {Component, OnInit} from '@angular/core';
import {ChatService} from "./services/chat.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  public catsIcons: Array<any> = [
    {name: 'avatar 0', id: 0},
    {name: 'avatar 1', id: 1},
    {name: 'avatar 2', id: 2},
    {name: 'avatar 3', id: 3},
    {name: 'avatar 4', id: 4},
    {name: 'avatar 5', id: 5}
  ];

  public message: any = "";

  public messages: Array<any> = [];

  private isUserConectedToChat = false;

  public user: any = {
    name: 'Grumpy cat',
    avatar: this.catsIcons[0].id
  };


  constructor(public chatService: ChatService) {

  }

  ngOnInit() {
    this.chatService.onUserConnected.subscribe((message) => {
      console.log(message);
      this.isUserConectedToChat = true;
      this.user.id = this.user.id || message.user;
    });

    this.chatService.onMessageReceived.subscribe((message) => {
      console.log(message);
      this.messages.push(message)
    })
  }

  selectAvatar(avatar) {
    this.user.avatar = avatar.id;
  }

  connect() {
    this.chatService.connect(this.user);
  }

  public sendMessage() {
    this.chatService.sendMessage({message: this.message, user: this.user});
  }

  public isUserConnected() {
    return this.isUserConectedToChat;
  }
}
