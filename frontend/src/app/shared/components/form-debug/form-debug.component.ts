import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AppMaterialModule } from '../../app-material/app-material.module';
import { DebugService } from '../../services/debug/debug.service';

@Component({
  selector: 'form-debug',
  standalone: true,
  imports: [AppMaterialModule, JsonPipe],
  templateUrl: './form-debug.component.html',
  styleUrl: './form-debug.component.scss'
})
export class FormDebugComponent
{
  @Input() form?: FormGroup;
  @Input() formName?: string;
  public isDebug: boolean = false;

  constructor( public serviceDebug : DebugService )
  {
    this.isDebug = serviceDebug.isDebug();
  }

  ngOnInit()
  {
  }
}
