import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D14Component } from './d14.component';

describe('D14Component', () => {
  let component: D14Component;
  let fixture: ComponentFixture<D14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
