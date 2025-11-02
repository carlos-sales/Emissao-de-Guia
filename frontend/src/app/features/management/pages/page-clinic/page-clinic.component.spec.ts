import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageClinicComponent } from './page-clinic.component';

describe('PageClinicComponent', () => {
  let component: PageClinicComponent;
  let fixture: ComponentFixture<PageClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageClinicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
