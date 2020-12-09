import { TestBed } from '@angular/core/testing';

import { TechnicalService } from './technicalService.service';

describe('TechnicalServiceService', () => {
  let service: TechnicalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
