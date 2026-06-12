import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S4Component } from './s4.component';

describe('S4Component', () => {
  let component: S4Component;
  let fixture: ComponentFixture<S4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [S4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(S4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
