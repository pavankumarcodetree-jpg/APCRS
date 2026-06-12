import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B12Component } from './b12.component';

describe('B12Component', () => {
  let component: B12Component;
  let fixture: ComponentFixture<B12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
