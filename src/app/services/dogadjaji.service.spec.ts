import { TestBed } from '@angular/core/testing';

import { DogadjajiService } from './dogadjaji.service';

describe('DogadjajiService', () => {
  let service: DogadjajiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogadjajiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
