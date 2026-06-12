import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathseekclarificationComponent } from './deathseekclarification.component';

describe('DeathseekclarificationComponent', () => {
  let component: DeathseekclarificationComponent;
  let fixture: ComponentFixture<DeathseekclarificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathseekclarificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeathseekclarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
