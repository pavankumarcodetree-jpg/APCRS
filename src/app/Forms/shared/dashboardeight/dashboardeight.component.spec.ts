import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardeightComponent } from './dashboardeight.component';

describe('DashboardeightComponent', () => {
  let component: DashboardeightComponent;
  let fixture: ComponentFixture<DashboardeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardeightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
