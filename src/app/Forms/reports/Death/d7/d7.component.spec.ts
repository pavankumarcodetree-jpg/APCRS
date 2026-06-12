import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D7Component } from './d7.component';

describe('D7Component', () => {
  let component: D7Component;
  let fixture: ComponentFixture<D7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
