import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCitiesComponent } from './page-cities.component';

describe('PageCitiesComponent', () => {
  let component: PageCitiesComponent;
  let fixture: ComponentFixture<PageCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
