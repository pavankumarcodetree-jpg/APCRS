import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSixComponent } from './dashboard-six.component';

describe('DashboardSixComponent', () => {
  let component: DashboardSixComponent;
  let fixture: ComponentFixture<DashboardSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
