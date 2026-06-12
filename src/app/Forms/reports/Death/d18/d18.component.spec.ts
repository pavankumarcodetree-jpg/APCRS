import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D18Component } from './d18.component';

describe('D18Component', () => {
  let component: D18Component;
  let fixture: ComponentFixture<D18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D18Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
