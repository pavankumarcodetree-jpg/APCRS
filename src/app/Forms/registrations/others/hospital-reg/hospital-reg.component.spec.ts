import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRegComponent } from './hospital-reg.component';

describe('HospitalRegComponent', () => {
  let component: HospitalRegComponent;
  let fixture: ComponentFixture<HospitalRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HospitalRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
