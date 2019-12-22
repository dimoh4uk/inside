import { TestBed } from '@angular/core/testing';

import { PageLoadersServiceService } from './page-loaders-service.service';

describe('PageLoadersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageLoadersServiceService = TestBed.get(PageLoadersServiceService);
    expect(service).toBeTruthy();
  });
});
