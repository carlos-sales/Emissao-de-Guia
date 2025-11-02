import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppMaterialModule } from '../../../app-material/app-material.module';

@Component({
  selector: 'info-dialog',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent
{
  constructor( @Inject(MAT_DIALOG_DATA) public data: any ) {}
}
