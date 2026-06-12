import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B11Component } from './b11.component';

describe('B11Component', () => {
  let component: B11Component;
  let fixture: ComponentFixture<B11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
