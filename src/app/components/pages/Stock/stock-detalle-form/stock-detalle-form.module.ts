import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { StockDetalleFormRoutingModule } from './stock-detalle-form-routing.module';
import { StockDetalleFormComponent } from './stock-detalle-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    StockDetalleFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    StockDetalleFormRoutingModule,
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
export class StockDetalleFormModule { }
