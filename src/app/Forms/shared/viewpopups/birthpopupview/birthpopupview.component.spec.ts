import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthpopupviewComponent } from './birthpopupview.component';

describe('BirthpopupviewComponent', () => {
  let component: BirthpopupviewComponent;
  let fixture: ComponentFixture<BirthpopupviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthpopupviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthpopupviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
