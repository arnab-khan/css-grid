import { TestBed } from '@angular/core/testing';

import { GridTutorialListService } from './grid-tutorial-list.service';

describe('GridTutorialListService', () => {
  let service: GridTutorialListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridTutorialListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
