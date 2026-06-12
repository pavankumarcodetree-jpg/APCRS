import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathRegisterOldDataComponent } from './death-register-old-data.component';

describe('DeathRegisterOldDataComponent', () => {
  let component: DeathRegisterOldDataComponent;
  let fixture: ComponentFixture<DeathRegisterOldDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathRegisterOldDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeathRegisterOldDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
