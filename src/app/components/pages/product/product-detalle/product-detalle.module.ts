import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProductDetalleRoutingModule } from './product-detalle-routing.module';
import { ProductDetalleComponent } from './product-detalle.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    ProductDetalleComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    ProductDetalleRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,    
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    Ng2SmartTableModule,
  ]
})
export class ProductDetalleModule { }
