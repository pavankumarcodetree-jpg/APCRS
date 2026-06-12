import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersVillageDrilldownComponent } from './parameters-village-drilldown.component';

describe('ParametersVillageDrilldownComponent', () => {
  let component: ParametersVillageDrilldownComponent;
  let fixture: ComponentFixture<ParametersVillageDrilldownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametersVillageDrilldownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametersVillageDrilldownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
