import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersSecretariatDrilldownComponent } from './parameters-secretariat-drilldown.component';

describe('ParametersSecretariatDrilldownComponent', () => {
  let component: ParametersSecretariatDrilldownComponent;
  let fixture: ComponentFixture<ParametersSecretariatDrilldownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametersSecretariatDrilldownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametersSecretariatDrilldownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
