import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';

import { City } from '../../../../core/interfaces/city/city';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialog/success-dialog/success-dialog.component';
import { NoDataComponent } from '../../../../shared/components/no-data/no-data.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { RouteService } from '../../../../shared/services/route/route.service';
import { CityService } from '../../service/city/city.service';

@Component({
  selector: 'page-cities',
  standalone: true,
  imports: [AppMaterialModule, RouterModule, RouterLink, SpinnerComponent, NoDataComponent],
  templateUrl: './page-cities.component.html',
  styleUrl: './page-cities.component.scss'
})
export class PageCitiesComponent
{
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['id', 'name', 'federative_unit', 'actions'];
  public dataSource = new MatTableDataSource<City>();

  constructor(
    private serviceRoute: RouteService,
    public serviceCity: CityService,
    public dialog: MatDialog
  )
  {}

  ngOnInit()
  {
    this.get();
  }

  get()
  {
    this.isLoading = true;
    this.serviceCity.getAll().subscribe(
      (
        (data: any) =>
        { 
          this.isLoading = false;
          this.dataSource.data = data;
        }
      )
    );
  }

  applyFilter(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openForm(action: string, id: number = 0)
  {
    this.serviceRoute.redirectTo(action, {id})
  }

  updateStatus(isActive: boolean, id: number)
  {
    this.serviceCity.updateStatus(isActive, id).subscribe(
      (data) => {
        if(data.success) this.ngOnInit();
        this.dialog.open(
          data.success ? SuccessDialogComponent : ErrorDialogComponent,
          {
            data:
            {
              title: `Processo finalizado com ${data.success ? 'sucesso' : 'erro'}.`,
              message: data.message
            }
          }
        );
      }
    )
  }
}
