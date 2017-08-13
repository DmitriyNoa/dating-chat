import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';
import {APP_CONSTANTS} from "../../../constants/general";
import {EventEmitter} from "@angular/core";

describe('ChatService', () => {
  const user = {name: 'Bob'}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatService]
    });
  });

  it('should be created', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));

  it('should save user to localStorage', inject([ChatService], (service: ChatService) => {
    service.saveUserToLocalStorage(user);
    const userFromLocalStorage = JSON.parse(localStorage.getItem(APP_CONSTANTS.USER_NAME));
    expect(userFromLocalStorage.name).toEqual(user.name);
  }));

  it('should setup emitters', inject([ChatService], (service: ChatService) => {
    expect(service.onUserConnected instanceof EventEmitter).toBeTruthy();
    expect(service.onMessageReceived instanceof EventEmitter).toBeTruthy();
    expect(service.onNewUser instanceof EventEmitter).toBeTruthy();
  }));

  it('should connect to socket', inject([ChatService], (service: ChatService) => {
    expect(service.socket).toBeUndefined();
    service.connect(user);
    expect(service.socket).toBeDefined();
    expect(typeof service.socket.on).toEqual('function');
  }));

});
