import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionpopupviewComponent } from './adoptionpopupview.component';

describe('AdoptionpopupviewComponent', () => {
  let component: AdoptionpopupviewComponent;
  let fixture: ComponentFixture<AdoptionpopupviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionpopupviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptionpopupviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
