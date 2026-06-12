import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthregisterComponent } from './birthregister.component';

describe('BirthregisterComponent', () => {
  let component: BirthregisterComponent;
  let fixture: ComponentFixture<BirthregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
