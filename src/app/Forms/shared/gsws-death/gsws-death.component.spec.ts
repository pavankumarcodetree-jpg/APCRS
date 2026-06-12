import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GswsDeathComponent } from './gsws-death.component';

describe('GswsDeathComponent', () => {
  let component: GswsDeathComponent;
  let fixture: ComponentFixture<GswsDeathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GswsDeathComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GswsDeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
