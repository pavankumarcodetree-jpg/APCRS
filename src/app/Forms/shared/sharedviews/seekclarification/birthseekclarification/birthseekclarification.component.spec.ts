import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthseekclarificationComponent } from './birthseekclarification.component';

describe('BirthseekclarificationComponent', () => {
  let component: BirthseekclarificationComponent;
  let fixture: ComponentFixture<BirthseekclarificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthseekclarificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthseekclarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
