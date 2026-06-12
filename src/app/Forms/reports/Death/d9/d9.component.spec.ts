import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D9Component } from './d9.component';

describe('D9Component', () => {
  let component: D9Component;
  let fixture: ComponentFixture<D9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
