import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasListRoutingModule } from './ventas-list-routing.module';
import { VentasListComponent } from './ventas-list.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    VentasListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    VentasListRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class VentasListModule { }
