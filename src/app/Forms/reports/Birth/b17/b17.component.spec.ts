import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B17Component } from './b17.component';

describe('B17Component', () => {
  let component: B17Component;
  let fixture: ComponentFixture<B17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B17Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
