import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthhomeComponent } from './birthhome.component';

describe('BirthhomeComponent', () => {
  let component: BirthhomeComponent;
  let fixture: ComponentFixture<BirthhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
