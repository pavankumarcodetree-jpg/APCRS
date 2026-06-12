import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionregistrationComponent } from './adoptionregistration.component';

describe('AdoptionregistrationComponent', () => {
  let component: AdoptionregistrationComponent;
  let fixture: ComponentFixture<AdoptionregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionregistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptionregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
