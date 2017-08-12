import { Injectable,EventEmitter } from '@angular/core';
import * as socketClient from 'socket.io-client';
import {APP_CONSTANTS} from '../../../../constants/general';

@Injectable()
export class ChatService {
  private socketUrl: any = 'http://localhost:3000';
  public socket: any;

  public onUserConnected: EventEmitter<any> = new EventEmitter();
  public onMessageReceived: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  public getMessages(): any {

  }

  public saveUserToLocalStorage(user) {
    localStorage.setItem(APP_CONSTANTS.USER_NAME, user);
  }

  public connect(user: any) {
    this.socket = socketClient(this.socketUrl);
    this.socket.on(APP_CONSTANTS.MESSAGE, (message) => {
      this.onMessageReceived.emit(message)
    });
    this.socket.on(APP_CONSTANTS.WELCOME, (message) => {
      this.saveUserToLocalStorage(message.user);
      this.onUserConnected.emit(message);
    });
  }

  public sendMessage(message: any) {
    this.socket.emit(APP_CONSTANTS.MESSAGE_SENT, message);
  }

}
