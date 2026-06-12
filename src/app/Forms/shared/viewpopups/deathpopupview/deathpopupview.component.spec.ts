import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathpopupviewComponent } from './deathpopupview.component';

describe('DeathpopupviewComponent', () => {
  let component: DeathpopupviewComponent;
  let fixture: ComponentFixture<DeathpopupviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathpopupviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeathpopupviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
