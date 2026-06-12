import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D11Component } from './d11.component';

describe('D11Component', () => {
  let component: D11Component;
  let fixture: ComponentFixture<D11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
