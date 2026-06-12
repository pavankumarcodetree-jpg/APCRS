import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthCancellationComponent } from './birth-cancellation.component';

describe('BirthCancellationComponent', () => {
  let component: BirthCancellationComponent;
  let fixture: ComponentFixture<BirthCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthCancellationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
