import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StillbirthcorrectionviewComponent } from './stillbirthcorrectionview.component';

describe('StillbirthcorrectionviewComponent', () => {
  let component: StillbirthcorrectionviewComponent;
  let fixture: ComponentFixture<StillbirthcorrectionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StillbirthcorrectionviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StillbirthcorrectionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
