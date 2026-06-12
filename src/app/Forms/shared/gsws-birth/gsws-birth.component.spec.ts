import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GswsBirthComponent } from './gsws-birth.component';

describe('GswsBirthComponent', () => {
  let component: GswsBirthComponent;
  let fixture: ComponentFixture<GswsBirthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GswsBirthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GswsBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
