import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathcorrectionviewComponent } from './deathcorrectionview.component';

describe('DeathcorrectionviewComponent', () => {
  let component: DeathcorrectionviewComponent;
  let fixture: ComponentFixture<DeathcorrectionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathcorrectionviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeathcorrectionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
