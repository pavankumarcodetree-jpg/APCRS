import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B10Component } from './b10.component';

describe('B10Component', () => {
  let component: B10Component;
  let fixture: ComponentFixture<B10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
