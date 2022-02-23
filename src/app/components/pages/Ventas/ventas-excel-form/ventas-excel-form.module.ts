import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasExcelFormRoutingModule } from './ventas-excel-form-routing.module';
import { VentasExcelFormComponent } from './ventas-excel-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

@NgModule({
  declarations: [
    VentasExcelFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    VentasExcelFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule
  ]
})
export class VentasExcelFormModule { }
