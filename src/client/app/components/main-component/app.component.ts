import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import User from "../../../../models/User.model";

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

  public activeUsers: Array<any> = [];

  public currentUser: any = "";

  private isUserConectedToChat = false;

  public user: any = new User("", "", this.catsIcons[0].id);


  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.chatService.onUserConnected.subscribe((message) => {
      this.isUserConectedToChat = true;
      if(!this.user.id) {
        this.user = message.user;
        this.messages = message.messages;
        this.currentUser = this.user.name;
      }
    });

    this.chatService.onMessageReceived.subscribe((message) => {
      this.messages.push(message)
      this.message = "";
    })

    this.chatService.onNewUser.subscribe((message) => {
      console.dir(message);
      this.activeUsers = message.activeUsers;
    })

  }

  selectAvatar(avatar) {
    this.user.avatar = avatar.id;
  }

  connect() {
    this.chatService.connect(this.user);
  }


  sendMessage(message: any) {
    this.chatService.sendMessage({message: message, user: this.user});
  }

  isUserConnected() {
    return this.isUserConectedToChat;
  }

}
