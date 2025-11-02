import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppMaterialModule } from '../../../app-material/app-material.module';

@Component({
  selector: 'success-dialog',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss'
})
export class SuccessDialogComponent
{
  constructor( @Inject(MAT_DIALOG_DATA) public data: any ){}
}
