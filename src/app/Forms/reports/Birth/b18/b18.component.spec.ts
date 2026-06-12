import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B18Component } from './b18.component';

describe('B18Component', () => {
  let component: B18Component;
  let fixture: ComponentFixture<B18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B18Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
