import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthAddChildNameComponent } from './birth-add-child-name.component';

describe('BirthAddChildNameComponent', () => {
  let component: BirthAddChildNameComponent;
  let fixture: ComponentFixture<BirthAddChildNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthAddChildNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthAddChildNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
