import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchstillbirthEventComponent } from './searchstillbirth-event.component';

describe('SearchstillbirthEventComponent', () => {
  let component: SearchstillbirthEventComponent;
  let fixture: ComponentFixture<SearchstillbirthEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchstillbirthEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchstillbirthEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
