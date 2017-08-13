import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {ChatService} from '../../services/chat.service'
import {FormsModule} from '@angular/forms';
import {UsersListComponent} from '../users-list/users-list.component';
import {MessagesComponent} from '../messages/messages.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UsersListComponent,
        MessagesComponent
      ],
      imports: [FormsModule],
      providers: [ChatService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
