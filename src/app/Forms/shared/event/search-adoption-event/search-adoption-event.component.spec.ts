import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAdoptionEventComponent } from './search-adoption-event.component';

describe('SearchAdoptionEventComponent', () => {
  let component: SearchAdoptionEventComponent;
  let fixture: ComponentFixture<SearchAdoptionEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAdoptionEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchAdoptionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
