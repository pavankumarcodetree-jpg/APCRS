import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataoperatorsRegComponent } from './dataoperators-reg.component';

describe('DataoperatorsRegComponent', () => {
  let component: DataoperatorsRegComponent;
  let fixture: ComponentFixture<DataoperatorsRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataoperatorsRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataoperatorsRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
