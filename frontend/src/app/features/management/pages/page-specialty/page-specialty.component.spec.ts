import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSpecialtyComponent } from './page-specialty.component';

describe('PageSpecialtyComponent', () => {
  let component: PageSpecialtyComponent;
  let fixture: ComponentFixture<PageSpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSpecialtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
