import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenesFormRoutingModule } from './almacenes-form-routing.module';
import { AlmacenesFormComponent } from './almacenes-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    AlmacenesFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    AlmacenesFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class AlmacenesFormModule { }
