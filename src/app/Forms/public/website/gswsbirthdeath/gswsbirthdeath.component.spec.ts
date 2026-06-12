import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GswsbirthdeathComponent } from './gswsbirthdeath.component';

describe('GswsbirthdeathComponent', () => {
  let component: GswsbirthdeathComponent;
  let fixture: ComponentFixture<GswsbirthdeathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GswsbirthdeathComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GswsbirthdeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
