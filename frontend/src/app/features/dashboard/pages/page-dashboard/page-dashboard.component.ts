import { Component } from '@angular/core';
import { Guide } from '../../../../core/interfaces/guide/guide';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { BreakpointService } from '../../../../shared/services/breakpoint/breakpoint.service';
import { AuthService } from '../../../auth/services/auth.service';
import { DashboardGuidesIssuedComponent } from '../../components/dashboard-guides-issued/dashboard-guides-issued.component';
import { DashboardRecentGuidesComponent } from '../../components/dashboard-recent-guides/dashboard-recent-guides.component';
import { DashboardRegistrationsComponent } from '../../components/dashboard-registrations/dashboard-registrations.component';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'page-dashboard',
  standalone: true,
  imports: [AppMaterialModule, DashboardGuidesIssuedComponent, DashboardRecentGuidesComponent, DashboardRegistrationsComponent, SpinnerComponent],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.scss'
})
export class PageDashboardComponent
{
  public isLoading: boolean = false;
  public totalEmployeeGuides: number = 0;
  public totalDependentGuides: number = 0;
  public totalGuides: number = 0;
  public totalEmployee: number = 0;
  public totalDependent: number = 0;
  public totalCompanies: number = 0;
  public guidesSixMonthAgo: Guide[] = [];

  constructor(
    public serviceBreakpoint: BreakpointService,
    public serviceAuth: AuthService,
    public serviceDashboard: DashboardService
  )
  {}

  ngOnInit()
  {
    this.get();
  }

  get()
  {
    this.isLoading = true;

    this.serviceDashboard
      .get()
      .subscribe(
        (response: any) =>
        {
          this.isLoading = false;
          this.totalEmployeeGuides = response.total_employee_guides;
          this.totalDependentGuides = response.total_dependent_guides;
          this.totalGuides = this.totalEmployeeGuides + this.totalDependentGuides;
          this.totalEmployee = response.total_employee;
          this.totalDependent = response.total_dependent;
          this.totalCompanies = response.total_companies;
          this.guidesSixMonthAgo = response.guides_six_months_ago;
        },
        (error: any) =>
        {
          console.log(error)
        }
      )
  }
}
