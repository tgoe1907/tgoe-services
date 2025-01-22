import { TestBed } from '@angular/core/testing';

import { SportGroupsService } from './sport-groups.service';

describe('SportGroupsService', () => {
  let service: SportGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
