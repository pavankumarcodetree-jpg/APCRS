import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B14Component } from './b14.component';

describe('B14Component', () => {
  let component: B14Component;
  let fixture: ComponentFixture<B14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
