import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GswsbirthdeathDataComponent } from './gswsbirthdeath-data.component';

describe('GswsbirthdeathDataComponent', () => {
  let component: GswsbirthdeathDataComponent;
  let fixture: ComponentFixture<GswsbirthdeathDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GswsbirthdeathDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GswsbirthdeathDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
