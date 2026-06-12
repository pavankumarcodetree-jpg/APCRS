import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B13Component } from './b13.component';

describe('B13Component', () => {
  let component: B13Component;
  let fixture: ComponentFixture<B13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
