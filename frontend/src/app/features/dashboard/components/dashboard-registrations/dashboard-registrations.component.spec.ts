import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRegistrationsComponent } from './dashboard-registrations.component';

describe('DashboardRegistrationsComponent', () => {
  let component: DashboardRegistrationsComponent;
  let fixture: ComponentFixture<DashboardRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRegistrationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
