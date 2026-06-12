import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringReportComponent } from './monitoring-report.component';

describe('MonitoringReportComponent', () => {
  let component: MonitoringReportComponent;
  let fixture: ComponentFixture<MonitoringReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitoringReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
