import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasFormRoutingModule } from './ventas-form-routing.module';
import { VentasFormComponent } from './ventas-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  declarations: [
    VentasFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    VentasFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class VentasFormModule { }
