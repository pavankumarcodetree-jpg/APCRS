import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B22Component } from './b22.component';

describe('B22Component', () => {
  let component: B22Component;
  let fixture: ComponentFixture<B22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B22Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(B22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
