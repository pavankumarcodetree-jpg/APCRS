import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NacSearchAdoptionEventComponent } from './nac-search-adoption-event.component';

describe('NacSearchAdoptionEventComponent', () => {
  let component: NacSearchAdoptionEventComponent;
  let fixture: ComponentFixture<NacSearchAdoptionEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NacSearchAdoptionEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NacSearchAdoptionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
