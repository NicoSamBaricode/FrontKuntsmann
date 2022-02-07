import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapasListRoutingModule } from './etapas-list-routing.module';
import { EtapasListComponent } from './etapas-list.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    EtapasListComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    EtapasListRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule
  ]
})
export class EtapasListModule { }
