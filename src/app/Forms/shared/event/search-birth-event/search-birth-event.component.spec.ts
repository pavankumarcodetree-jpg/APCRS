import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBirthEventComponent } from './search-birth-event.component';

describe('SearchBirthEventComponent', () => {
  let component: SearchBirthEventComponent;
  let fixture: ComponentFixture<SearchBirthEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBirthEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBirthEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
