import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { BreadcrumbService } from '../../../shared/services/breadcrumb/breadcrumb.service';
import { Breadcrumb } from '../../interfaces/breadcrump/breadcrumb';

@Component({
  selector: 'breadcrumb',
  standalone: true,
  imports: [AppMaterialModule, RouterModule, TitleCasePipe],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent
{
  public breadcrumbs: Breadcrumb[] = [];

  constructor(
    public serviceBreadcrumb: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
  )
  {
    this.breadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs')!);
    this.activatedRoute.data.subscribe(
      d =>
      {
        let index = this.breadcrumbs.findIndex(el => el.label == ':action');
        if(index>0) this.breadcrumbs[index]!.label = d['breadcrumbLabel'];
      }
    );
  }

  ngOnInit(): void
  {
  }
}
