import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderlayoutComponent } from './headerlayout.component';

describe('HeaderlayoutComponent', () => {
  let component: HeaderlayoutComponent;
  let fixture: ComponentFixture<HeaderlayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderlayoutComponent]
    });
    fixture = TestBed.createComponent(HeaderlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
