import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDeathEventComponent } from './search-death-event.component';

describe('SearchDeathEventComponent', () => {
  let component: SearchDeathEventComponent;
  let fixture: ComponentFixture<SearchDeathEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDeathEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchDeathEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
