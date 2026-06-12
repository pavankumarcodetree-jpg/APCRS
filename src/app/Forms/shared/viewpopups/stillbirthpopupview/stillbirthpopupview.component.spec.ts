import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StillbirthpopupviewComponent } from './stillbirthpopupview.component';

describe('StillbirthpopupviewComponent', () => {
  let component: StillbirthpopupviewComponent;
  let fixture: ComponentFixture<StillbirthpopupviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StillbirthpopupviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StillbirthpopupviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
