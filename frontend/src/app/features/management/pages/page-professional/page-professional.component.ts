import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';

import { Professional } from '../../../../core/interfaces/professional/professional';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialog/success-dialog/success-dialog.component';
import { NoDataComponent } from '../../../../shared/components/no-data/no-data.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { PhonePipe } from '../../../../shared/pipes/phone/phone.pipe';
import { RouteService } from '../../../../shared/services/route/route.service';
import { ProfessionalService } from '../../service/professional/professional.service';

@Component({
  selector: 'page-professional',
  standalone: true,
  imports: [AppMaterialModule, RouterModule, RouterLink, SpinnerComponent, NoDataComponent, TitleCasePipe, PhonePipe],
  templateUrl: './page-professional.component.html',
  styleUrl: './page-professional.component.scss'
})
export class PageProfessionalComponent
{
  public isLoading: boolean = false;
  public professionals: Professional[] = [];
  public displayedColumns: string[] = ['id', 'name', 'city', 'phone', 'alternative_phone', 'actions'];
  public dataSource = new MatTableDataSource(this.professionals);

  constructor(
    private serviceRoute: RouteService,
    public serviceProfessional: ProfessionalService,
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
    this.serviceProfessional
      .getAll()
      .subscribe(
        (response: any) =>
        {
          this.isLoading = false;
          this.professionals = response;
          this.dataSource.data = this.professionals;
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
    this.serviceProfessional.updateStatus(isActive, id).subscribe(
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
