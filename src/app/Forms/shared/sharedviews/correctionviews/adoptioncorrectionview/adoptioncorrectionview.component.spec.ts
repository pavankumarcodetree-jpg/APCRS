import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptioncorrectionviewComponent } from './adoptioncorrectionview.component';

describe('AdoptioncorrectionviewComponent', () => {
  let component: AdoptioncorrectionviewComponent;
  let fixture: ComponentFixture<AdoptioncorrectionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptioncorrectionviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptioncorrectionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
