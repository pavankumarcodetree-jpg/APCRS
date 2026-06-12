import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthhomematerialComponent } from './birthhomematerial.component';

describe('BirthhomematerialComponent', () => {
  let component: BirthhomematerialComponent;
  let fixture: ComponentFixture<BirthhomematerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthhomematerialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthhomematerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
