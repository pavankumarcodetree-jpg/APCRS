import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S7Component } from './s7.component';

describe('S7Component', () => {
  let component: S7Component;
  let fixture: ComponentFixture<S7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [S7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(S7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
