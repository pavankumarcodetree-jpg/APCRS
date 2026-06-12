import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathCancellationComponent } from './death-cancellation.component';

describe('DeathCancellationComponent', () => {
  let component: DeathCancellationComponent;
  let fixture: ComponentFixture<DeathCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathCancellationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeathCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
