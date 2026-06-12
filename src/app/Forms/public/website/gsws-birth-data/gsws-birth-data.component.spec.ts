import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GswsBirthDataComponent } from './gsws-birth-data.component';

describe('GswsBirthDataComponent', () => {
  let component: GswsBirthDataComponent;
  let fixture: ComponentFixture<GswsBirthDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GswsBirthDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GswsBirthDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
