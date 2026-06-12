import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardtenComponent } from './dashboardten.component';

describe('DashboardtenComponent', () => {
  let component: DashboardtenComponent;
  let fixture: ComponentFixture<DashboardtenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardtenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardtenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
