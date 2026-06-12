import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchildnameComponent } from './addchildname.component';

describe('AddchildnameComponent', () => {
  let component: AddchildnameComponent;
  let fixture: ComponentFixture<AddchildnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddchildnameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddchildnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
