import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporForeignBirthComponent } from './repor-foreign-birth.component';

describe('ReporForeignBirthComponent', () => {
  let component: ReporForeignBirthComponent;
  let fixture: ComponentFixture<ReporForeignBirthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporForeignBirthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporForeignBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
