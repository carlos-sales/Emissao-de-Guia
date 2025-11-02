import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { City } from '../../../../core/interfaces/city/city';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';
import { SpinnerDialogComponent } from '../../../../shared/components/dialog/spinner-dialog/spinner-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialog/success-dialog/success-dialog.component';
import { FormDebugComponent } from '../../../../shared/components/form-debug/form-debug.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { BreakpointService } from '../../../../shared/services/breakpoint/breakpoint.service';
import { RouteService } from '../../../../shared/services/route/route.service';
import { CityService } from '../../service/city/city.service';
import { ESTADOS_BRASILEIROS } from './../../../../shared/constants/estados-brasileiros.const';

@Component({
  selector: 'form-city',
  standalone: true,
  imports: [AppMaterialModule, SpinnerComponent, TitleCasePipe, FormDebugComponent],
  templateUrl: './form-city.component.html',
  styleUrl: './form-city.component.scss'
})
export class FormCityComponent
{
  public action: string = '';
  public city!: City;
  public form!: FormGroup;
  public id!: number | null;
  public isLoading: boolean = false;
  public listFederativeUnit = ESTADOS_BRASILEIROS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceCity: CityService,
    private serviceRoute: RouteService,
    public serviceBreakpoint: BreakpointService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog
  )
  {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id')) || null;
    this.action = this.activatedRoute.snapshot.paramMap.get('action') || '';
  }

  ngOnInit()
  {
    if(this.id) this.getByID();
    this.initForm();
    if(this.action == 'visualizar') this.disableForm();
  }

  getByID()
  {
    if(this.id)
    {
      this.isLoading = true;
      this.serviceCity
        .getById(this.id)
        .subscribe(
          (response: any) =>
          {
            this.isLoading = false;
            this.city = response;
            this.setForm();
          },
          (error: any) =>
          {
            console.log(error)
          }
        )
    }
  }

  initForm(): void
  {
    this.form = this.formBuilder.group(
      {
        id: [null],
        cidade: [null, [Validators.required]],
        uf: [null, [Validators.required]],
        ativo: [true],
        created_by: [{value: null, disabled: true}],
        created_at: [{value: null, disabled: true}],
        updated_by: [{value: null, disabled: true}],
        updated_at: [{value: null, disabled: true}]
      }
    )
  }

  disableForm(): void
  {
    this.form.disable();
  }

  setForm()
  {
    this.form.patchValue({
      id: this.city.id,
      cidade: this.city.cidade,
      uf: this.city.uf,
      ativo: this.city.ativo == 'sim',
      created_by: this.city.created_by,
      created_at: this.city.created_at,
      updated_by: this.city.updated_by,
      updated_at: this.city.updated_at,
    })
  }

  backToPreviousPage()
  {
    this.serviceRoute.redirectTo('cadastros/cidades');
  }

  save()
  {
    const spinner = this.dialog.open( SpinnerDialogComponent, {
      disableClose: true,
      backdropClass: 'blur-backdrop',
      data: 'Enviando dados...'
    });

    if(this.action=='editar')
    {
      this.serviceCity.update(this.form.value).subscribe(
        (data: any) =>
        {
          spinner.close();
          if(data.success) this.backToPreviousPage();
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
      );
    }

    if(this.action=='novo')
    {
      this.serviceCity.insert(this.form.value).subscribe(
        (data) =>
        {
          spinner.close();
          if(data.success) this.backToPreviousPage();
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
      );
    }
  }
}
