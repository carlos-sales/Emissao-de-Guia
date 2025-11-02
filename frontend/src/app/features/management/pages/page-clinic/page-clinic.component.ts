import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { NoDataComponent } from '../../../../shared/components/no-data/no-data.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Clinic } from '../../../../core/interfaces/clinic/clinic';
import { ClinicService } from '../../service/clinic/clinic.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialog/success-dialog/success-dialog.component';
import { RouteService } from '../../../../shared/services/route/route.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'page-clinic',
  standalone: true,
  imports: [AppMaterialModule, RouterModule, RouterLink, SpinnerComponent, NoDataComponent, TitleCasePipe],
  templateUrl: './page-clinic.component.html',
  styleUrl: './page-clinic.component.scss'
})
export class PageClinicComponent
{
  public isLoading: boolean = false;
  public cities: Clinic[] = [];
  public displayedColumns: string[] = ['id', 'name', 'city', 'federative_unit', 'actions'];
  public dataSource = new MatTableDataSource(this.cities);

  constructor(
    private serviceRoute: RouteService,
    public serviceClinic: ClinicService,
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
    this.serviceClinic
      .getAll()
      .subscribe(
        (response: any) =>
        {
          this.isLoading = false;
          this.cities = response;
          this.dataSource.data = this.cities;
        },
        (error: any) =>
        {
          console.log(error)
        }
      )
  }

  applyFilter(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openForm(action: string, id: number = 0)
  {
    this.serviceRoute.redirectTo(action, {id})
  }

  updateStatus(isActive: boolean, id: number)
  {
    this.serviceClinic.updateStatus(isActive, id).subscribe(
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
