import { Component, DestroyRef, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { AuthService } from '../../services/auth.service';
import { shakeAnimation } from './../../../../shared/animations/shakeAnimation';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerDialogComponent } from '../../../../shared/components/dialog/spinner-dialog/spinner-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';
import { RouteService } from '../../../../shared/services/route/route.service';

@Component({
    selector: 'auth-form',
    standalone: true,
    imports: [AppMaterialModule, ReactiveFormsModule],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.scss',
    animations: [shakeAnimation]
})
export class AuthFormComponent
{
  public form!: FormGroup;
  public animationState: string = '';

  constructor(
    private nnfb: NonNullableFormBuilder,
    private serviceRoute: RouteService,
    public serviceAuth: AuthService,
    public dialog: MatDialog,
  ) {}

  ngOnInit()
  {
    this.initForm();
  }

  initForm()
  {
    this.form = this.nnfb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  doLogin()
  {
    if( ! this.form.valid )
    {
      this.form.markAllAsTouched();
      return false;
    } 

    const spinner = this.dialog.open( SpinnerDialogComponent, {
      disableClose: true,
      backdropClass: 'blur-backdrop',
      data: 'Autenticando...'
    });

    this.serviceAuth
      .doAuthenticate(this.form.value)
      .subscribe(
        (response) => 
        {
          spinner.close();
          if(!response.success)
          {
            this.doShake();
            this.form.controls['password'].setErrors({'invalid-password': true});
            return false;
          }
          this.serviceAuth.login(response.user, response.permitions, response.token);
          this.serviceRoute.redirectTo('dashboard');
          return true;
        },
        (error) =>
        {
          spinner.close();
          this.dialog.open( ErrorDialogComponent, {
            backdropClass: 'blur-backdrop',
            data: error
          });
        }
      );
    return false;
  }

  doShake()
  {
    this.animationState = 'shake';
    setTimeout(() => this.animationState = '', 500);
  }
}
