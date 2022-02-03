import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresListRoutingModule } from './proveedores-list-routing.module';
import { ProveedoresListComponent } from './proveedores-list.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    ProveedoresListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    ProveedoresListRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class ProveedoresListModule { }
