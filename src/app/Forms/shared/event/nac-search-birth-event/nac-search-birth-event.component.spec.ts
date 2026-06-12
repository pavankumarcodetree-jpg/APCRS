import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NacSearchBirthEventComponent } from './nac-search-birth-event.component';

describe('NacSearchBirthEventComponent', () => {
  let component: NacSearchBirthEventComponent;
  let fixture: ComponentFixture<NacSearchBirthEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NacSearchBirthEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NacSearchBirthEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
