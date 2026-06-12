import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D15Component } from './d15.component';

describe('D15Component', () => {
  let component: D15Component;
  let fixture: ComponentFixture<D15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
