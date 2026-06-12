import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldbirthcorrectionviewComponent } from './oldbirthcorrectionview.component';

describe('OldbirthcorrectionviewComponent', () => {
  let component: OldbirthcorrectionviewComponent;
  let fixture: ComponentFixture<OldbirthcorrectionviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldbirthcorrectionviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OldbirthcorrectionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
