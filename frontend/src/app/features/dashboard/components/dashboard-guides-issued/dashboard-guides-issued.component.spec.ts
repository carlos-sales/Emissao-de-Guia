import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGuidesIssuedComponent } from './dashboard-guides-issued.component';

describe('DashboardGuidesIssuedComponent', () => {
  let component: DashboardGuidesIssuedComponent;
  let fixture: ComponentFixture<DashboardGuidesIssuedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGuidesIssuedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGuidesIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
