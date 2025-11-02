import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { BreakpointService } from '../../../../shared/services/breakpoint/breakpoint.service';

@Component({
  selector: 'dashboard-guides-issued',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './dashboard-guides-issued.component.html',
  styleUrl: './dashboard-guides-issued.component.scss'
})
export class DashboardGuidesIssuedComponent
{
  @Input() totalEmployeeGuides: number = 0;
  @Input() totalDependentGuides: number = 0;

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
    this.chart = Chart.getChart('guides')
    if(this.chart) this.chart.destroy();
    
    Chart.register(...registerables);
    this.chart = new Chart('guides',
    {
      type: 'pie',
      data: {
        labels: ['Funcionários', 'Dependentes'],
        datasets: [
          {
            label: `Guias emitidas`,
            data: [this.totalEmployeeGuides, this.totalDependentGuides],
            borderWidth: 1,
            hoverOffset: 4
          },
        ],
      }
    });
  }
}
