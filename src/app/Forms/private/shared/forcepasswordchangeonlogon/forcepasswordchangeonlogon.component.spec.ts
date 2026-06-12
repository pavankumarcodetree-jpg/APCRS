import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcepasswordchangeonlogonComponent } from './forcepasswordchangeonlogon.component';

describe('ForcepasswordchangeonlogonComponent', () => {
  let component: ForcepasswordchangeonlogonComponent;
  let fixture: ComponentFixture<ForcepasswordchangeonlogonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForcepasswordchangeonlogonComponent]
    });
    fixture = TestBed.createComponent(ForcepasswordchangeonlogonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
