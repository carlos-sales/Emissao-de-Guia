import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutDesktopComponent } from './main-layout-desktop.component';

describe('MainLayoutDesktopComponent', () => {
  let component: MainLayoutDesktopComponent;
  let fixture: ComponentFixture<MainLayoutDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutDesktopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
