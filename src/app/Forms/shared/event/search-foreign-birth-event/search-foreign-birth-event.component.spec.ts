import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForeignBirthEventComponent } from './search-foreign-birth-event.component';

describe('SearchForeignBirthEventComponent', () => {
  let component: SearchForeignBirthEventComponent;
  let fixture: ComponentFixture<SearchForeignBirthEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchForeignBirthEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchForeignBirthEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
