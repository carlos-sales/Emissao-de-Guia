import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app-material/app-material.module';

@Component({
  selector: 'no-data',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss'
})
export class NoDataComponent {

}
