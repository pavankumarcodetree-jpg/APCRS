import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationUnitComponent } from './registration-unit.component';

describe('RegistrationUnitComponent', () => {
  let component: RegistrationUnitComponent;
  let fixture: ComponentFixture<RegistrationUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
