import { TestBed } from '@angular/core/testing';

import { TrainingHoursService } from './training-hours.service';

describe('TrainingHoursService', () => {
  let service: TrainingHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
