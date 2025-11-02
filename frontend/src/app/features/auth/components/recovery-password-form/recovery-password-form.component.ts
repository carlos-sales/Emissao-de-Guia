import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { shakeAnimation } from '../../../../shared/animations/shakeAnimation';
import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerDialogComponent } from '../../../../shared/components/dialog/spinner-dialog/spinner-dialog.component';
import { SuccessDialogComponent } from '../../../../shared/components/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../../shared/components/dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'recovery-password-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule],
  templateUrl: './recovery-password-form.component.html',
  styleUrl: './recovery-password-form.component.scss',
  animations: [shakeAnimation]
})
export class RecoveryPasswordFormComponent
{
  public form!: FormGroup;
  public animationState: string = '';

  constructor(
    private nnfb: NonNullableFormBuilder,
    public serviceAuth: AuthService,
    public dialog: MatDialog
  )
  {
  }

  ngOnInit()
  {
    this.initForm();
  }

  initForm()
  {
    this.form = this.nnfb.group({
      mail: ['', [Validators.required]],
    })
  }

  doRecovery()
  {
    if( ! this.form.valid )
    {
      this.form.markAllAsTouched();
      return false;
    }

    const spinner = this.dialog.open( SpinnerDialogComponent, {
      disableClose: true,
      backdropClass: 'blur-backdrop',
      data: 'Recuperando acesso...'
    });

    this.serviceAuth
      .doRecovery(this.form.value)
      .subscribe(
        (response) => 
        {
          spinner.close();
          if(!response.success)
          {
            
            this.doShake();
            this.form.controls['mail'].setErrors({'invalid-mail': true});
            return false;
          }
          this.dialog.open(
             SuccessDialogComponent,
            {
              data:
              {
                title: `Sucesso!`,
                message: response.message
              }
            }
          );
          this.serviceAuth.setRecovery(false);
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
