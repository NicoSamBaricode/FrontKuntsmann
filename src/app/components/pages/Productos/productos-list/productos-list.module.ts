import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosListRoutingModule } from './productos-list-routing.module';
import { ProductosListComponent } from './productos-list.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ProductosListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    ProductosListRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class ProductosListModule { }
