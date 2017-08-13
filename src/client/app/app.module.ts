import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/main-component/app.component';
import {ChatService} from './services/chat.service';
import {FormsModule} from "@angular/forms";
import { MessagesComponent } from './components/messages/messages.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import {UtilityService} from './services/utility.service';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    UsersListComponent,
    MessageFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ChatService,
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
