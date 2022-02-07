import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapasFormRoutingModule } from './etapas-form-routing.module';
import { EtapasFormComponent } from './etapas-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    EtapasFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    EtapasFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class EtapasFormModule { }
