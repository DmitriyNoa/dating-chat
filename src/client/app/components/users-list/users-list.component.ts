import {Component, Input, OnInit} from '@angular/core';
import User from "../../../../models/User.model";
import {UtilityService} from "../../services/utility.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input()
  public users: Array<any> = [];

  constructor(public utility: UtilityService) { }

  ngOnInit() {
  }

}
