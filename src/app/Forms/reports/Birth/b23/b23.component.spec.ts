import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B23Component } from './b23.component';

describe('B23Component', () => {
  let component: B23Component;
  let fixture: ComponentFixture<B23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B23Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
