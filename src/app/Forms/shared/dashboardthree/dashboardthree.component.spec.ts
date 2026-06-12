import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardthreeComponent } from './dashboardthree.component';

describe('DashboardthreeComponent', () => {
  let component: DashboardthreeComponent;
  let fixture: ComponentFixture<DashboardthreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardthreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
