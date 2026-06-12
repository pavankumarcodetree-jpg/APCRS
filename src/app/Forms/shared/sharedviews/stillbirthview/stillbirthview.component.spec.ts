import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StillbirthviewComponent } from './stillbirthview.component';

describe('StillbirthviewComponent', () => {
  let component: StillbirthviewComponent;
  let fixture: ComponentFixture<StillbirthviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StillbirthviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StillbirthviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
