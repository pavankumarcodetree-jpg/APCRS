import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B4Component } from './b4.component';

describe('B4Component', () => {
  let component: B4Component;
  let fixture: ComponentFixture<B4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
