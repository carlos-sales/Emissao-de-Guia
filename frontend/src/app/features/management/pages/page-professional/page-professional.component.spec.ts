import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfessionalComponent } from './page-professional.component';

describe('PageProfessionalComponent', () => {
  let component: PageProfessionalComponent;
  let fixture: ComponentFixture<PageProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageProfessionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
