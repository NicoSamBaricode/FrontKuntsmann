import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprobantesListRoutingModule } from './comprobantes-list-routing.module';
import { ComprobantesListComponent } from './comprobantes-list.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ComprobantesListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    ComprobantesListRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class ComprobantesListModule { }
