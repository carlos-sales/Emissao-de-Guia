import { Component } from '@angular/core';
import { Clinic } from '../../../../core/interfaces/clinic/clinic';
import { ClinicService } from '../../service/clinic/clinic.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';
import { SpinnerDialogComponent } from '../../../../shared/components/dialog/spinner-dialog/spinner-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialog/success-dialog/success-dialog.component';
import { BreakpointService } from '../../../../shared/services/breakpoint/breakpoint.service';
import { RouteService } from '../../../../shared/services/route/route.service';
import { TitleCasePipe } from '@angular/common';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { FormDebugComponent } from '../../../../shared/components/form-debug/form-debug.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { City } from '../../../../core/interfaces/city/city';
import { CityService } from '../../service/city/city.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormService } from '../../../../shared/services/form/form.service';

@Component({
  selector: 'form-clinic',
  standalone: true,
  imports: [AppMaterialModule, SpinnerComponent, TitleCasePipe, FormDebugComponent, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './form-clinic.component.html',
  styleUrl: './form-clinic.component.scss'
})
export class FormClinicComponent
{
  public action: string = '';
  public clinic!: Clinic;
  public cities!: City[];
  public form!: FormGroup;
  public id!: number | null;
  public isLoading: boolean = false;
  public isLoadingCities: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceClinic: ClinicService,
    private serviceCity: CityService,
    private serviceRoute: RouteService,
    public serviceBreakpoint: BreakpointService,
    public serviceForm: FormService,
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
    this.getCities();
    if(this.action == 'visualizar') this.disableForm();
  }

  getByID()
  {
    if(this.id)
    {
      this.isLoading = true;
      this.serviceClinic
        .getById(this.id)
        .subscribe(
          (response: any) =>
          {
            this.isLoading = false;
            this.clinic = response;
            this.setForm();
          },
          (error: any) =>
          {
            console.log(error)
          }
        )
    }
  }

  getCities()
  {
    this.isLoadingCities = true;
    this.serviceCity
      .getAll()
      .subscribe(
        (response: any) =>
        {
          this.isLoadingCities = false;
          this.cities = response;
        },
        (error: any) =>
        {
          console.log(error)
        }
      )
  }

  initForm(): void
  {
    this.form = this.formBuilder.group(
      {
        id: [null],
        nome: [null, [Validators.required]],
        telefone: [null],
        telefone_alternativo: [null],
        rua: [null],
        numero: [null],
        complemento: [null],
        bairro: [null],
        id_cidade: [null],
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
      id: this.clinic.id,
      nome: this.clinic.nome,
      telefone: this.clinic.telefone,
      telefone_alternativo: this.clinic.telefone_alternativo,
      rua: this.clinic.rua,
      numero: this.clinic.numero,
      complemento: this.clinic.complemento,
      bairro: this.clinic.bairro,
      id_cidade: this.clinic.id_cidade,
      ativo: this.clinic.ativo == 'sim',
      created_by: this.clinic.created_by,
      created_at: this.clinic.created_at,
      updated_by: this.clinic.updated_by,
      updated_at: this.clinic.updated_at
    })
  }

  backToPreviousPage()
  {
    this.serviceRoute.redirectTo('cadastros/clinicas');
  }

  save()
  {
    if(!this.form.valid)
    {
      this.serviceForm.validateAllFormFields(this.form);
      return;
    }

    const spinner = this.dialog.open( SpinnerDialogComponent, {
      disableClose: true,
      backdropClass: 'blur-backdrop',
      data: 'Enviando dados...'
    });

    if(this.action=='editar')
    {
      this.serviceClinic.update(this.form.value).subscribe(
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
      this.serviceClinic.insert(this.form.value).subscribe(
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
