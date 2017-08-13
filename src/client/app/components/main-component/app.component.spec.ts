import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {ChatService} from '../../services/chat.service'
import {FormsModule} from '@angular/forms';
import {UsersListComponent} from '../users-list/users-list.component';
import {MessagesComponent} from '../messages/messages.component';
import {MessageFormComponent} from '../message-form/message-form.component';
import User from '../../../../models/User.model';
import {UtilityService} from '../../services/utility.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UsersListComponent,
        MessagesComponent,
        MessageFormComponent
      ],
      imports: [FormsModule],
      providers: [ChatService, UtilityService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should show register form if user is not registered', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.isUserConectedToChat).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.user-register-form')).toBeDefined();
  }));

  it('should not show register form if user is  registered', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isUserConectedToChat = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.user-register-form')).toBeNull();
  }));

  it('should show proper header when user is registered', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.user = new User('Bob', '111', 1);
    app.currentUser = app.user.name;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').innerText).toEqual('Welcome to dating chat Bob');
  }));

  it('should select avatar for the user', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const avatar = {id: 1};
    app.user = new User('Bob', '111', 1);
    app.currentUser = app.user.name;
    app.selectAvatar(avatar);
    fixture.detectChanges();
    expect(app.user.avatar).toBe(1);
    expect(fixture.nativeElement.querySelector('.cat-icon-1').classList).toContain('active');
  }));

});
