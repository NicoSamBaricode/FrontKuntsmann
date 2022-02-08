import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprobantesFormRoutingModule } from './comprobantes-form-routing.module';
import { ComprobantesFormComponent } from './comprobantes-form.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ComprobantesFormComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    ComprobantesFormRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class ComprobantesFormModule { }
