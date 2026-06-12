import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NacSearchDeathEventComponent } from './nac-search-death-event.component';

describe('NacSearchDeathEventComponent', () => {
  let component: NacSearchDeathEventComponent;
  let fixture: ComponentFixture<NacSearchDeathEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NacSearchDeathEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NacSearchDeathEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
