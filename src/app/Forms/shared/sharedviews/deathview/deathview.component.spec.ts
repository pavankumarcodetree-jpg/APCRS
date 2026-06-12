import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathviewComponent } from './deathview.component';

describe('DeathviewComponent', () => {
  let component: DeathviewComponent;
  let fixture: ComponentFixture<DeathviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeathviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
