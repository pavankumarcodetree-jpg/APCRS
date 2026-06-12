import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathhomeComponent } from './deathhome.component';

describe('DeathhomeComponent', () => {
  let component: DeathhomeComponent;
  let fixture: ComponentFixture<DeathhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeathhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
