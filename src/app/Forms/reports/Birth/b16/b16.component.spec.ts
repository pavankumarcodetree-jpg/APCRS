import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B16Component } from './b16.component';

describe('B16Component', () => {
  let component: B16Component;
  let fixture: ComponentFixture<B16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B16Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
