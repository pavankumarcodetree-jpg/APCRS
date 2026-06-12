import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D21Component } from './d21.component';

describe('D21Component', () => {
  let component: D21Component;
  let fixture: ComponentFixture<D21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D21Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
