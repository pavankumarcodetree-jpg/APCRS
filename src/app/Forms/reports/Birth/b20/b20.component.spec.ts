import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B20Component } from './b20.component';

describe('B20Component', () => {
  let component: B20Component;
  let fixture: ComponentFixture<B20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B20Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
