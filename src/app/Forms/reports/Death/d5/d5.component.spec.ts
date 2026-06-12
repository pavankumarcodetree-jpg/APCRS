import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D5Component } from './d5.component';

describe('D5Component', () => {
  let component: D5Component;
  let fixture: ComponentFixture<D5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
