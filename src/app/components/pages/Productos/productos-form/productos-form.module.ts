import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosFormRoutingModule } from './productos-form-routing.module';
import { ProductosFormComponent } from './productos-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ProductosFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    ProductosFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class ProductosFormModule { }
