import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthRegisterOldDataComponent } from './birth-register-old-data.component';

describe('BirthRegisterOldDataComponent', () => {
  let component: BirthRegisterOldDataComponent;
  let fixture: ComponentFixture<BirthRegisterOldDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthRegisterOldDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthRegisterOldDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
