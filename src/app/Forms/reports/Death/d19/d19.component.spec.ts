import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D19Component } from './d19.component';

describe('D19Component', () => {
  let component: D19Component;
  let fixture: ComponentFixture<D19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D19Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
