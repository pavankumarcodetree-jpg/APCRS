import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainregistrationComponent } from './mainregistration.component';

describe('MainregistrationComponent', () => {
  let component: MainregistrationComponent;
  let fixture: ComponentFixture<MainregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainregistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
