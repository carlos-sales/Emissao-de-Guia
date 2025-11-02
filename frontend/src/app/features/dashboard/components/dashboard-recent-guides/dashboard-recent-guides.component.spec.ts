import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentGuidesComponent } from './dashboard-recent-guides.component';

describe('DashboardRecentGuidesComponent', () => {
  let component: DashboardRecentGuidesComponent;
  let fixture: ComponentFixture<DashboardRecentGuidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRecentGuidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRecentGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
