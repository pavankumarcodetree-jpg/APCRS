import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GswsdeathdataComponent } from './gswsdeathdata.component';

describe('GswsdeathdataComponent', () => {
  let component: GswsdeathdataComponent;
  let fixture: ComponentFixture<GswsdeathdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GswsdeathdataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GswsdeathdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
