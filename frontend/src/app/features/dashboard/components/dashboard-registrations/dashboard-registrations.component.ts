import { BreakpointService } from './../../../../shared/services/breakpoint/breakpoint.service';
import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';

@Component({
  selector: 'dashboard-registrations',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './dashboard-registrations.component.html',
  styleUrl: './dashboard-registrations.component.scss'
})
export class DashboardRegistrationsComponent
{
  @Input() totalEmployee: number = 0;
  @Input() totalDependent: number = 0;
  @Input() totalCompanies: number = 0;
  @Input() totalGuides: number = 0;

  public chart: any = null;

  constructor(
    public serviceBreakpoint: BreakpointService
  ) {}

  ngOnInit()
  {
    this.initChart();
  }

  initChart()
  {
    this.chart = Chart.getChart('registrations')
    if(this.chart) this.chart.destroy();

    Chart.register(...registerables);
    this.chart = new Chart('registrations', {
      type: 'doughnut',
      data: {
        labels: [
          'Guias',
          'Funcionários',
          'Dependentes',
          'Empresas',
        ],
        datasets: [
          {
            label: 'Registros',
            data: [
              this.totalGuides,
              this.totalEmployee, 
              this.totalDependent,
              this.totalCompanies,
            ],
            borderWidth: 1,
            hoverOffset: 4
          },
        ],
      },
    });
  }
}
