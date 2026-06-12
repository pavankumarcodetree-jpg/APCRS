import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsSecLComponent } from './tabs-sec-l.component';

describe('TabsSecLComponent', () => {
  let component: TabsSecLComponent;
  let fixture: ComponentFixture<TabsSecLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsSecLComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabsSecLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
