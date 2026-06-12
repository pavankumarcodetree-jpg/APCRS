import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsevenComponent } from './dashboardseven.component';

describe('DashboardsevenComponent', () => {
  let component: DashboardsevenComponent;
  let fixture: ComponentFixture<DashboardsevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardsevenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardsevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
