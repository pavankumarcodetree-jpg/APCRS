import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthcorrectionviewComponent } from './birthcorrectionview.component';

describe('BirthcorrectionviewComponent', () => {
  let component: BirthcorrectionviewComponent;
  let fixture: ComponentFixture<BirthcorrectionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthcorrectionviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthcorrectionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
