import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StillbirthhomeComponent } from './stillbirthhome.component';

describe('StillbirthhomeComponent', () => {
  let component: StillbirthhomeComponent;
  let fixture: ComponentFixture<StillbirthhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StillbirthhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StillbirthhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
