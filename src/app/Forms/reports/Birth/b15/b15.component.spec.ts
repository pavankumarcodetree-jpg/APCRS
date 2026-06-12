import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B15Component } from './b15.component';

describe('B15Component', () => {
  let component: B15Component;
  let fixture: ComponentFixture<B15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
