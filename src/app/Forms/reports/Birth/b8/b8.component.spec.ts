import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B8Component } from './b8.component';

describe('B8Component', () => {
  let component: B8Component;
  let fixture: ComponentFixture<B8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
