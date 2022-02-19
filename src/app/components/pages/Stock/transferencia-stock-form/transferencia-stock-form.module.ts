import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferenciaStockFormRoutingModule } from './transferencia-stock-form-routing.module';
import { TransferenciaStockFormComponent } from './transferencia-stock-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    TransferenciaStockFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    TransferenciaStockFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
  ]
})
export class TransferenciaStockFormModule { }
