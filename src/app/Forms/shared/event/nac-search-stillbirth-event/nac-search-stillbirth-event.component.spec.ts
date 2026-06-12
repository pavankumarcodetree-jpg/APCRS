import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NacSearchStillbirthEventComponent } from './nac-search-stillbirth-event.component';

describe('NacSearchStillbirthEventComponent', () => {
  let component: NacSearchStillbirthEventComponent;
  let fixture: ComponentFixture<NacSearchStillbirthEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NacSearchStillbirthEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NacSearchStillbirthEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
