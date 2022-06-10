import { TestBed } from '@angular/core/testing';

import { PlantstateService } from './plantstate.service';

describe('PlantstateService', () => {
  let service: PlantstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
