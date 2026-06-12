import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNineComponent } from './dashboard-nine.component';

describe('DashboardNineComponent', () => {
  let component: DashboardNineComponent;
  let fixture: ComponentFixture<DashboardNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
