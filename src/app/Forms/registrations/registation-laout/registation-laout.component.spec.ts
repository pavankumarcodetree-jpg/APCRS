import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistationLaoutComponent } from './registation-laout.component';

describe('RegistationLaoutComponent', () => {
  let component: RegistationLaoutComponent;
  let fixture: ComponentFixture<RegistationLaoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistationLaoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistationLaoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
