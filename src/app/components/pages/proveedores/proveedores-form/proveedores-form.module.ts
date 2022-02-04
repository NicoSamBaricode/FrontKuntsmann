import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresFormRoutingModule } from './proveedores-form-routing.module';
import { ProveedoresFormComponent } from './proveedores-form.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ContentComponent } from './content/content.component';


@NgModule({
  declarations: [
    ProveedoresFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    ProveedoresFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class ProveedoresFormModule { }