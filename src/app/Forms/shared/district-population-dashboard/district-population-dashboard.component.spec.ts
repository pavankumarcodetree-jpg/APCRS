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

  it('should match Alluri district names with Seeta/Seetha spelling variants', () => {
    const matchesDistrictName = (component as any).matchesDistrictName.bind(component);

    expect(matchesDistrictName('Alluri Seeta Rama Raju', 'Alluri Seetha Rama Raju')).toBeTrue();
    expect(matchesDistrictName('Alluri Sitharama Raju', 'Alluri Seetha Rama Raju')).toBeTrue();
  });
});
