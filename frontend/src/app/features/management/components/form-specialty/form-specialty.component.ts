import { Component } from '@angular/core';
import { Specialty } from '../../../../core/interfaces/specialty/specialty';
import { SpecialtyService } from '../../service/specialty/specialty.service';
import { TitleCasePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';
import { SpinnerDialogComponent } from '../../../../shared/components/dialog/spinner-dialog/spinner-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialog/success-dialog/success-dialog.component';
import { FormDebugComponent } from '../../../../shared/components/form-debug/form-debug.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { BreakpointService } from '../../../../shared/services/breakpoint/breakpoint.service';
import { RouteService } from '../../../../shared/services/route/route.service';

@Component({
  selector: 'form-specialty',
  standalone: true,
  imports: [AppMaterialModule, SpinnerComponent, TitleCasePipe, FormDebugComponent],
  templateUrl: './form-specialty.component.html',
  styleUrl: './form-specialty.component.scss'
})
export class FormSpecialtyComponent
{
  public action: string = '';
  public specialty!: Specialty;
  public form!: FormGroup;
  public id!: number | null;
  public isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceSpecialty: SpecialtyService,
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
      this.serviceSpecialty
        .getById(this.id)
        .subscribe(
          (response: any) =>
          {
            this.isLoading = false;
            this.specialty = response;
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
        nome: [null, [Validators.required]],
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
      id: this.specialty.id,
      nome: this.specialty.nome,
      ativo: this.specialty.ativo == 'sim',
      created_by: this.specialty.created_by,
      created_at: this.specialty.created_at,
      updated_by: this.specialty.updated_by,
      updated_at: this.specialty.updated_at,
    })
  }

  backToPreviousPage()
  {
    this.serviceRoute.redirectTo('cadastros/especialidades');
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
      this.serviceSpecialty.update(this.form.value).subscribe(
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
      this.serviceSpecialty.insert(this.form.value).subscribe(
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
