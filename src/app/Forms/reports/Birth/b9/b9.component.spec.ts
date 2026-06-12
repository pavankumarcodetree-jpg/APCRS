import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B9Component } from './b9.component';

describe('B9Component', () => {
  let component: B9Component;
  let fixture: ComponentFixture<B9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
