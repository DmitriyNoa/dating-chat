import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Output()
  public onMessageEnter: EventEmitter<any> = new EventEmitter();

  public message: any = "";

  constructor() { }

  ngOnInit() {
  }

  public enterMessage(event?: Event) {
    if(event) {
      event.preventDefault();
    }
    this.onMessageEnter.emit(this.message);
    this.message = "";
  }

  processPress(event) {
    if(event.code==="Enter") {
      event.preventDefault();
      this.enterMessage();
    };
  }

}
