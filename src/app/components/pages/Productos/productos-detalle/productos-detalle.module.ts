import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProductosDetalleRoutingModule } from './productos-detalle-routing.module';
import { ProductosDetalleComponent } from './productos-detalle.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ProductosDetalleComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    ProductosDetalleRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,    
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    Ng2SmartTableModule,
  ]
})
export class ProductosDetalleModule { }
