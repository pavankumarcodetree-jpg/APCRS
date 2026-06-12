import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPopulationDashboardComponent } from './district-population-dashboard.component';

describe('DistrictPopulationDashboardComponent', () => {
  let component: DistrictPopulationDashboardComponent;
  let fixture: ComponentFixture<DistrictPopulationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictPopulationDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistrictPopulationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
