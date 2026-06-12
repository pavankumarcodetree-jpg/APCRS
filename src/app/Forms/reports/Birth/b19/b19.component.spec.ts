import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B19Component } from './b19.component';

describe('B19Component', () => {
  let component: B19Component;
  let fixture: ComponentFixture<B19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B19Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
