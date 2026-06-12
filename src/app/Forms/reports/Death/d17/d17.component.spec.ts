import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D17Component } from './d17.component';

describe('D17Component', () => {
  let component: D17Component;
  let fixture: ComponentFixture<D17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D17Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
