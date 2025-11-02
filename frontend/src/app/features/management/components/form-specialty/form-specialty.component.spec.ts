import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSpecialtyComponent } from './form-specialty.component';

describe('FormSpecialtyComponent', () => {
  let component: FormSpecialtyComponent;
  let fixture: ComponentFixture<FormSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSpecialtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
