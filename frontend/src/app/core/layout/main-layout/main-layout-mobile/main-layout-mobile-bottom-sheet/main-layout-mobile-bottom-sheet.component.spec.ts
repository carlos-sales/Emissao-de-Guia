import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutMobileBottomSheetComponent } from './main-layout-mobile-bottom-sheet.component';

describe('MainLayoutMobileBottomSheetComponent', () => {
  let component: MainLayoutMobileBottomSheetComponent;
  let fixture: ComponentFixture<MainLayoutMobileBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutMobileBottomSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutMobileBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
