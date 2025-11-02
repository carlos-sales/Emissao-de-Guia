import { Component } from '@angular/core';
import { Employee } from '../../../../core/interfaces/employee/employee';
import { EmployeeService } from '../../service/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialog/success-dialog/success-dialog.component';
import { RouteService } from '../../../../shared/services/route/route.service';
import { TitleCasePipe } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { NoDataComponent } from '../../../../shared/components/no-data/no-data.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { PhonePipe } from '../../../../shared/pipes/phone/phone.pipe';

@Component({
  selector: 'page-employee',
  standalone: true,
  imports: [AppMaterialModule, RouterModule, RouterLink, SpinnerComponent, NoDataComponent, TitleCasePipe, PhonePipe],
  templateUrl: './page-employee.component.html',
  styleUrl: './page-employee.component.scss'
})
export class PageEmployeeComponent
{
  public isLoading: boolean = false;
  public employees: Employee[] = [];
  public displayedColumns: string[] = ['id', 'name', 'company', 'phone', 'mail', 'city', 'actions'];
  public dataSource = new MatTableDataSource(this.employees);

  constructor(
    private serviceRoute: RouteService,
    public serviceEmployee: EmployeeService,
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
    this.serviceEmployee
      .getAll()
      .subscribe(
        (response: any) =>
        {
          this.isLoading = false;
          this.employees = response;
          this.dataSource.data = this.employees;
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
    this.serviceEmployee.updateStatus(isActive, id).subscribe(
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
