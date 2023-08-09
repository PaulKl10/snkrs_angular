import { TestBed } from '@angular/core/testing';

import { ApiEthService } from './api-eth.service';

describe('ApiEthService', () => {
  let service: ApiEthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
