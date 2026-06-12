import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S5Component } from './s5.component';

describe('S5Component', () => {
  let component: S5Component;
  let fixture: ComponentFixture<S5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [S5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(S5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
