import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B6Component } from './b6.component';

describe('B6Component', () => {
  let component: B6Component;
  let fixture: ComponentFixture<B6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
