import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunExampleComponent } from './run-example.component';

describe('RunExampleComponent', () => {
  let component: RunExampleComponent;
  let fixture: ComponentFixture<RunExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
