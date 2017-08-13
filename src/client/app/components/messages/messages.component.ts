import {Component, Input, OnInit} from '@angular/core';
import Message from '../../../../models/Message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Input()
  public messages: Array<any> = [];

  @Input()
  public user: any;

  constructor() { }

  ngOnInit() {
  }

}
