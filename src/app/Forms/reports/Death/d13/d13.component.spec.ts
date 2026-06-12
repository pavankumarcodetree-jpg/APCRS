import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D13Component } from './d13.component';

describe('D13Component', () => {
  let component: D13Component;
  let fixture: ComponentFixture<D13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
