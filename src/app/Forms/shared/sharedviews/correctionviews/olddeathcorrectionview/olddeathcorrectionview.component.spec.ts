import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlddeathcorrectionviewComponent } from './olddeathcorrectionview.component';

describe('OlddeathcorrectionviewComponent', () => {
  let component: OlddeathcorrectionviewComponent;
  let fixture: ComponentFixture<OlddeathcorrectionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlddeathcorrectionviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OlddeathcorrectionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
