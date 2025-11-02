import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutMobileComponent } from './main-layout-mobile.component';

describe('MainLayoutMobileComponent', () => {
  let component: MainLayoutMobileComponent;
  let fixture: ComponentFixture<MainLayoutMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
