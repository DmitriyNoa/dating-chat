import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  constructor() { }

  getUserAvatar(avatar) {
    return `small cat-icon cat-icon-${avatar}`;
  }

}
