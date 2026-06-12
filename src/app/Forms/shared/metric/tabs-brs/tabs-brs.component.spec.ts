import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsBRSComponent } from './tabs-brs.component';

describe('TabsBRSComponent', () => {
  let component: TabsBRSComponent;
  let fixture: ComponentFixture<TabsBRSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsBRSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabsBRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
