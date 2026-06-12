import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthviewComponent } from './birthview.component';

describe('BirthviewComponent', () => {
  let component: BirthviewComponent;
  let fixture: ComponentFixture<BirthviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
