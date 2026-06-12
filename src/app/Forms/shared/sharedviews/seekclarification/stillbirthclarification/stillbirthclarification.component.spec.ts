import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StillbirthclarificationComponent } from './stillbirthclarification.component';

describe('StillbirthclarificationComponent', () => {
  let component: StillbirthclarificationComponent;
  let fixture: ComponentFixture<StillbirthclarificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StillbirthclarificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StillbirthclarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
