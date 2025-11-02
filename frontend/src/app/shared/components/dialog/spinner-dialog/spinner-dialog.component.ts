import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppMaterialModule } from '../../../app-material/app-material.module';

@Component({
  selector: 'spinner-dialog',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './spinner-dialog.component.html',
  styleUrl: './spinner-dialog.component.scss'
})
export class SpinnerDialogComponent
{
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
