import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionviewComponent } from './adoptionview.component';

describe('AdoptionviewComponent', () => {
  let component: AdoptionviewComponent;
  let fixture: ComponentFixture<AdoptionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
