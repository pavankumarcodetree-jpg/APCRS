import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D16Component } from './d16.component';

describe('D16Component', () => {
  let component: D16Component;
  let fixture: ComponentFixture<D16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D16Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
