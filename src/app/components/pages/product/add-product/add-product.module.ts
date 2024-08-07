import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import { SharedModule } from '../../../shared/shared.module';
import { ContentComponent } from './content/content.component';


@NgModule({
  declarations: [AddProductComponent, ContentComponent],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,    
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    Ng2SmartTableModule,
  ]
})
export class AddProductModule { }
