import { TestBed, inject } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityService]
    });
  });

  it('should be created', inject([UtilityService], (service: UtilityService) => {
    expect(service).toBeTruthy();
  }));

  it('should return avatar class', inject([UtilityService], (service: UtilityService) => {
    expect(service.getUserAvatar(1)).toEqual('small cat-icon cat-icon-1');
  }));
});
