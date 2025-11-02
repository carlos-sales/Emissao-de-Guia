import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../components/dialog/info-dialog/info-dialog.component';
import { ErrorDialogComponent } from '../../components/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../components/dialog/success-dialog/success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }


  infoDialog(message: string, title: string)
  {
    const isOpen = this.dialog.openDialogs
          .some(dialogRef => dialogRef.componentInstance instanceof InfoDialogComponent);
    if( isOpen ) return;
    this.dialog.open( 
      InfoDialogComponent, 
      {
        data:
        {
          title: title,
          message: message
        }
      }
    );
  }

  errorDialog(message: string, title: string = "Algo não aconteceu como o esperado...")
  {
    const isOpen = this.dialog.openDialogs
          .some(dialogRef => dialogRef.componentInstance instanceof ErrorDialogComponent);
    if( isOpen ) return;
    this.dialog.open( 
      ErrorDialogComponent, 
      {
        data:
        {
          title: title,
          message: message
        }
      }
    );
  }

  successDialog(message: string, title: string)
  {
    const isOpen = this.dialog.openDialogs
          .some(dialogRef => dialogRef.componentInstance instanceof SuccessDialogComponent);
    if( isOpen ) return;
    this.dialog.open( 
      SuccessDialogComponent, 
      {
        data:
        {
          title: title,
          message: message
        }
      }
    );
  }
}
