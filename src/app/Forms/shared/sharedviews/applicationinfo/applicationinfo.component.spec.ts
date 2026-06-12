import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationinfoComponent } from './applicationinfo.component';

describe('ApplicationinfoComponent', () => {
  let component: ApplicationinfoComponent;
  let fixture: ComponentFixture<ApplicationinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
