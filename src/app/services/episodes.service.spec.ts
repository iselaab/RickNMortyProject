import { TestBed } from '@angular/core/testing';

import { EpisodesService } from './episodes.service';

xdescribe('EpisodesService', () => {
  let service: EpisodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpisodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
