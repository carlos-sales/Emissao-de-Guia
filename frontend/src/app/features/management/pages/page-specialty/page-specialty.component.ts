import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';

import { Specialty } from '../../../../core/interfaces/specialty/specialty';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialog/success-dialog/success-dialog.component';
import { NoDataComponent } from '../../../../shared/components/no-data/no-data.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { RouteService } from '../../../../shared/services/route/route.service';
import { SpecialtyService } from '../../service/specialty/specialty.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'page-specialty',
  standalone: true,
  imports: [AppMaterialModule, RouterModule, RouterLink, SpinnerComponent, NoDataComponent, TitleCasePipe],
  templateUrl: './page-specialty.component.html',
  styleUrl: './page-specialty.component.scss'
})
export class PageSpecialtyComponent
{
  public isLoading: boolean = false;
  public specialties: Specialty[] = [];
  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource = new MatTableDataSource(this.specialties);

  constructor(
    private serviceRoute: RouteService,
    public serviceSpecialty: SpecialtyService,
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
    this.serviceSpecialty
      .getAll()
      .subscribe(
        (response: any) =>
        {
          this.isLoading = false;
          this.specialties = response;
          this.dataSource.data = this.specialties;
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
    this.serviceSpecialty.updateStatus(isActive, id).subscribe(
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
