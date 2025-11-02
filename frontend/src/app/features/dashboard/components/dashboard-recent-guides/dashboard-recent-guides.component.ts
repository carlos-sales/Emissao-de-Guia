import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { Guide } from '../../../../core/interfaces/guide/guide';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { BreakpointService } from '../../../../shared/services/breakpoint/breakpoint.service';

@Component({
  selector: 'dashboard-recent-guides',
  standalone: true,
  imports: [AppMaterialModule, CommonModule],
  templateUrl: './dashboard-recent-guides.component.html',
  styleUrl: './dashboard-recent-guides.component.scss'
})
export class DashboardRecentGuidesComponent
{
  @Input() guidesSixMonthAgo: Guide[] = [];
  public preparedData: any[] = [];
  public chart: any = null;

  public displayedColumns: string[] = ['benefited', 'type', 'company', 'date'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    public serviceBreakpoint: BreakpointService
  ) {}

  ngOnInit()
  {
    this.preparedData = this.prepareData();
    this.dataSource = new MatTableDataSource(this.guidesSixMonthAgo.slice(0, 5));
    this.initChart();
  }

  prepareData()
  {
    const group = this.groupByMonth();
    return Object.entries(group)
      .map(([month, data]) => ({
        month,
        data
    }));
  }

  groupByMonth()
  {
    return this.guidesSixMonthAgo.reduce((acc, item) => {
      const date = new Date(item.created_at);
      const month = date.toLocaleString('pt-BR', { month: 'short', year: 'numeric' }); 
      if(!acc[month]) acc[month] = [];
      acc[month].push(item);
      return acc;
    }, {} as Record<string, any[]>);
  }

  initChart()
  {
    this.chart = Chart.getChart('recent')
    if(this.chart) this.chart.destroy();

    Chart.register(...registerables);
      this.chart = new Chart('recent', {
        type: 'bar',
        data: {
          labels: this.preparedData.map(el => el.month),
          datasets: [
            {
              label: `Guias`,
              data: this.preparedData.map(el => el.data.length),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)'
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  }
}
