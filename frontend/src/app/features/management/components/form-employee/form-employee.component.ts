import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { Employee } from '../../../../core/interfaces/employee/employee';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';
import { SpinnerDialogComponent } from '../../../../shared/components/dialog/spinner-dialog/spinner-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialog/success-dialog/success-dialog.component';
import { FormDebugComponent } from '../../../../shared/components/form-debug/form-debug.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { BreakpointService } from '../../../../shared/services/breakpoint/breakpoint.service';
import { RouteService } from '../../../../shared/services/route/route.service';
import { CompanyService } from '../../service/company/company.service';
import { EmployeeService } from '../../service/employee/employee.service';
import { Company } from './../../../../core/interfaces/company/company';
import { CepService } from '../../../../shared/services/cep/cep.service';
import { CEP } from '../../../../core/interfaces/cep/cep';
import { map, Observable, startWith } from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'form-employee',
  standalone: true,
  imports: [AppMaterialModule, SpinnerComponent, TitleCasePipe, FormDebugComponent, NgxMaskDirective, AsyncPipe],
  providers: [provideNgxMask()],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.scss'
})
export class FormEmployeeComponent
{
  public action: string = '';
  public professional!: Employee;
  public companies!: Company[];
  // public company = new FormControl<string | Company>('');
  public filteredCompanies!: Observable<Company[]>;
  public form!: FormGroup;
  public id!: number | null;
  public isLoading: boolean = false;
  public isLoadingCompanies: boolean = false;
  public isLoadingAddress: boolean = false;
  public isAddressFieldReadonly: any = [
    {
      endereco: true,
      bairro: true,
      complemento: true,
      cidade: true,
      uf: true
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceEmployee: EmployeeService,
    private serviceCompany: CompanyService,
    private serviceCep: CepService,
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
    this.getCompanies();
    if(this.action == 'visualizar') this.disableForm();
  }

  getByID()
  {
    if(this.id)
    {
      this.isLoading = true;
      this.serviceEmployee
        .getById(this.id)
        .subscribe(
          (response: any) =>
          {
            this.isLoading = false;
            this.professional = response;
            this.setForm();
          },
          (error: any) =>
          {
            console.log(error)
          }
        )
    }
  }

  getCompanies()
  {
    this.isLoadingCompanies = true;
    this.serviceCompany
      .getAll({ativo: 'sim'})
      .subscribe(
        (response: any) =>
        {
          this.isLoadingCompanies = false;
          this.companies = response;

          this.filteredCompanies = this.form.controls['empresa']?.valueChanges.pipe(
            startWith(''),
            map((value: any) =>
            {
              const name = typeof value === 'string' ? value : value?.nome;
              return name ? this._filter(name as string) : this.companies.slice();
            }),
          );
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
        cpf: [null],
        nascimento: [null],
        telefone: [null, [Validators.required]],
        email: [null, [Validators.required]],
        empresa: new FormControl<string | Company>(''),
        id_empresa: [null, [Validators.required]],
        endereco: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        uf: [null, [Validators.required]],
        cep: [null, [Validators.required]],
        complemento: [null],
        ativo: [true],
        created_by: [{value: null, disabled: true}],
        created_at: [{value: null, disabled: true}],
        updated_by: [{value: null, disabled: true}],
        updated_at: [{value: null, disabled: true}]
      }
    )
  }

  selectCompany(id: number)
  {
    this.form.patchValue({id_empresa: id})
  }

  disableForm(): void
  {
    this.form.disable();
  }

  setForm()
  {
    this.form.patchValue({
      id: this.professional.id,
      nome: this.professional.nome,
      cpf: this.professional.cpf,
      nascimento: this.professional.nascimento,
      telefone: this.professional.telefone,
      email: this.professional.email,
      id_empresa: this.professional.id_empresa,
      endereco: this.professional.endereco,
      numero: this.professional.numero,
      bairro: this.professional.bairro,
      cidade: this.professional.cidade,
      uf: this.professional.uf,
      cep: this.professional.cep,
      complemento: this.professional.complemento,
      ativo: this.professional.ativo == 'sim',
      created_by: this.professional.created_by,
      created_at: this.professional.created_at,
      updated_by: this.professional.updated_by,
      updated_at: this.professional.updated_at
    })
  }

  searchCEP()
  {
    this.setCEPFields({});

    if(!this.form.get('cep')?.valid) return;

    this.serviceCep
      .get(this.form.value.cep)
      .subscribe(
        (data: CEP) =>
        {
          if(data.erro)
          {
            this.form.controls['ceo'].setErrors({'cep-not-found': true});
            return;
          }
          this.setCEPFields(data);
          this.setReadonlyFormFields(data);
        }
      )
  }

  setCEPFields(data: CEP)
  {
    this.form.patchValue({
      endereco: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      complemento: data.complemento,
      uf: data.uf
    })
  }

  setReadonlyFormFields(data: CEP)
  {
    this.isAddressFieldReadonly.endereco = data.logradouro != '';
    this.isAddressFieldReadonly.bairro = data.bairro != '';
    this.isAddressFieldReadonly.cidade = data.localidade != '';
    this.isAddressFieldReadonly.complemento = data.complemento != '';
    this.isAddressFieldReadonly.uf = data.uf != '';
  }

  displayFn(company: Company): string {
    return company && company.nome ? company.nome : '';
  }

  private _filter(name: string): Company[]
  {
    const filterValue = name.toLowerCase();
    return this.companies.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  backToPreviousPage()
  {
    this.serviceRoute.redirectTo('cadastros/funcionarios');
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
      this.serviceEmployee.update(this.form.value).subscribe(
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
      this.serviceEmployee.insert(this.form.value).subscribe(
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
